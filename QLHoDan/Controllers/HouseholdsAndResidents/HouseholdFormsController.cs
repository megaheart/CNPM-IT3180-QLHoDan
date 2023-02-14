using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QLHoDan.Data;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdForms.HouseholdForm;
using QLHoDan.Models.HouseholdForms;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models;
using QLHoDan.Services;
using QLHoDan.Utilities;
using System.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.SqlServer.Server;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/forms/Household")]
    [ApiController]
    public class HouseholdFormsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly NotificationService _notification;

        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly StorageService _storage;
        private readonly ITokenCreationService _jwtService;

        public HouseholdFormsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    RoleManager<IdentityRole> roleManager,
                                    NotificationService notification,
                                    ITokenCreationService jwtService,
                                    StorageService storage)
        {
            _context = context;
            _userManager = userManager;
            _storage = storage;
            _notification = notification;
            _jwtService = jwtService;
            _roleManager= roleManager;
        }
        // GET: api/forms/Household
        /// <summary>
        ///Lấy ra danh sách form Đăng kí hộ khẩu, nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên
        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetHouseholdForms([FromQuery] bool? isChecked = null)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            if (user.Role > 3)
            {
                return Ok(_context.HouseholdForm
                                .Where(f => f.HouseholdId == user.UserName)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "Household",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = "",
                                }));
            }
            else if (user.Role == 3)
            {
                return Ok(_context.HouseholdForm
                                .Where(f => f.Scope == user.Scope)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "Household",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = "",
                                }));
            }
            else return Ok(_context.HouseholdForm
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "Household",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = "",
                                }));
        }
        // GET: api/forms/Household/5
        /// <summary>
        ///Lấy ra thông tin chi tiết của form Đăng kí hộ khẩu, nhân khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên
        /// </summary>
        /// <param name="id">
        /// mã định danh của form Đăng kí hộ khẩu, nhân khẩu
        /// </param>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetHouseholdForm([FromRoute] int id)
        {
            var form = await _context.HouseholdForm
                                .FirstOrDefaultAsync(f => id == f.Id);
            if (form == null)
            {
                return NotFound();
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            if (user.Role > 3)
            {
                if (user.UserName != form.HouseholdId) { return NotFound(); }
            }
            else if (user.Role == 3)
            {
                if (user.Scope != form.Scope)
                {
                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể chỉnh sửa form của tổ " + form.Scope + "."));
                }
            }
            return Ok(form);
        }

        // POST: api/forms/Household
        /// <summary>
        /// Gửi form chứng tử
        /// </summary>
        [HttpPost()]
        public async Task<IActionResult> PostHouseholdForm([FromForm] AddingHouseholdFormRequestModel model)
        {
            if(await _context.Household.AnyAsync(h => h.HouseholdId == model.HouseholdId))
            {
                return BadRequest(new RequestError("HouseholdExist", "Hộ khẩu đã được quản lý bởi hệ thống, không thể thêm mới."));
            }
            List<ResidentForm> member = null;
            try
            {
                member = System.Text.Json.JsonSerializer.Deserialize<List<AddingResidentFormRequestModel>>(model.Members)
                           .Select(f => new ResidentForm()
                           {
                               FullName = f.FullName,
                               Alias = f.Alias,
                               DateOfBirth = f.DateOfBirth,
                               IsMale = f.IsMale,
                               BirthPlace = f.BirthPlace,
                               NativeLand = f.NativeLand,
                               Ethnic = f.Ethnic,
                               Nation = f.Nation,
                               Job = f.Job,
                               Workplace = f.Workplace,
                               IdentityCode = f.IdentityCode,
                               RelationShip = f.Nation,
                               AcademicLevel = f.AcademicLevel,
                               CriminalRecord = f.CriminalRecord,
                               MoveInDate = f.MoveInDate,
                               MoveInReason = f.MoveInReason,
                           }).ToList();
            }
            catch (Exception ex)
            {
                return BadRequest(new RequestError("InvalidMembers", "`Members` phải là 1 danh sách các AddingResidentFormRequestModel ở dạng json"));
            }
            HouseholdForm f = new HouseholdForm()
            {
                HouseholdId = model.HouseholdId,
                Address = model.Address,
                Members = member,
                Scope = model.Scope,
                CreatedTime = DateTime.Now,
                ImageLinks = new List<string>(),
                IsAccepted = false,
                NotAcceptedReason = null
            };

            foreach (var img in model.Images)
            {
                var link = await _storage.SaveImage(img);
                if (string.IsNullOrEmpty(link))
                {
                    f.ImageLinks.ForEach(link => _storage.RemoveImage(link));
                    return BadRequest(new RequestError()
                    {
                        Code = "FileContentTypeInvalid",
                        Description = "File của bạn không phải file ảnh"
                    });
                }
                f.ImageLinks.Add(link);
            }
            var user = new ApplicationUser()
            {
                UserName = "guest_" + model.HouseholdId,
                Id = "ashdbahsbkjasjkndjanskjdnjk"
            };
            var token = await _jwtService.CreateToken(user);

            _context.HouseholdForm.Add(f);
            await _context.SaveChangesAsync();

            return Ok(new FormBriefInfo()
            {
                Id = f.Id,
                FormType = "Household",
                Title = FormHelper.GetFormTitle(f),
                CreatedTime = f.CreatedTime,
                IsAccepted = f.IsAccepted,
                NotAcceptedReason = f.NotAcceptedReason,
                Account = token.Content,
            });
        }


        // POST: api/forms/Household/accept/5
        /// <summary>
        ///Phê duyệt hoặc từ chối form chứng tử. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách
        /// </summary>
        /// <param name="id">
        /// mã định danh của form minh chứng thành tích
        /// </param>
        [HttpPost("accept/{id}")]
        [Authorize(Roles = "CommitteeChairman,Accountant,ScopeLeader")]
        public async Task<IActionResult> CheckHouseholdForm([FromRoute] int id, [FromBody] AcceptingFormRequestModel model)
        {
            var form = await _context.HouseholdForm.Include(f => f.Members).FirstOrDefaultAsync(f => id == f.Id);
            if (form == null)
            {
                return NotFound();
            }
            if (form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
            {
                return BadRequest(new RequestError("CheckedForm", "Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa."));
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            if (user.Role == 3)
            {
                if (user.Scope != form.Scope)
                {
                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể xét duyệt form của tổ " + form.Scope + "."));
                }
            }

            string msg;
            form.IsAccepted = model.Accept;
            if (model.Accept)
            {
                msg = $"{FormHelper.GetFormTitle(form)} đã được phê duyệt. Mời bạn đăng nhập vào tài khoản `{form.HouseholdId}` với mật khẩu là `{form.HouseholdId}` (bỏ hết dấu `) để trải nghiệm dịch vụ công của phường. Sau khi đăng nhập vui lòng đổi mật khẩu để tránh bị truy cập trái phép và mạo danh.";
                //Thêm tài khoản
                var addUser = new ApplicationUser()
                {
                    UserName = form.HouseholdId,
                    FullName = form.Members.FirstOrDefault(x => x.RelationShip == "Chủ hộ")?.FullName ?? "No name",
                    Scope = form.Scope,
                    Note = "",
                    Role = 4,
                    IsActivated = true
                };
                await _userManager.CreateAsync(user, form.HouseholdId);
                IdentityResult roleresult = null;
                if (!await _roleManager.RoleExistsAsync("Household"))
                {
                    roleresult = await _roleManager.CreateAsync(new IdentityRole("Household"));
                }
                if (roleresult == null || roleresult.Succeeded) roleresult = await _userManager.AddToRoleAsync(user, "Household");
                //Thêm hộ khẩu
                Household household = new Household()
                {
                    HouseholdId = form.HouseholdId,
                    Address = form.Address,
                    Scope = form.Scope,
                    CreatedTime = DateTime.Now,
                    IsManaged = true,
                    Members = new List<Resident>()
                };
                foreach (var mem in form.Members)
                {
                    Resident resident = new Resident()
                    {
                        FullName = mem.FullName,
                        Alias = mem.Alias,
                        DateOfBirth = mem.DateOfBirth,
                        IsMale = mem.IsMale,
                        BirthPlace = mem.BirthPlace,
                        NativeLand = mem.NativeLand,
                        Ethnic = mem.Ethnic,
                        Nation = mem.Nation,
                        Job = mem.Job,
                        Workplace = mem.Workplace,
                        IdentityCode = mem.IdentityCode,
                        IDCardDate = null,
                        IDCardPlace = null,
                        RelationShip = mem.RelationShip,
                        IsManaged = true,
                        IsDead = false,
                        AcademicLevel = mem.AcademicLevel,
                        CriminalRecord = mem.CriminalRecord,
                        MoveInDate = mem.MoveInDate,
                        MoveInReason = mem.MoveInReason,
                        Scope = household.Scope,
                    };
                    household.Members.Add(resident);

                }
                _context.Household.Add(household);
                //_context.ResidentChangeRecord.Add(new ResidentChangeRecord()
                //{
                //    CreatedTime = DateTime.Now,
                //    ChangeType = ,
                //    Resident = ,
                //    Content = ,
                //    FormId = ,
                //});
                await _context.SaveChangesAsync();
            }
            else
            {
                if (string.IsNullOrEmpty(model.NotAcceptReason))
                    return BadRequest(new RequestError("InvalidNotAcceptedReason", "`NotAcceptedReason` bắt buộc phải có nếu như từ chối."));
                form.NotAcceptedReason = model.NotAcceptReason;
                msg = $"{FormHelper.GetFormTitle(form)} đã bị từ chối do {model.NotAcceptReason}.";
            }


            _context.HouseholdForm.Update(form);
            await _context.SaveChangesAsync();

            await _notification.ForceNotify(user.UserName,  "guest_" + form.HouseholdId, msg);

            return Ok();
        }

        //// DELETE: api/forms/Household/5
        ///// <summary>
        /////Rút lại form minh chứng thành tích (có thể do thấy sai hay gì đó). 
        /////Hành động này chỉ thực hiện được khi form chưa được duyệt.
        ///// </summary>
        ///// <param name="id">
        ///// mã định danh của form minh chứng thành tích
        ///// </param>
        //[HttpDelete("{id}")]
        //[Authorize()]
        //public async Task<IActionResult> DeleteHouseholdForm([FromRoute] int id)
        //{
        //    var userName = User.FindFirst(ClaimTypes.Name).Value;
        //    var form = await _context.HouseholdForm.FirstOrDefaultAsync(f => id == f.Id && f.Account == userName);
        //    if (form == null)
        //    {
        //        return NotFound();
        //    }

        //    if (form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
        //    {
        //        return BadRequest(new RequestError("CheckedForm", "Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại."));
        //    }

        //    foreach (var img in form.ImageLinks)
        //    {
        //        _storage.RemoveImage(img);
        //    }

        //    _context.HouseholdForm.Remove(form);
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}
    }
}
