using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client.Extensions.Msal;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.HouseholdsAndResidents.HouseholdApi;
using QLHoDan.Models.HouseholdForms;
using QLHoDan.Models.HouseholdForms.ChangingHouseholdForm;
using QLHoDan.Services;
using QLHoDan.Utilities;
using System.Security.Claims;

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/forms/ChangingHousehold")]
    [ApiController]
    public class ChangingHouseholdFormsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly NotificationService _notification;

        private readonly StorageService _storage;

        public ChangingHouseholdFormsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    NotificationService notification,
                                    StorageService storage)
        {
            _context = context;
            _userManager = userManager;
            _storage = storage;
            _notification = notification;
        }
        // GET: api/forms/ChangingHousehold
        /// <summary>
        ///Lấy ra danh sách form chuyển hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetChangingHouseholdForms([FromQuery] bool? isChecked = null)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            if (user.Role > 3)
            {
                return Ok(_context.ChangingHouseholdForm.Include(f => f.Resident).Include(f => f.NewHousehold)
                                .Where(f => f.Account == user.UserName)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChangingHousehold",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else if (user.Role == 3)
            {
                return Ok(_context.ChangingHouseholdForm.Include(f => f.Resident).Include(f => f.NewHousehold)
                                .Where(f => f.AccountScope == user.Scope)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChangingHousehold",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else return Ok(_context.ChangingHouseholdForm.Include(f => f.Resident).Include(f => f.NewHousehold)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChangingHousehold",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
        }
        // GET: api/forms/ChangingHousehold/5
        /// <summary>
        ///Lấy ra thông tin chi tiết của form chuyển hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
        /// </summary>
        /// <param name="id">
        /// mã định danh của form thay đ
        /// </param>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetChangingHouseholdForm([FromRoute] int id)
        {
            var form = await _context.ChangingHouseholdForm.Include(f => f.Resident).Include(f => f.NewHousehold)
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
                if (user.UserName != form.Account) { return NotFound(); }
            }
            else if (user.Role == 3)
            {
                if (user.Scope != form.AccountScope)
                {
                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể chỉnh sửa form của tổ " + form.AccountScope + "."));
                }
            }
            ChangingHouseholdFormDetail changinghouseholdformdetail = new ChangingHouseholdFormDetail()
            {
                Id = form.Id,
                NewHousehold = new HouseholdBriefInfo()
                {
                    HouseholdId = form.NewHousehold.HouseholdId,
                    Scope = form.NewHousehold.Scope,
                    OwnerFullName = null,  /////// Không biết điền ntn ...
                    OwnerIDCode = null,
                    CreatedTime = form.NewHousehold.CreatedTime
                },
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
                CreatedTime = form.CreatedTime,
                IsAccepted = form.IsAccepted,
                NotAcceptedReason = form.NotAcceptedReason,
                Account = form.Account,
            };
            return Ok(changinghouseholdformdetail);
        }

        // POST: api/forms/ChangingHousehold
        /// <summary>
        /// Gửi form chuyển hộ khẩu
        /// </summary>
        [HttpPost()]
        [Authorize()]
        public async Task<IActionResult> PostChangingHouseholdForm([FromForm] AddingChangingHouseholdFormRequestModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }

            var household = await _context.Household.FindAsync(model.HouseholdIdCode);
            if (household == null)
            {
                return BadRequest(new RequestError("ResidentNotFound", "Hộ khẩu không tồn tại trong CSDL."));
            }

            var resident = await _context.Resident.FindAsync(model.ResidentIdCode);
            if (resident == null)
            {
                return BadRequest(new RequestError("OwnerNotFound", "Nhân khẩu không tồn tại trong CSDL."));
            }
            if (resident.HouseholdId == household.HouseholdId)
            {
                return BadRequest(new RequestError("InvalidHousehold", "Hộ khẩu mới phải khác hộ khẩu cũ"));
            }


            ChangingHouseholdForm f = new ChangingHouseholdForm()
            {
                Resident = resident,
                NewHousehold = household,
                CreatedTime = DateTime.Now,
                IsAccepted = false,
                NotAcceptedReason = null,
                Account = user.UserName,
                AccountScope = user.Scope,
            };


            _context.ChangingHouseholdForm.Add(f);
            await _context.SaveChangesAsync();

            return Ok(new FormBriefInfo()
            {
                Id = f.Id,
                FormType = "ChangingHousehold",
                Title = FormHelper.GetFormTitle(f),
                CreatedTime = f.CreatedTime,
                IsAccepted = f.IsAccepted,
                NotAcceptedReason = f.NotAcceptedReason,
                Account = f.Account,
            });
        }


        // POST: api/forms/ChangingHousehold/accept/5
        /// <summary>
        ///Phê duyệt hoặc từ chối form chuyển hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Duyệt được form của toàn bộ phường<br/>
        ///2. Tổ trưởng: Chỉ duyệt được form của chỉ tổ phụ trách
        /// </summary>
        /// <param name="id">
        /// mã định danh của form chuyển hộ khẩu
        /// </param>
        [HttpPost("accept/{id}")]
        [Authorize(Roles = "CommitteeChairman,Accountant,ScopeLeader")]
        public async Task<IActionResult> CheckChangingHouseholdForm([FromRoute] int id, [FromBody] AcceptingFormRequestModel model)
        {
            var form = await _context.ChangingHouseholdForm.Include(f => f.Resident).Include(f => f.NewHousehold).FirstOrDefaultAsync(f => id == f.Id);
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
                if (user.Scope != form.AccountScope)
                {
                    return BadRequest(new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + user.Scope + " không thể xét duyệt form của tổ " + form.AccountScope + "."));
                }
            }

            string msg;
            form.IsAccepted = model.Accept;
            if (model.Accept)
            {
                msg = $"{FormHelper.GetFormTitle(form)} đã được phê duyệt.";
            }
            else
            {
                if (string.IsNullOrEmpty(model.NotAcceptReason))
                    return BadRequest(new RequestError("InvalidNotAcceptedReason", "`NotAcceptedReason` bắt buộc phải có nếu như từ chối."));
                form.NotAcceptedReason = model.NotAcceptReason;
                msg = $"{FormHelper.GetFormTitle(form)} đã bị từ chối do {model.NotAcceptReason}.";
            }

            _context.ChangingHouseholdForm.Update(form);
            await _context.SaveChangesAsync();

            await _notification.Notify(user.UserName, new[] { form.Account }, null, msg);

            return Ok();
        }

        // DELETE: api/forms/ChangingHousehold/5
        /// <summary>
        ///Rút lại form chuyển hộ khẩu (có thể do thấy sai hay gì đó). 
        ///Hành động này chỉ thực hiện được khi form chưa được duyệt.
        /// </summary>
        /// <param name="id">
        /// mã định danh của form chuyển hộ khẩu
        /// </param>
        [HttpDelete("{id}")]
        [Authorize()]
        public async Task<IActionResult> DeleteChangingHouseholdForm([FromRoute] int id)
        {
            var userName = User.FindFirst(ClaimTypes.Name).Value;
            var form = await _context.ChangingHouseholdForm.FirstOrDefaultAsync(f => id == f.Id && f.Account == userName);
            if (form == null)
            {
                return NotFound();
            }

            if (form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
            {
                return BadRequest(new RequestError("CheckedForm", "Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại."));
            }

            _context.ChangingHouseholdForm.Remove(form);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
