//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.CodeAnalysis;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Identity.Client.Extensions.Msal;
//using QLHoDan.Data;
//using QLHoDan.Models;
//using QLHoDan.Models.Api;
//using QLHoDan.Models.HouseholdForms;
//using QLHoDan.Models.HouseholdForms.AddingResidentForm;
//using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
//using QLHoDan.Services;
//using QLHoDan.Utilities;
//using System.Security.Claims;


//namespace QLHoDan.Controllers.HouseholdsAndResidents
//{
//    [Route("api/forms/AddingResident")]
//    [ApiController]
//    public class AddingResidentFormsController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;
//        private readonly UserManager<ApplicationUser> _userManager;

//        private readonly NotificationService _notification;

//        private readonly StorageService _storage;

//        public AddingResidentFormsController(ApplicationDbContext context,
//                                    UserManager<ApplicationUser> userManager,
//                                    NotificationService notification,
//                                    StorageService storage)
//        {
//            _context = context;
//            _userManager = userManager;
//            _storage = storage;
//            _notification = notification;
//        }
//        // GET: api/forms/AddingResident
//        /// <summary>
//        ///Lấy ra danh sách form thêm nhân khẩu mới. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
//        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
//        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
//        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
//        [HttpGet()]
//        [Authorize]
//        public async Task<IActionResult> GetAddingResidentForms([FromQuery] bool? isChecked = null)
//        {
//            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
//            var user = await _userManager.FindByIdAsync(id);
//            if (user == null)
//            {
//                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
//            }
//            if (user.Role > 3)
//            {
//                return Ok(_context.AddingResidentForm.Include(f => f.Resident)
//                                .Where(f => f.Account == user.UserName)
//                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
//                                .Select(f => new FormBriefInfo()
//                                {
//                                    Id = f.Id,
//                                    FormType = "AddingResident",
//                                    Title = FormHelper.GetFormTitle(f),
//                                    CreatedTime = f.CreatedTime,
//                                    IsAccepted = f.IsAccepted,
//                                    NotAcceptedReason = f.NotAcceptedReason,
//                                    Account = f.Account,
//                                }));
//            }
//            else if (user.Role == 3)
//            {
//                return Ok(_context.AddingResidentForm.Include(f => f.Resident)
//                                .Where(f => f.AccountScope == user.Scope)
//                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
//                                .Select(f => new FormBriefInfo()
//                                {
//                                    Id = f.Id,
//                                    FormType = "AddingResident",
//                                    Title = FormHelper.GetFormTitle(f),
//                                    CreatedTime = f.CreatedTime,
//                                    IsAccepted = f.IsAccepted,
//                                    NotAcceptedReason = f.NotAcceptedReason,
//                                    Account = f.Account,
//                                }));
//            }
//            else return Ok(_context.AddingResidentForm.Include(f => f.Resident)
//                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
//                                .Select(f => new FormBriefInfo()
//                                {
//                                    Id = f.Id,
//                                    FormType = "AddingResident",
//                                    Title = FormHelper.GetFormTitle(f),
//                                    CreatedTime = f.CreatedTime,
//                                    IsAccepted = f.IsAccepted,
//                                    NotAcceptedReason = f.NotAcceptedReason,
//                                    Account = f.Account,
//                                }));
//        }
//        // GET: api/forms/AddingResident/5
//        /// <summary>
//        ///Lấy ra thông tin chi tiết của form thêm nhân khẩu mới. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
//        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
//        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
//        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
//        /// </summary>
//        /// <param name="id">
//        /// mã định danh của form thêm nhân khẩu mới
//        /// </param>
//        [HttpGet("{id}")]
//        [Authorize]
//        public async Task<IActionResult> GetAddingResidentForm([FromRoute] int id)
//        {
//            var form = await _context.AddingResidentForm.Include(f => f.Resident)
//                                .FirstOrDefaultAsync(f => id == f.Id);
//            if (form == null)
//            {
//                return NotFound();
//            }
//            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
//            var user = await _userManager.FindByIdAsync(userId);
//            if (user == null)
//            {
//                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
//            }
//            if (user.Role > 3)
//            {
//                if (user.UserName != form.Account) { return NotFound(); }
//            }
//            else if (user.Role == 3)
//            {
//                if (user.Scope != form.AccountScope)
//                {
//                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể chỉnh sửa form của tổ " + form.AccountScope + "."));
//                }
//            }
//            AddingResidentFormDetail AddingResidentformdetail = new AddingResidentFormDetail()
//            {
//                Id = form.Id,
//                Resident = new ResidentBriefInfo()
//                {
//                    IdentityCode = form.Resident.IdentityCode,
//                    FullName = form.Resident.FullName,
//                    DateOfBirth = form.Resident.DateOfBirth,
//                    IsMale = form.Resident.IsMale,
//                    HouseholdId = form.Resident.HouseholdId,
//                    RelationShip = form.Resident.RelationShip,
//                    Scope = form.Resident.Scope,
//                },
//                FullName = form.FullName,
//                Alias = form.Alias,
//                DateOfBirth = form.DateOfBirth,
//                IsMale = form.IsMale,
//                BirthPlace = form.BirthPlace,
//                NativeLand = form.NativeLand,
//                Ethnic = form.Ethnic,
//                Nation = form.Nation,
//                Job = form.Job,
//                Workplace = form.Workplace,
//                AcademicLevel = form.AcademicLevel,
//                CriminalRecord = form.CriminalRecord,
//                Reason = form.Reason,
//                CreatedTime = form.CreatedTime,
//                IsAccepted = form.IsAccepted,
//                NotAcceptedReason = form.NotAcceptedReason,
//                Account = form.Account,
//            };
//            return Ok(AddingResidentformdetail);
//        }

//        // POST: api/forms/AddingResident
//        /// <summary>
//        /// Gửi form thêm nhân khẩu mới
//        /// </summary>
//        [HttpPost()]
//        [Authorize()]
//        public async Task<IActionResult> PostAddingResidentForm([FromForm] AddingAddingResidentFormRequestModel model)
//        {
//            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
//            var user = await _userManager.FindByIdAsync(userId);
//            if (user == null)
//            {
//                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
//            }

//            var resident = await _context.Resident.FindAsync(model.ResidentIdCode);
//            if (resident == null)
//            {
//                return BadRequest(new RequestError("ResidentNotFound", "Nhân khẩu không tồn tại trong CSDL."));
//            }

//            AddingResidentForm f = new AddingResidentForm()
//            {
//                Resident = resident,
//                FullName = model.FullName,
//                Alias = model.Alias,
//                DateOfBirth = model.DateOfBirth,
//                IsMale = model.IsMale,
//                BirthPlace = model.BirthPlace,
//                NativeLand = model.NativeLand,
//                Ethnic = model.Ethnic,
//                Nation = model.Nation,
//                Job = model.Job,
//                Workplace = model.Workplace,
//                AcademicLevel = model.AcademicLevel,
//                CriminalRecord = model.CriminalRecord,
//                Reason = model.Reason,
//                CreatedTime = DateTime.Now,
//                IsAccepted = false,
//                NotAcceptedReason = null,
//                Account = user.UserName,
//                AccountScope = user.Scope,
//            };


//            _context.AddingResidentForm.Add(f);
//            await _context.SaveChangesAsync();

//            return Ok(new FormBriefInfo()
//            {
//                Id = f.Id,
//                FormType = "AddingResident",
//                Title = FormHelper.GetFormTitle(f),
//                CreatedTime = f.CreatedTime,
//                IsAccepted = f.IsAccepted,
//                NotAcceptedReason = f.NotAcceptedReason,
//                Account = f.Account,
//            });
//        }


//        // POST: api/forms/AddingResident/accept/5
//        /// <summary>
//        ///Phê duyệt hoặc từ chối form thêm nhân khẩu mới. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
//        ///1. Chủ tịch phường, kế toán: Duyệt được form của toàn bộ phường<br/>
//        ///2. Tổ trưởng: Chỉ duyệt được form của chỉ tổ phụ trách
//        /// </summary>
//        /// <param name="id">
//        /// mã định danh của form thêm nhân khẩu mới
//        /// </param>
//        [HttpPost("accept/{id}")]
//        [Authorize(Roles = "CommitteeChairman,Accountant,ScopeLeader")]
//        public async Task<IActionResult> CheckAddingResidentForm([FromRoute] int id, [FromBody] AcceptingFormRequestModel model)
//        {
//            var form = await _context.AddingResidentForm.Include(f => f.Resident).FirstOrDefaultAsync(f => id == f.Id);
//            if (form == null)
//            {
//                return NotFound();
//            }
//            if (form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
//            {
//                return BadRequest(new RequestError("CheckedForm", "Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa."));
//            }
//            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
//            var user = await _userManager.FindByIdAsync(userId);
//            if (user == null)
//            {
//                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
//            }
//            if (user.Role == 3)
//            {
//                if (user.Scope != form.AccountScope)
//                {
//                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể xét duyệt form của tổ " + form.AccountScope + "."));
//                }
//            }

//            string msg;
//            form.IsAccepted = model.Accept;
//            if (model.Accept)
//            {
//                msg = $"{FormHelper.GetFormTitle(form)} đã được phê duyệt.";

//                var resident = form.Resident;
//                resident.FullName = form.FullName ?? resident.FullName;
//                resident.Alias = form.Alias ?? resident.Alias;
//                resident.DateOfBirth = form.DateOfBirth ?? resident.DateOfBirth;
//                resident.IsMale = form.IsMale ?? resident.IsMale;
//                resident.BirthPlace = form.BirthPlace ?? resident.BirthPlace;
//                resident.NativeLand = form.NativeLand ?? resident.NativeLand;
//                resident.Ethnic = form.Ethnic ?? resident.Ethnic;
//                resident.Nation = form.Nation ?? resident.Nation;
//                resident.Job = form.Job ?? resident.Job;
//                resident.Workplace = form.Workplace ?? resident.Workplace;
//                resident.AcademicLevel = form.AcademicLevel ?? resident.AcademicLevel;
//                resident.CriminalRecord = form.CriminalRecord ?? resident.CriminalRecord;

//                _context.Resident.Update(resident);
//            }
//            else
//            {
//                if (string.IsNullOrEmpty(model.NotAcceptReason))
//                    return BadRequest(new RequestError("InvalidNotAcceptedReason", "`NotAcceptedReason` bắt buộc phải có nếu như từ chối."));
//                form.NotAcceptedReason = model.NotAcceptReason;
//                msg = $"{FormHelper.GetFormTitle(form)} đã bị từ chối do {model.NotAcceptReason}.";
//            }

//            _context.AddingResidentForm.Update(form);
//            await _context.SaveChangesAsync();

//            await _notification.Notify(user.UserName, new[] { form.Account }, null, msg);

//            return Ok();
//        }

//        // DELETE: api/forms/AddingResident/5
//        /// <summary>
//        ///Rút lại form thêm nhân khẩu mới (có thể do thấy sai hay gì đó). 
//        ///Hành động này chỉ thực hiện được khi form chưa được duyệt.
//        /// </summary>
//        /// <param name="id">
//        /// mã định danh của form
//        /// </param>
//        [HttpDelete("{id}")]
//        [Authorize()]
//        public async Task<IActionResult> DeleteAddingResidentForm([FromRoute] int id)
//        {
//            var userName = User.FindFirst(ClaimTypes.Name).Value;
//            var form = await _context.AddingResidentForm.FirstOrDefaultAsync(f => id == f.Id && f.Account == userName);
//            if (form == null)
//            {
//                return NotFound();
//            }

//            if (form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
//            {
//                return BadRequest(new RequestError("CheckedForm", "Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại."));
//            }

//            _context.AddingResidentForm.Remove(form);
//            await _context.SaveChangesAsync();

//            return Ok();
//        }
//    }
//}
