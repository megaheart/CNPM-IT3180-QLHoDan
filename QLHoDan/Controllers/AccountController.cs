using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QLHoDan.Models.AccountApi;
using QLHoDan.Models;
using System.Text.Json;
using QLHoDan.Services;
using Microsoft.IdentityModel.Tokens;
using Azure.Core;
using QLHoDan.Models.Api;
using Microsoft.AspNetCore.Cors;
using SQLitePCL;

namespace QLHoDan.Controllers
{
    [Route("api/account")]
    [ApiController]
    //[EnableCors("DevOnly_AllowSpecificOrigins")]

    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly QLHoDan.Services.ITokenCreationService _jwtService;
        private readonly QLHoDan.Services.Storage _storage;
        public AccountController(SignInManager<ApplicationUser> signInManager,
                                    UserManager<ApplicationUser> userManager,
                                    IAuthenticationSchemeProvider schemeProvider,
                                    RoleManager<IdentityRole> roleManager,
                                    QLHoDan.Services.ITokenCreationService jwtService,
                                    Storage storage)
        {
            _userManager = userManager;
            _schemeProvider = schemeProvider;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
            _storage = storage;
        }
        // POST api/account/signin
        /// <summary>
        /// Đăng nhập vào hệ thống
        /// </summary>
        /// <param name="model">
        /// Bao gồm tên đăng nhập và mật khẩu của tài khoản muốn đăng nhập
        /// </param>
        /// <returns>
        /// Nếu thành công sẽ trả về một đối tượng JSON có trường token lưu trữ đoạn mã dùng để xác minh truy cập.
        /// Còn nếu thất bại thì trả về <seealso cref="ControllerBase.ModelState"/> khi request sai format hoặc
        /// <seealso cref="RequestError"/> khi request bao gồm những thông tin không hợp lệ
        /// </returns>
        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn([FromBody] SignInRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest(new[] {new RequestError("IdS_InvalidAccount", "Bad credentials")} );
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!isPasswordValid)
            {
                return BadRequest(new[] { new RequestError("IdS_InvalidAccount", "Bad credentials") });
            }

            var token = await _jwtService.CreateToken(user);


            return Ok(new Dictionary<string, string>()
            {
                ["token"] = token.Content
            });
        }
        //**BACK DOOR**
        // POST api/account/register
        // Dynamically add role (you can add initial roles after created database tables)
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                FullName= model.FullName,
                Scope = model.Scope,
                Note = model.Note,
                Role = model.Role,
                IsActivated = true
            };
            IdentityResult result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_CreateAccountUnknown", "Create Account Unknown Error") });
            }
            string roleName = null;
            switch (model.Role)
            {
                case 1: // ChuTichXa
                    roleName = "CommitteeChairman";
                    break;
                case 2: // KeToan
                    roleName = "Accountant";
                    break;
                case 3: // ToTruong
                    roleName = "ScopeLeader";
                    break;
                case 4: // HoDan
                    roleName = "Household";
                    break;
                default:
                    return BadRequest(new[] { new RequestError("IdS_RoleNotExist", "Account Role = " + model.Role + " (must be a integer in [1, 4]) Cannot Be Found.") });
            }
            IdentityResult roleresult = null;
            if (!(await _roleManager.RoleExistsAsync(roleName))){
                roleresult = await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
            if (roleresult == null || roleresult.Succeeded) roleresult = await _userManager.AddToRoleAsync(user, roleName);

            if (!roleresult.Succeeded)
            {
                if (roleresult.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(roleresult.Errors));
                return BadRequest(new[] { new RequestError("IdS_AddingRoleUnknown", "Add Account Role Unknown Error") });
            }

            return Ok();
        }
        //**BACK DOOR**
        //GET api/account/delete
        [HttpGet("delete")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteAccount([FromQuery]string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if(user != null)
            {
                var result = await _userManager.DeleteAsync(user);
                if (!result.Succeeded)
                {
                    if (result.Errors != null)
                        return BadRequest(RequestError.FromIdentityError(result.Errors));
                    return BadRequest(RequestError.FromMsg("Unknown Error"));
                }
                return Ok();
            }
            return BadRequest(RequestError.FromMsg("User (username = \"" + username + "\") doesn't exist."));



        }
        //POST api/account/changepassword
        /// <summary>
        /// Thay đổi mật khẩu người dùng
        /// </summary>
        /// <param name="model">Mật khẩu cũ để xem xem có phải người sở hữu tài khoản thực hiện thay đổi không 
        /// và mật khẩu mới mà người sở hữu tài khoản muốn đổi thành</param>
        /// <returns>
        /// Nếu thành công sẽ trả về một đối tượng JSON có trường token lưu trữ đoạn mã dùng để xác minh truy cập.
        /// Còn nếu thất bại thì trả về <seealso cref="ControllerBase.ModelState"/> khi request sai format hoặc
        /// <seealso cref="RequestError"/> khi request bao gồm những thông tin không hợp lệ
        /// </returns>
        [HttpPost("changepassword")]
        [Authorize]
        //[ValidateAntiForgeryToken]
        
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if(user== null)
            {
                return Unauthorized("Invalid Token");
            }
            IdentityResult result =
                await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(RequestError.FromMsg("Unknown Error"));
            }

            return Ok();
        }

        [HttpPost("forgotpassword")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            string token = await _userManager.GeneratePasswordResetTokenAsync(user);

            return Ok(token);
        }

        [HttpPost("resetpassword")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            IdentityResult result =
                await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(new[] { new RequestError("IdS_ResetPasswordUnknown", "Unknown Error") });
            }

            return Ok();
        }
        //GET api/account/deleteself
        //[HttpGet("deleteself")]
        //[Authorize]
        //public async Task<IActionResult> DeleteAccount(/*[FromBody] DeleteAccountRequestModel model*/)
        //{
        //    //if (!ModelState.IsValid)
        //    //{
        //    //    return BadRequest(ModelState);
        //    //}

        //    var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        //    IdentityResult result = await _userManager.DeleteAsync(user);

        //    if (!result.Succeeded)
        //    {
        //        if (result.Errors != null)
        //            return BadRequest(result.Errors);
        //        return BadRequest(string.Format("[{0}]", Json(new IdentityError
        //        {
        //            Description = "Unknown Error"
        //        })));
        //    }

        //    return Ok("[]");
        //}
        //GET api/account/profile
        /// <summary>
        /// Get user's profile such as full name, scope
        /// </summary>
        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile(/*[FromBody] DeleteAccountRequestModel model*/)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }

            return Ok(new ProfileResponseModel { 
                FullName = user.FullName, 
                Scope = user.Scope, 
                AvatarLink = user.AvatarLink,
                WallpaperLink = user.WallpaperLink,
            });
        }
        //GET api/account/changeAvatar
        /// <summary>
        /// Dùng để cập nhật hình đại diện của tài khoản người dùng
        /// </summary>
        [HttpPost("changeAvatar")]
        [Authorize]
        public async Task<IActionResult> ChangeAvatar([FromForm(Name = "file")]IFormFile file)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            user.AvatarLink = await _storage.SaveImage(file, "avatar_" + user.UserName);
            IdentityResult result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(new[] { new RequestError("IdS_ChangeAvatarUnknown", "Unknown Error") });
            }
            return Ok(user.AvatarLink);
        }
        //GET api/account/changeWallpaper
        /// <summary>
        /// 
        /// </summary>
        [HttpGet("changeWallpaper")]
        [Authorize]
        public async Task<IActionResult> ChangeWallpaper([FromForm(Name = "file")] IFormFile file)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            user.WallpaperLink = await _storage.SaveImage(file, "wallpaper_" + user.UserName);
            IdentityResult result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(new[] { new RequestError("IdS_ChangeWallpaperUnknown", "Unknown Error") });
            }
            return Ok(user.WallpaperLink);

        }

        //POST api/account/admin/changeAccountProfile
        /// <summary>
        /// Thay đổi thông tin tài khoản bất kì
        /// </summary>
        /// <returns></returns>
        [HttpPost("admin/changeAccountProfile")]
        [Authorize(Roles = "CommitteeChairman")]
        public async Task<IActionResult> CommitteeChairman_ChangeAccountProfile([FromBody] ChangingHouseholdAccountInfoRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            //var manager = await _userManager.FindByIdAsync(id);
            //if (manager == null)
            //{
            //    return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            //}
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest(new[] { new RequestError("IdS_UsernameNotExist", "Jwt token is invalid or something else.") });
            }

            user.FullName = model.FullName ?? user.FullName;
            user.Scope = model.Scope ?? user.Scope;
            user.Note = model.Note ?? user.Note;
            IdentityResult result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_ChangeAccountProfileUnknown", "Change Account Profile Unknown Error.") });
            }

            return Ok();
        }
        //GET api/account/household/AccountList
        /// <summary>
        /// Lấy ra tất cả danh sách tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt 
        /// (Tổ trưởng, thư kí, chủ tịch xã) mới dùng được.
        /// </summary>
        /// <returns></returns>
        [HttpGet("household/AccountList")]
        [Authorize(Roles = "CommitteeChairman, Accountant, ScopeLeader")]
        public async Task<IActionResult> Get_Household_AccountList(/*[FromBody] DeleteAccountRequestModel model*/)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }

            if(await _userManager.IsInRoleAsync(user, "ScopeLeader"))
            {
                return Ok(_userManager.Users.Where(u => u.Scope == user.Scope && u.Role == 4)
                    .Select(u => new HouseholdAccountResponseModel()
                    {
                            UserName = u.UserName,
                            FullName = u.FullName,
                            Scope = u.Scope,
                            Note = u.Note
                    }));
            }
            else
            {

                return Ok(_userManager.Users.Where(u => u.Role == 4)
                    .Select(u => new HouseholdAccountResponseModel()
                    {
                        UserName = u.UserName,
                        FullName = u.FullName,
                        Scope = u.Scope,
                        Note = u.Note
                    }));
            }
        }
        //POST api/account/household/addAccount
        /// <summary>
        /// Thêm tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã) mới dùng được.
        /// </summary>
        [HttpPost("household/addAccount")]
        [Authorize(Roles = "CommitteeChairman, Accountant, ScopeLeader")]
        public async Task<IActionResult> Household_AddAccount([FromBody] AddingHouseholdAccountRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            var isScopeLeader = await _userManager.IsInRoleAsync(manager, "ScopeLeader");
            if(isScopeLeader && manager.Scope != model.Scope)
            {
                return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể tạo người dùng cho tổ " + model.Scope + ".") });
            }
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                FullName = model.FullName,
                Scope = model.Scope,
                Note = model.Note,
                Role = 4,
                IsActivated = true
            };
            IdentityResult result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_CreateAccountUnknown", "Create Account Unknown Error.") });
            }
            string roleName = "Household";
            IdentityResult roleresult = null;
            if (!(await _roleManager.RoleExistsAsync(roleName)))
            {
                roleresult = await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
            if (roleresult == null || roleresult.Succeeded) roleresult = await _userManager.AddToRoleAsync(user, roleName);

            if (!roleresult.Succeeded)
            {
                if (roleresult.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_AddAccountRoleUnknown", "Add Account Role Unknown Error") });
                
            }

            return Ok();
        }
        //POST api/account/household/changeAccountProfile
        /// <summary>
        /// Thay đổi thông tin tài khoản hộ dân, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch xã) mới dùng được.
        /// </summary>
        /// <returns></returns>
        [HttpPost("household/changeAccountProfile")]
        [Authorize(Roles = "CommitteeChairman, Accountant, ScopeLeader")]
        public async Task<IActionResult> Household_ChangeAccountProfile([FromBody] ChangingHouseholdAccountInfoRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest(new[] { new RequestError("IdS_UsernameNotExist", "Jwt token is invalid or something else.") });
            }
            var isScopeLeader = await _userManager.IsInRoleAsync(manager, "ScopeLeader");
            if (isScopeLeader && manager.Scope != user.Scope)
            {
                return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể tạo người dùng cho tổ " + model.Scope + ".") });
            }

            user.FullName = model.FullName ?? user.FullName;
            user.Scope = model.Scope ?? user.Scope;
            user.Note = model.Note ?? user.Note;
            IdentityResult result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_ChangeAccountProfileUnknown", "Change Account Profile Unknown Error.") });
            }

            return Ok();
        }
        //POST api/account/household/unactivateAccount
        /// <summary>
        /// Thay đổi thông tin tài khoản hộ dân
        /// </summary>
        /// <returns></returns>
        //[HttpGet("household/unactivateAccount")]
        //[Authorize(Roles = "CommitteeChairman, Accountant, ScopeLeader")]
        //public async Task<IActionResult> Get_Household_UnactivateAccount([FromBody] RemovingAccountRequestModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //    var manager = await _userManager.FindByIdAsync(id);
        //    if (manager == null)
        //    {
        //        return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
        //    }
        //    var isScopeLeader = await _userManager.IsInRoleAsync(manager, "ScopeLeader");
        //    var user = await _userManager.FindByIdAsync(model.UserName);
        //    if (user == null)
        //    {
        //        return BadRequest(new[] { new RequestError("IdS_UsernameNotExist", "Jwt token is invalid or something else.") });
        //    }
        //    if (isScopeLeader && manager.Scope != user.Scope)
        //    {
        //        return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể tạo người dùng cho tổ " + model.Scope + ".") });
        //    }
        //    //IdentityResult result = await _userManager.UpdateAsync(user);
        //    //if (!result.Succeeded)
        //    //{
        //    //    if (result.Errors != null)
        //    //        return BadRequest(RequestError.FromIdentityError(result.Errors));
        //    //    return BadRequest(new[] { new RequestError("IdS_ChangeAccountProfileUnknown", "Change Account Profile Unknown Error.") });
        //    //}

        //    return Ok();
        //}
        //GET api/account/special/AccountList
        /// <summary>
        /// Lấy ra tất cả danh sách tài khoản cấp đặc biệt
        /// </summary>
        /// <returns></returns>
        [HttpGet("special/AccountList")]
        [Authorize(Roles = "CommitteeChairman, Accountant")]
        public async Task<IActionResult> Get_Special_AccountList(/*[FromBody] DeleteAccountRequestModel model*/)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            //System.Diagnostics.Debugger.Break();
            if (await _userManager.IsInRoleAsync(user, "Accountant"))
            {
                return Ok(_userManager.Users.Where(u => u.Role == 3)
                    .Select(u => new SpecialAccountResponseModel()
                    {
                        UserName = u.UserName,
                        FullName = u.FullName,
                        Role = u.Role,
                        Scope = u.Scope,
                        Note = u.Note
                    }));
            }
            else
            {

                return Ok(_userManager.Users.Where(u => u.Role == 3 || u.Role == 2)
                    .Select(u => new SpecialAccountResponseModel()
                    {
                        UserName = u.UserName,
                        FullName = u.FullName,
                        Role = u.Role,
                        Scope = u.Scope,
                        Note = u.Note
                    }));
            }
        }
        //POST api/account/special/addAccount
        /// <summary>
        /// Thêm tài khoản cấp đặc biệt
        /// </summary>
        /// <returns>
        /// Một danh sách các lỗi, 
        /// Nếu không có lỗi thì trả về danh sách rỗng (danh sách có 0 phần tử)
        /// </returns>
        [HttpPost("special/addAccount")]
        [Authorize(Roles = "CommitteeChairman, Accountant")]
        public async Task<IActionResult> Special_AddAccount([FromBody] AddingSpecialAccountRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            if(model.Role == 1)
            {
                return BadRequest(new[] { new RequestError("IdS_RoleOutOfManagement", "Không thể tạo được tài khoản cấp Chủ tịch phường.") });
            }
            if (model.Role == 2)
            {
                var isAccountant = await _userManager.IsInRoleAsync(manager, "Accountant");
                if (isAccountant)
                    return BadRequest(new[] { new RequestError("IdS_RoleOutOfManagement", "Tài khoản cấp Kế toán không thể tạo được tài khoản cấp Kế toán khác.") });
            }
            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                FullName = model.FullName,
                Scope = model.Scope,
                Note = model.Note,
                Role = model.Role,
                IsActivated = true
            };
            IdentityResult result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_CreateAccountUnknown", "Create Account Unknown Error.") });
            }
            string roleName = null;
            switch (model.Role)
            {
                case 1: // ChuTichXa
                    roleName = "CommitteeChairman";
                    break;
                case 2: // KeToan
                    roleName = "Accountant";
                    break;
                case 3: // ToTruong
                    roleName = "ScopeLeader";
                    break;
                case 4: // HoDan
                    roleName = "Household";
                    break;
                default:
                    return BadRequest(new[] { new RequestError("IdS_RoleNotExist", "Account Role = " + model.Role + " (must be a integer in [1, 4]) Cannot Be Found.") });
            }
            IdentityResult roleresult = null;
            if (!(await _roleManager.RoleExistsAsync(roleName)))
            {
                roleresult = await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
            if (roleresult == null || roleresult.Succeeded) roleresult = await _userManager.AddToRoleAsync(user, roleName);

            if (!roleresult.Succeeded)
            {
                if (roleresult.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_AddAccountRoleUnknown", "Add Account Role Unknown Error") });

            }

            return Ok();
        }
        //POST api/account/special/changeAccountProfile
        /// <summary>
        /// Thay đổi thông tin tài khoản cấp đặc biệt
        /// </summary>
        /// <returns></returns>
        [HttpPost("special/changeAccountProfile")]
        [Authorize(Roles = "CommitteeChairman, Accountant")]
        public async Task<IActionResult> Special_ChangeAccountProfile([FromBody] ChangingHouseholdAccountInfoRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return BadRequest(new[] { new RequestError("IdS_UsernameNotExist", "Jwt token is invalid or something else.") });
            }

            if (manager.Role >= user.Role)
            {
                return BadRequest(new[] { new RequestError("IdS_RoleOutOfManagement", "Không thể chỉnh sửa thông tin của tài khoản có cấp độ lớn hơn hoặc bằng tài khoản của mình.") });
            }

            user.FullName = model.FullName ?? user.FullName;
            user.Scope = model.Scope ?? user.Scope;
            user.Note = model.Note ?? user.Note;
            IdentityResult result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(RequestError.FromIdentityError(result.Errors));
                return BadRequest(new[] { new RequestError("IdS_ChangeAccountProfileUnknown", "Change Account Profile Unknown Error.") });
            }

            return Ok();
        }
        #region Helper
        private JsonSerializerOptions _jsonSerializerOptions = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        public string Json<T>(T o)
        {
            return JsonSerializer.Serialize(o, _jsonSerializerOptions);
        }
        #endregion
    }
}
