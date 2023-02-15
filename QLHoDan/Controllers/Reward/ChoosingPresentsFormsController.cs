using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QLHoDan.Data;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.Reward.ChoosingPresentsForm;
using QLHoDan.Models.Reward.RewardCeremonies;
using QLHoDan.Models.Reward;
using QLHoDan.Models;
using QLHoDan.Services;
using QLHoDan.Utilities;
using System.Data;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.Reward
{
    [Route("api/forms/ChoosingPresents")]
    [ApiController]
    public class ChoosingPresentsFormsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly NotificationService _notification;

        private readonly StorageService _storage;

        public ChoosingPresentsFormsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    NotificationService notification,
                                    StorageService storage)
        {
            _context = context;
            _userManager = userManager;
            _storage = storage;
            _notification = notification;
        }
        // GET: api/forms/ChoosingPresents
        /// <summary>
        ///Lấy ra danh sách form chọn quà cho dịp đặc biệt. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
        /// </summary>
        /// <param name="rewardCeremonyId">
        /// Để lấy danh sách form chọn quà cho dịp đặc biệt của đợt thưởng có Id bằng `rewardCeremonyId`. 
        /// Để `null` nếu muốn lấy ra toàn bộ đợt thưởng
        /// </param>
        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetChoosingPresentsForms([FromQuery] int? rewardCeremonyId = null)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            if (user.Role > 3)
            {
                return Ok(_context.ChoosingPresentsForm.Include(f => f.Resident).Include(f => f.RewardCeremony)
                                .Where(f => (!rewardCeremonyId.HasValue || rewardCeremonyId.Value == f.Id) && f.Account == user.UserName)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChoosingPresents",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = true,
                                    NotAcceptedReason = null,
                                    Account = f.Account,
                                }));
            }
            else if (user.Role == 3)
            {
                return Ok(_context.ChoosingPresentsForm.Include(f => f.Resident).Include(f => f.RewardCeremony)
                                .Where(f => (!rewardCeremonyId.HasValue || rewardCeremonyId.Value == f.Id) && f.AccountScope == user.Scope)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChoosingPresents",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = true,
                                    NotAcceptedReason = null,
                                    Account = f.Account,
                                }));
            }
            else return Ok(_context.ChoosingPresentsForm.Include(f => f.Resident).Include(f => f.RewardCeremony)
                                .Where(f => !rewardCeremonyId.HasValue || rewardCeremonyId.Value == f.Id)
                                .Select(f => new FormBriefInfo()
                                {
                                    Id = f.Id,
                                    FormType = "ChoosingPresents",
                                    Title = FormHelper.GetFormTitle(f),
                                    CreatedTime = f.CreatedTime,
                                    IsAccepted = true,
                                    NotAcceptedReason = null,
                                    Account = f.Account,
                                }));
        }
        // GET: api/forms/ChoosingPresents/5
        /// <summary>
        ///Lấy ra thông tin chi tiết của form chọn quà cho dịp đặc biệt. Phạm vi trả về phụ thuộc vào quyền hạn của tài khoản:<br/>
        ///1. Chủ tịch phường, kế toán: Sẽ trả về form của toàn bộ phường<br/>
        ///2. Tổ trưởng: Sẽ trả về form của chỉ tổ phụ trách<br/>
        ///3. Hộ dân: Sẽ trả về form của chỉ cá nhân tài khoản đó gửi lên
        /// </summary>
        /// <param name="id">
        /// mã định danh của form chọn quà cho dịp đặc biệt
        /// </param>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetChoosingPresentsForm([FromRoute] int id)
        {
            var form = await _context.ChoosingPresentsForm.Include(f => f.Resident).Include(f => f.RewardCeremony)
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

            var presentsName = (await _context.AchievementRewardPair
                                .FirstOrDefaultAsync(a => a.RewardCeremonyId == form.RewardCeremonyId && a.AchievementType == form.PresentsType))?.AchievementName;

            ChoosingPresentsFormDetail ChoosingPresentsformdetail = new ChoosingPresentsFormDetail()
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
                RewardCeremony = new RewardCeremonyBriefInfo()
                {
                    Id = form.RewardCeremony.Id,
                    Title = form.RewardCeremony.Title,
                    Time = form.RewardCeremony.Time,
                    Type = form.RewardCeremony.Type,
                    TotalValue = form.RewardCeremony.TotalValue,
                    IsAccepted = form.RewardCeremony.IsAccepted,
                    IsDone = form.RewardCeremony.IsDone,
                    ClosingFormDate = form.RewardCeremony.ClosingFormDate,
                    RewardDate = form.RewardCeremony.RewardDate,
                },
                CreatedTime = form.CreatedTime,
                Account = form.Account,
                PresentsType = form.PresentsType,
                PresentsName = presentsName ?? 
                               $"Không tồn tại món quà nào có `PresentsType` = {form.PresentsType}.",
            };
            return Ok(ChoosingPresentsformdetail);
        }

        // POST: api/forms/ChoosingPresents
        /// <summary>
        /// Gửi form chọn quà cho dịp đặc biệt.
        /// </summary>
        [HttpPost()]
        [Authorize()]
        public async Task<IActionResult> PostChoosingPresentsForm([FromForm] AddingChoosingPresentsFormRequestModel model)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            var ceremony = await _context.RewardCeremony.FindAsync(model.RewardCeremonyId);
            if (ceremony == null)
            {
                return BadRequest(new RequestError("RewardCeremonyNotFound", "Đợt thưởng không tồn tại trong CSDL."));
            }

            if (ceremony.Type == "TTHT")
            {
                return BadRequest(new RequestError("InvalidRewardCeremony", "Đợt thưởng thành tích học tập không nhận form chọn quà dịp đặc biệt."));
            }

            if (!ceremony.IsAccepted)
            {
                return BadRequest(new RequestError("RewardCeremonyNotBeAccepted", "Đợt thưởng chưa được duyệt nên không nhận form."));
            }

            if (ceremony.ClosingFormDate <= DateTime.Now.Date)
            {
                return BadRequest(new RequestError("OverDue", "Thời gian nhận form của đợt thưởng đã hết."));
            }

            var resident = await _context.Resident.FindAsync(model.ResidentIdCode);
            if (resident == null)
            {
                return BadRequest(new RequestError("ResidentNotFound", "Nhân khẩu không tồn tại trong CSDL."));
            }

            ChoosingPresentsForm f = new ChoosingPresentsForm()
            {
                Resident = resident,
                RewardCeremony = ceremony,
                PresentsType = model.PresentsType,
                CreatedTime = DateTime.Now,
                Account = user.UserName,
                AccountScope = user.Scope,
            };

            _context.ChoosingPresentsForm.Add(f);
            await _context.SaveChangesAsync();

            return Ok(new FormBriefInfo()
            {
                Id = f.Id,
                FormType = "ChoosingPresents",
                Title = FormHelper.GetFormTitle(f),
                CreatedTime = f.CreatedTime,
                IsAccepted = true,
                NotAcceptedReason = null,
                Account = f.Account,
            });
        }

        // DELETE: api/forms/ChoosingPresents/5
        /// <summary>
        ///Rút lại form chọn quà cho dịp đặc biệt (có thể do thấy sai hay gì đó). 
        ///Hành động này chỉ thực hiện được khi form chưa được duyệt.
        /// </summary>
        /// <param name="id">
        /// mã định danh của form chọn quà cho dịp đặc biệt
        /// </param>
        [HttpDelete("{id}")]
        [Authorize()]
        public async Task<IActionResult> DeleteChoosingPresentsForm([FromRoute] int id)
        {
            var userName = User.FindFirst(ClaimTypes.Name).Value;
            var form = await _context.ChoosingPresentsForm.FirstOrDefaultAsync(f => id == f.Id && f.Account == userName);
            if (form == null)
            {
                return NotFound();
            }

            _context.ChoosingPresentsForm.Remove(form);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
