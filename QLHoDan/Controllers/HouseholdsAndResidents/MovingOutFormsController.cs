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
using QLHoDan.Models.HouseholdForms.MovingOutForm;
using QLHoDan.Services;
using QLHoDan.Utilities;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/forms/MovingOut")]
    [ApiController]
    public class MovingOutFormsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly NotificationService _notification;

        private readonly StorageService _storage;

        public MovingOutFormsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    NotificationService notification,
                                    StorageService storage)
        {
            _context = context;
            _userManager = userManager;
            _storage = storage;
            _notification = notification;
        }
        // GET: api/forms/MovingOut
        /// <summary>
        ///Lấy ra danh sách form xin chuyển đi. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên
        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetMovingOutForms([FromQuery] bool? isChecked = null)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            if (user.Role > 3)
            {
                return Ok(_context.MovingOutForm.Include(f => f.Resident)
                                .Where(f => (f.Account == user.UserName))
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "MovingOut",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else if (user.Role == 3)
            {
                return Ok(_context.MovingOutForm.Include(f => f.Resident)
                                .Where(f => (f.AccountScope == user.Scope))
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "MovingOut",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
            }
            else return Ok(_context.MovingOutForm.Include(f => f.Resident)
                                .Where(f => isChecked == null || (f.IsAccepted == true || !string.IsNullOrEmpty(f.NotAcceptedReason)) == isChecked)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "MovingOut",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = f.IsAccepted,
                                    NotAcceptedReason = f.NotAcceptedReason,
                                    Account = f.Account,
                                }));
        }
        // GET: api/forms/MovingOut/5
        /// <summary>
        ///Lấy ra thông tin chi tiết của form xin chuyển đi. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form minh chứng của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form minh chứng của chỉ cá nhân tài khoản đó gửi lên
        /// </summary>
        /// <param name="id">
        /// mã định danh của form xin chuyển đi
        /// </param>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetMovingOutForm([FromRoute] int id)
        {
            var form = await _context.MovingOutForm.Include(f => f.Resident)
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
            MovingOutFormDetail movingoutformdetail = new MovingOutFormDetail()
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
                MoveOutPlace = form.MoveOutPlace,
                MoveOutDate = form.MoveOutDate,
                MoveOutReason = form.MoveOutReason,
                CreatedTime = form.CreatedTime,
                IsAccepted = form.IsAccepted,
                NotAcceptedReason = form.NotAcceptedReason,
                Account = form.Account,
            };
            return Ok(movingoutformdetail);
        }

        // POST: api/forms/MovingOut
        /// <summary>
        /// Gửi form xin chuyển đi
        /// </summary>
        [HttpPost()]
        [Authorize()]
        public async Task<IActionResult> PostMovingOutForm([FromForm] AddingMovingOutFormRequestModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }

            var resident = await _context.Resident.FindAsync(model.ResidentIdCode);
            if (resident == null)
            {
                return BadRequest(new RequestError("ResidentNotFound", "Nhân khẩu không tồn tại trong CSDL."));
            }
            if (resident.MoveOutDate.HasValue)
            {
                return BadRequest(new RequestError("ResidentMovedOut", "Nhân khẩu đã chuyển đi rồi không chuyển đi nữa."));
            }
            MovingOutForm f = new MovingOutForm()
            {
                Resident = resident,
                MoveOutPlace = model.MoveOutPlace,
                MoveOutDate = model.MoveOutDate,
                MoveOutReason = model.MoveOutReason,
                CreatedTime = DateTime.Now,
                IsAccepted = false,
                NotAcceptedReason = null,
                Account = user.UserName,
                AccountScope = user.Scope,
            };

            _context.MovingOutForm.Add(f);
            await _context.SaveChangesAsync();

            return Ok(new FormBriefInfo()
            {
                Id = f.Id,
                FormType = "MovingOut",
                Title = FormHelper.GetFormTitle(f),
                CreatedTime = f.CreatedTime,
                IsAccepted = f.IsAccepted,
                NotAcceptedReason = f.NotAcceptedReason,
                Account = f.Account,
            });
        }


        // POST: api/forms/MovingOut/accept/5
        /// <summary>
        ///Phê duyệt hoặc từ chối form xin chuyển đi. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Duyệt được form minh chứng của toàn bộ phường<br/>
        ///2. Tổ trưởng: Chỉ duyệt được form minh chứng của chỉ tổ phụ trách
        /// </summary>
        /// <param name="id">
        /// mã định danh của form xin chuyển đi
        /// </param>
        [HttpPost("accept/{id}")]
        [Authorize(Roles = "CommitteeChairman,Accountant,ScopeLeader")]
        public async Task<IActionResult> CheckMovingOutForm([FromRoute] int id, [FromBody] AcceptingFormRequestModel model)
        {
            var form = await _context.MovingOutForm.Include(f => f.Resident).FirstOrDefaultAsync(f => id == f.Id);
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
                var resident = form.Resident;
                resident.MoveOutPlace = form.MoveOutPlace;
                resident.MoveOutDate = form.MoveOutDate;
                resident.MoveOutReason = form.MoveOutReason;
                _context.Resident.Update(resident);
            }
            else
            {
                if (string.IsNullOrEmpty(model.NotAcceptReason))
                    return BadRequest(new RequestError("InvalidNotAcceptedReason", "`NotAcceptedReason` bắt buộc phải có nếu như từ chối."));
                form.NotAcceptedReason = model.NotAcceptReason;
                msg = $"{FormHelper.GetFormTitle(form)} đã bị từ chối do {model.NotAcceptReason}.";
            }

            _context.MovingOutForm.Update(form);
            await _context.SaveChangesAsync();

            await _notification.Notify(user.UserName, new[] { form.Account }, null, msg);

            return Ok();
        }

        // DELETE: api/forms/MovingOut/5
        /// <summary>
        ///Rút lại form xin chuyển đi (có thể do thấy sai hay gì đó). 
        ///Hành động này chỉ thực hiện được khi form chưa được duyệt.
        /// </summary>
        /// <param name="id">
        /// mã định danh của form xin chuyển đi
        /// </param>
        [HttpDelete("{id}")]
        [Authorize()]
        public async Task<IActionResult> DeleteMovingOutForm([FromRoute] int id)
        {
            var userName = User.FindFirst(ClaimTypes.Name).Value;
            var form = await _context.MovingOutForm.FirstOrDefaultAsync(f => id == f.Id && f.Account == userName);
            if (form == null)
            {
                return NotFound();
            }

            if (form.IsAccepted || !string.IsNullOrEmpty(form.NotAcceptedReason))
            {
                return BadRequest(new RequestError("CheckedForm", "Form đã được phê duyệt hoặc bị từ chối nên không thể rút lại."));
            }


            _context.MovingOutForm.Remove(form);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
