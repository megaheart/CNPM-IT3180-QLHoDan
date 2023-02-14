using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using QLHoDan.Models.Reward.RewardCeremonies;
using QLHoDan.Models.Reward.RewardRecord;
using QLHoDan.Services;

namespace QLHoDan.Controllers.Reward
{
    [Route("api/RewardRecords")]
    [ApiController]
    public class RewardRecordsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        private readonly NotificationService _notification;

        private readonly StorageService _storage;

        public RewardRecordsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    NotificationService notification,
                                    StorageService storage)
        {
            _context = context;
            _userManager = userManager;
            _storage = storage;
            _notification = notification;
        }
        // GET: api/RewardRecords/preview
        /// <summary>
        /// Lấy danh sách phát thưởng dự kiến của một đợt trao thưởng, chỉ thư kí, chủ tịch phường mới dùng được.
        /// Danh sách phát thưởng dự kiến phải dựa trên form minh chứng đã được phê duyệt (với đợt trao thưởng thành tích) 
        /// hoặc form chọn phần quà (với đợt trao thưởng dịp đặc biệt).
        /// </summary>
        /// <param name="rewardCeremonyId">
        /// mã của đợt trao thưởng
        /// </param>
        /// <param name="ageFrom">
        /// (chỉ dùng với đợt trao thưởng dịp đặc biệt) từ mấy tuổi (mặc định là 0)
        /// </param>
        /// <param name="ageTo">
        /// (chỉ dùng với đợt trao thưởng dịp đặc biệt) đến mấy tuổi (mặc định là 18)
        /// </param>
        [HttpGet("preview")]
        [Authorize(Roles = "CommitteeChairman,Accountant")]
        public async Task<IActionResult> GetPreviewRecords([FromQuery] int rewardCeremonyId = 0, [FromQuery] int ageFrom = 0, [FromQuery] int ageTo = 18)
        {
            var ceremony = await _context.RewardCeremony.Include(r => r.AchievementRewardPairs).FirstOrDefaultAsync(r => r.Id == rewardCeremonyId);
            if (ceremony == null)
            {
                return BadRequest(new RequestError("RewardCeremonyNotFound", "Đợt thưởng không tồn tại trong CSDL."));
            }
            if (ceremony.AchievementRewardPairs.Count == 0)
            {
                return BadRequest(new RequestError("RewardCeremonyNotHaveAchievementRewardPairs", "Đợt thưởng không có Bảng chuyển đổi loại thành tích thành giá trị phần thưởng."));
            }
            if (ceremony.Type == "TT")
            {
                DateTime childLimit = new DateTime(DateTime.Now.Year - ageTo, 1, 1);
                DateTime childLimit2 = new DateTime(DateTime.Now.Year - ageFrom + 1, 1, 1);
                var query = from child in _context.Resident.Where(r => r.DateOfBirth >= childLimit && r.DateOfBirth < childLimit2)
                            from form in _context.ChoosingPresentsForm
                                            .Where(f => f.RewardCeremonyId == rewardCeremonyId && f.ResidentIdentityCode == child.IdentityCode).DefaultIfEmpty()
                            
                            select new { child, form};
                var list = (await query.ToListAsync()).Select(x => {
                    var child = x.child;
                    var form = x.form;
                    var achievementType = form?.PresentsType ?? 1;
                    return new RewardRecordInfo()
                    {
                        RewardCeremony = new RewardCeremonyBriefInfo()
                        {
                            Id = ceremony.Id,
                            Title = ceremony.Title,
                            Time = ceremony.Time,
                            Type = ceremony.Type,
                            TotalValue = ceremony.TotalValue,
                            IsAccepted = ceremony.IsAccepted,
                            IsDone = ceremony.IsDone,
                            ClosingFormDate = ceremony.ClosingFormDate,
                            RewardDate = ceremony.RewardDate,
                        },
                        Resident = new ResidentBriefInfo()
                        {
                            IdentityCode = child.IdentityCode,
                            FullName = child.FullName,
                            DateOfBirth = child.DateOfBirth,
                            IsMale = child.IsMale,
                            HouseholdId = child.HouseholdId,
                            RelationShip = child.RelationShip,
                            Scope = child.Scope,
                        },
                        AchievementType = achievementType,
                        AchievementName = null,
                        RewardName = ceremony.AchievementRewardPairs[achievementType - 1].RewardName,
                        RewardValue = ceremony.AchievementRewardPairs[achievementType - 1].RewardValue,
                    };
                });

                return Ok(list);
            }
            else
            {
                var query = _context.AchievementEvidenceForm.Include(f => f.Resident)
                                .Where(f => f.RewardCeremonyId == rewardCeremonyId && f.IsAccepted)
                                .Select(form => new RewardRecordInfo()
                                {
                                    RewardCeremony = new RewardCeremonyBriefInfo()
                                    {
                                        Id = ceremony.Id,
                                        Title = ceremony.Title,
                                        Time = ceremony.Time,
                                        Type = ceremony.Type,
                                        TotalValue = ceremony.TotalValue,
                                        IsAccepted = ceremony.IsAccepted,
                                        IsDone = ceremony.IsDone,
                                        ClosingFormDate = ceremony.ClosingFormDate,
                                        RewardDate = ceremony.RewardDate,
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
                                    AchievementType = form.AchievementType.Value,
                                    AchievementName = form.AchievementName,
                                    RewardName = ceremony.AchievementRewardPairs[form.AchievementType.Value - 1].RewardName,
                                    RewardValue = ceremony.AchievementRewardPairs[form.AchievementType.Value - 1].RewardValue,
                                });
                return Ok(query);
            }
        }

        // POST api/RewardRecords/savePreview
        /// <summary>
        /// Lưu danh sách phát thưởng dự kiến của một đợt trao thưởng vào lịch sử trao thưởng, 
        /// chỉ thư kí, chủ tịch phường mới dùng được.<br/>
        /// Quá trình lưu vào này đại diện cho quá trình phê duyệt chấp nhận danh sách trao thưởng, danh sách này sẽ được 
        /// sử dụng như danh sách chính thức cho việc trao thưởng thực tế. Người dân lúc này có thể kiểm tra được phần quà 
        /// mà con em mình nhận được.<br/>
        /// Danh sách phát thưởng dự kiến phải dựa trên form minh chứng đã được phê duyệt (với đợt trao thưởng thành tích) 
        /// hoặc form chọn phần quà (với đợt trao thưởng dịp đặc biệt).
        /// </summary>
        /// <param name="rewardCeremonyId">
        /// mã của đợt trao thưởng
        /// </param>
        /// <param name="ageFrom">
        /// (chỉ dùng với đợt trao thưởng dịp đặc biệt) từ mấy tuổi (mặc định là 0)
        /// </param>
        /// <param name="ageTo">
        /// (chỉ dùng với đợt trao thưởng dịp đặc biệt) đến mấy tuổi (mặc định là 18)
        /// </param>
        [HttpPost("savePreview")]
        [Authorize(Roles = "CommitteeChairman,Accountant")]
        public async Task<IActionResult> SavePreviewRecords([FromQuery] int rewardCeremonyId = 0, [FromQuery] int ageFrom = 0, [FromQuery] int ageTo = 18)
        {
            var ceremony = await _context.RewardCeremony.Include(r => r.AchievementRewardPairs).FirstOrDefaultAsync(r => r.Id == rewardCeremonyId);
            if (ceremony == null)
            {
                return BadRequest(new RequestError("RewardCeremonyNotFound", "Đợt thưởng không tồn tại trong CSDL."));
            }
            if (ceremony.AchievementRewardPairs.Count == 0)
            {
                return BadRequest(new RequestError("RewardCeremonyNotHaveAchievementRewardPairs", "Đợt thưởng không có Bảng chuyển đổi loại thành tích thành giá trị phần thưởng."));
            }

            await _context.RewardRecord.Where(r => r.RewardCeremonyId == rewardCeremonyId).ExecuteDeleteAsync();

            if (ceremony.Type == "TT")
            {
                DateTime childLimit = new DateTime(DateTime.Now.Year - ageTo, 1, 1);
                DateTime childLimit2 = new DateTime(DateTime.Now.Year - ageFrom + 1, 1, 1);
                var query = from child in _context.Resident.Where(r => r.DateOfBirth >= childLimit && r.DateOfBirth < childLimit2)
                            from form in _context.ChoosingPresentsForm
                                            .Where(f => f.RewardCeremonyId == rewardCeremonyId && f.ResidentIdentityCode == child.IdentityCode).DefaultIfEmpty()

                            select new { child, form };
                await foreach(var x in query.AsAsyncEnumerable()) {
                    var child = x.child;
                    var form = x.form;
                    var achievementType = form?.PresentsType ?? 1;
                    var r = new RewardRecord()
                    {
                        RewardCeremonyId = rewardCeremonyId,
                        ResidentIdentityCode = child.IdentityCode,
                        AchievementType = achievementType,
                        AchievementName = null,
                        RewardName = ceremony.AchievementRewardPairs[achievementType - 1].RewardName,
                        RewardValue = ceremony.AchievementRewardPairs[achievementType - 1].RewardValue,
                    };
                    _context.RewardRecord.Add(r);
                }
            }
            else
            {
                var query = _context.AchievementEvidenceForm.Include(f => f.Resident)
                                .Where(f => f.RewardCeremonyId == rewardCeremonyId && f.IsAccepted);
                await foreach (var form in query.AsAsyncEnumerable())
                {
                    var achievementType = form.AchievementType ?? throw new Exception("Duyệt form rồi mà form chưa có `AchievementType`");
                    var r = new RewardRecord()
                    {
                        RewardCeremonyId = rewardCeremonyId,
                        ResidentIdentityCode = form.ResidentIdentityCode,
                        AchievementType = achievementType,
                        AchievementName = form.AchievementName,
                        RewardName = ceremony.AchievementRewardPairs[form.AchievementType.Value - 1].RewardName,
                        RewardValue = ceremony.AchievementRewardPairs[form.AchievementType.Value - 1].RewardValue,
                    };
                    _context.RewardRecord.Add(r);
                }
            }

            
            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET api/RewardRecords
        /// <summary>
        /// Lấy lịch sử trao thưởng.
        /// </summary>
        /// <param name="rewardCeremonyId">
        ///  mã của đợt trao thưởng , nếu bỏ qua thì trả về toàn bộ
        /// </param>
        /// <param name="residentId">
        /// số định danh điện tử của cháu được phát quà, nếu bỏ qua thì trả về toàn bộ
        /// </param>
        [HttpGet()]
        [Authorize]
        public IActionResult GetRewardRecords([FromQuery] int? rewardCeremonyId = null, [FromQuery] string? residentId = null)
        {

            return Ok(_context.RewardRecord.Include(r => r.RewardCeremony).Include(r => r.Resident)
                        .Where(r => rewardCeremonyId == null || r.RewardCeremonyId == rewardCeremonyId)
                        .Where(r => residentId == null || r.ResidentIdentityCode == residentId)
                        .Select(r => new RewardRecordInfo()
                        {
                            Id = r.Id,
                            RewardCeremony = new RewardCeremonyBriefInfo()
                            {
                                Id = r.RewardCeremony.Id,
                                Title = r.RewardCeremony.Title,
                                Time = r.RewardCeremony.Time,
                                Type = r.RewardCeremony.Type,
                                TotalValue = r.RewardCeremony.TotalValue,
                                IsAccepted = r.RewardCeremony.IsAccepted,
                                IsDone = r.RewardCeremony.IsDone,
                                ClosingFormDate = r.RewardCeremony.ClosingFormDate,
                                RewardDate = r.RewardCeremony.RewardDate,
                            },
                            Resident = new ResidentBriefInfo()
                            {
                                IdentityCode = r.Resident.IdentityCode,
                                FullName = r.Resident.FullName,
                                DateOfBirth = r.Resident.DateOfBirth,
                                IsMale = r.Resident.IsMale,
                                HouseholdId = r.Resident.HouseholdId,
                                RelationShip = r.Resident.RelationShip,
                                Scope = r.Resident.Scope,
                            },
                            AchievementType = r.AchievementType,
                            AchievementName = r.RewardName,
                            RewardName = r.RewardName,
                            RewardValue = r.RewardValue,
                        }));
        }
    }
}
