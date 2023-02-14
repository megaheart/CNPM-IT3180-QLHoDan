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
using QLHoDan.Models.HouseholdForms.ChangingHouseholdInfoForm;
using QLHoDan.Services;
using QLHoDan.Utilities;
using System.Security.Claims;

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/forms/ChangingHouseholdInfo")]
    [ApiController]
    public class ChangingHouseholdInfoFormsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly NotificationService _notification;

        private readonly StorageService _storage;

        public ChangingHouseholdInfoFormsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    NotificationService notification,
                                    StorageService storage)
        {
            _context = context;
            _userManager = userManager;
            _storage = storage;
            _notification = notification;
        }
        // GET: api/forms/ChangingHouseholdInfo
        /// <summary>
        ///Lấy ra danh sách form thay đổi thông tin hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetChangingHouseholdInfoForms([FromQuery] bool? isChecked = null)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            if (user.Role > 3)
            {
                return Ok(_context.ChangingHouseholdInfoForm.Include(f => f.Household).Include(f => f.Owner)
                                .Where(f => f.Account == user.UserName)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChangingHouseholdInfo",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else if (user.Role == 3)
            {
                return Ok(_context.ChangingHouseholdInfoForm.Include(f => f.Household).Include(f => f.Owner)
                                .Where(f => f.AccountScope == user.Scope)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChangingHouseholdInfo",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else return Ok(_context.ChangingHouseholdInfoForm.Include(f => f.Household).Include(f => f.Owner)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChangingHouseholdInfo",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
        }
        // GET: api/forms/ChangingHouseholdInfo/5
        /// <summary>
        ///Lấy ra thông tin chi tiết của form thay đổi thông tin hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
        /// </summary>
        /// <param name="id">
        /// mã định danh của form thay đ
        /// </param>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetChangingHouseholdInfoForm([FromRoute] int id)
        {
            var form = await _context.ChangingHouseholdInfoForm.Include(f => f.Household).Include(f => f.Owner)
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
            ChangingHouseholdInfoFormDetail changinghouseholdinfoformdetail = new ChangingHouseholdInfoFormDetail()
            {
                Id = form.Id,
                Household = new HouseholdBriefInfo()
                {
                    HouseholdId = form.Household.HouseholdId,
                    Scope = form.Household.Scope,
                    OwnerFullName = form.Owner.FullName,
                    OwnerIDCode = form.Owner.IdentityCode,
                    CreatedTime = form.Household.CreatedTime
                },
                Owner = new ResidentBriefInfo()
                {
                    IdentityCode = form.Owner.IdentityCode,
                    FullName = form.Owner.FullName,
                    DateOfBirth = form.Owner.DateOfBirth,
                    IsMale = form.Owner.IsMale,
                    HouseholdId = form.Owner.HouseholdId,
                    RelationShip = form.Owner.RelationShip,
                    Scope = form.Owner.Scope,
                },
                Address = form.Address,
                Scope = form.Scope,
                Reason = form.Reason,
                CreatedTime = form.CreatedTime,
                IsAccepted = form.IsAccepted,
                NotAcceptedReason = form.NotAcceptedReason,
                Account = form.Account,
            };
            return Ok(changinghouseholdinfoformdetail);
        }

        // POST: api/forms/ChangingHouseholdInfo
        /// <summary>
        /// Gửi form thay đổi thông tin hộ khẩu
        /// </summary>
        [HttpPost()]
        [Authorize()]
        public async Task<IActionResult> PostChangingHouseholdInfoForm([FromForm] AddingChangingHouseholdInfoFormRequestModel model)
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

            var owner = await _context.Resident.FindAsync(model.OwnerIdCode);
            if (owner == null)
            {
                return BadRequest(new RequestError("OwnerNotFound", "Chủ hộ không tồn tại trong CSDL."));
            }
            if (!household.Members.Contains(owner))
            {
                return BadRequest(new RequestError("InvalidOwner", "Chủ hộ không nằm trong sổ hộ khẩu."));
            }


            ChangingHouseholdInfoForm f = new ChangingHouseholdInfoForm()
            {
                Owner= owner,
                Household = household,
                Address = model.Address,
                Scope = model.Scope,
                Reason = model.Reason,
                CreatedTime = DateTime.Now,
                IsAccepted = false,
                NotAcceptedReason = null,
                Account = user.UserName,
                AccountScope = user.Scope,
            };


            _context.ChangingHouseholdInfoForm.Add(f);
            await _context.SaveChangesAsync();

            return Ok(new FormBriefInfo()
            {
                Id = f.Id,
                FormType = "ChangingHouseholdInfo",
                Title = FormHelper.GetFormTitle(f),
                CreatedTime = f.CreatedTime,
                IsAccepted = f.IsAccepted,
                NotAcceptedReason = f.NotAcceptedReason,
                Account = f.Account,
            });
        }


        // POST: api/forms/ChangingHouseholdInfo/accept/5
        /// <summary>
        ///Phê duyệt hoặc từ chối form thay đổi thông tin hộ khẩu. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách
        /// </summary>
        /// <param name="id">
        /// mã định danh của form minh chứng thành tích
        /// </param>
        [HttpPost("accept/{id}")]
        [Authorize(Roles = "CommitteeChairman,Accountant,ScopeLeader")]
        public async Task<IActionResult> CheckChangingHouseholdInfoForm([FromRoute] int id, [FromBody] AcceptingFormRequestModel model)
        {
            var form = await _context.ChangingHouseholdInfoForm.Include(f => f.Household).Include(f => f.Owner).FirstOrDefaultAsync(f => id == f.Id);
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

            _context.ChangingHouseholdInfoForm.Update(form);
            await _context.SaveChangesAsync();

            await _notification.Notify(user.UserName, new[] { form.Account }, null, msg);

            return Ok();
        }

        // DELETE: api/forms/ChangingHouseholdInfo/5
        /// <summary>
        ///Rút lại form thay đổi thông tin hộ khẩu (có thể do thấy sai hay gì đó). 
        ///Hành động này chỉ thực hiện được khi form chưa được duyệt.
        /// </summary>
        /// <param name="id">
        /// mã định danh của form thay đổi thông tin hộ khẩu
        /// </param>
        [HttpDelete("{id}")]
        [Authorize()]
        public async Task<IActionResult> DeleteChangingHouseholdInfoForm([FromRoute] int id)
        {
            var userName = User.FindFirst(ClaimTypes.Name).Value;
            var form = await _context.ChangingHouseholdInfoForm.FirstOrDefaultAsync(f => id == f.Id && f.Account == userName);
            if (form == null)
            {
                return NotFound();
            }

            if (form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
            {
                return BadRequest(new RequestError("CheckedForm", "Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại."));
            }

            _context.ChangingHouseholdInfoForm.Remove(form);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
