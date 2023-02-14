using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client.Extensions.Msal;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.HouseholdForms;
using QLHoDan.Models.HouseholdForms.DeadForm;
using QLHoDan.Services;
using QLHoDan.Utilities;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.Reward
{
    [Route("api/forms/Dead")]
    [ApiController]
    public class DeadFormsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly NotificationService _notification;

        private readonly StorageService _storage;

        public DeadFormsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    NotificationService notification,
                                    StorageService storage)
        {
            _context = context;
            _userManager = userManager;
            _storage = storage;
            _notification = notification;
        }
        // GET: api/forms/Dead
        /// <summary>
        ///Lấy ra danh sách form chứng tử. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên
        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetDeadForms([FromQuery] bool? isChecked = null)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") );
            }
            if (user.Role > 3)
            {
                return Ok(_context.DeadForm.Include(f => f.Resident)
                                .Where(f => f.Account == user.UserName)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "Dead",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else if (user.Role == 3)
            {
                return Ok(_context.DeadForm.Include(f => f.Resident)
                                .Where(f => f.AccountScope == user.Scope)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "Dead",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else return Ok(_context.DeadForm.Include(f => f.Resident)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "Dead",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
        }
        // GET: api/forms/Dead/5
        /// <summary>
        ///Lấy ra thông tin chi tiết của form chứng tử. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên
        /// </summary>
        /// <param name="id">
        /// mã định danh của form chứng tử
        /// </param>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetDeadForm([FromRoute] int id)
        {
            var form = await _context.DeadForm.Include(f => f.Resident)
                                .FirstOrDefaultAsync(f => id == f.Id);
            if (form == null)
            {
                return NotFound();
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") );
            }
            if (user.Role > 3)
            {
                if(user.UserName != form.Account) { return NotFound(); }
            }
            else if (user.Role == 3)
            {
                if (user.Scope != form.AccountScope) {
                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể chỉnh sửa form của tổ " + form.AccountScope + ".") );
                }
            }
            DeadFormDetail deadformdetail = new DeadFormDetail()
            {
                Id = form.Id,
                Resident = new ResidentBriefInfo()
                {
                    IdentityCode = form.Resident.IdentityCode,
                    FullName = form.Resident.FullName,
                    DateOfBirth = form.Resident.DateOfBirth,
                    IsMale = form.Resident.IsMale,
                    HouseholdId = form.Resident.HouseholdId,
                    RelationShip = form.Resident.RelationShip,
                    Scope = form.Resident.Scope,
                },
                ImageLinks = form.ImageLinks,
                CreatedTime = form.CreatedTime,
                IsAccepted = form.IsAccepted,
                NotAcceptedReason = form.NotAcceptedReason,
                Account = form.Account,
            };
            return Ok(deadformdetail);
        }

        // POST: api/forms/Dead
        /// <summary>
        /// Gửi form chứng tử
        /// </summary>
        [HttpPost()]
        [Authorize()]
        public async Task<IActionResult> PostDeadForm([FromForm] AddingDeadFormRequestModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") );
            }

            var resident = await _context.Resident.FindAsync(model.ResidentIdCode);
            if (resident == null)
            {
                return BadRequest(new RequestError("ResidentNotFound", "Nhân khẩu không tồn tại trong CSDL."));
            }
            if (resident.IsDead)
            {
                return BadRequest(new RequestError("ResidentDead", "Nhân khẩu dã được cán bộ quản lý xác định là đã mất trước đó."));
            }
            DeadForm f = new DeadForm()
            {
                Resident = resident,
                ImageLinks = new List<string>(),
                CreatedTime = DateTime.Now,
                IsAccepted = false,
                NotAcceptedReason = null,
                Account = user.UserName,
                AccountScope = user.Scope,
            };

            foreach(var img in model.Images)
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

            _context.DeadForm.Add(f);
            await _context.SaveChangesAsync();

            return Ok(new FormBriefInfo()
            {
                Id = f.Id,
                FormType = "Dead",
                Title = FormHelper.GetFormTitle(f),
                CreatedTime = f.CreatedTime,
                IsAccepted = f.IsAccepted,
                NotAcceptedReason = f.NotAcceptedReason,
                Account = f.Account,
            });
        }


        // POST: api/forms/Dead/accept/5
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
        public async Task<IActionResult> CheckDeadForm([FromRoute] int id, [FromBody] AcceptingFormRequestModel model)
        {
            var form = await _context.DeadForm.Include(f => f.Resident).FirstOrDefaultAsync(f => id == f.Id);
            if (form == null)
            {
                return NotFound();
            }
            if(form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
            {
                return BadRequest(new RequestError("CheckedForm", "Form đã được kiểm tra (phê duyệt hoặc bị từ chối) nên không thể kiểm tra lại nữa."));
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") );
            }
            if (user.Role == 3)
            {
                if (user.Scope != form.AccountScope) {
                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể xét duyệt form của tổ " + form.AccountScope + ".") );
                }
            }

            string msg;
            form.IsAccepted = model.Accept;
            if (model.Accept)
            {
                msg = $"{FormHelper.GetFormTitle(form)} đã được phê duyệt.";

                var resident = form.Resident;
                resident.IsDead = true;
                if(resident.RelationShip == "Chủ hộ")
                {
                    var household = await _context.Household.Include(h => h.Members).FirstOrDefaultAsync(h => h.HouseholdId == resident.HouseholdId);
                    var mem = household.Members.FirstOrDefault(nk => nk.RelationShip != "Chủ hộ");
                    if (mem == null)
                    {
                        household.IsManaged = false;
                        _context.Household.Update(household);
                    }
                    else
                    {
                        mem.RelationShip = "Chủ hộ";
                    }
                }
                resident.Household = null;
                resident.HouseholdId = null;
                _context.Resident.Update(resident);

            }
            else
            {
                if (string.IsNullOrEmpty(model.NotAcceptReason))
                    return BadRequest(new RequestError("InvalidNotAcceptedReason", "`NotAcceptedReason` bắt buộc phải có nếu như từ chối.") );
                form.NotAcceptedReason = model.NotAcceptReason;
                msg = $"{FormHelper.GetFormTitle(form)} đã bị từ chối do {model.NotAcceptReason}.";
            }

            _context.DeadForm.Update(form);
            await _context.SaveChangesAsync();

            await _notification.Notify(user.UserName, new []{form.Account }, null, msg);

            return Ok();
        }

        // DELETE: api/forms/Dead/5
        /// <summary>
        ///Rút lại form minh chứng thành tích (có thể do thấy sai hay gì đó). 
        ///Hành động này chỉ thực hiện được khi form chưa được duyệt.
        /// </summary>
        /// <param name="id">
        /// mã định danh của form minh chứng thành tích
        /// </param>
        [HttpDelete("{id}")]
        [Authorize()]
        public async Task<IActionResult> DeleteDeadForm([FromRoute] int id)
        {
            var userName = User.FindFirst(ClaimTypes.Name).Value;
            var form = await _context.DeadForm.FirstOrDefaultAsync(f => id == f.Id && f.Account == userName);
            if (form == null)
            {
                return NotFound();
            }

            if(form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
            {
                return BadRequest(new RequestError("CheckedForm", "Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại.") );
            }

            foreach (var img in form.ImageLinks)
            {
                _storage.RemoveImage(img);
            }

            _context.DeadForm.Remove(form);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
