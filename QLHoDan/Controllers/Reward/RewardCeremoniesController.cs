using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using QLHoDan.Models.Reward.RewardCeremonies;
using QLHoDan.Services;
using System.Data;
using System.Linq;
using System.Security.Claims;

namespace QLHoDan.Controllers.Reward
{
    [Route("api/RewardCeremonies")]
    [ApiController]
    public class RewardCeremoniesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly NotificationService _notification;

        public RewardCeremoniesController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager,
                                    NotificationService notification)
        {
            _context = context;
            _userManager = userManager;
            _notification = notification;
        }
        // GET: api/RewardCeremonies
        /// <summary>
        /// Lấy ra danh sách dịp trao thưởng (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt 
        /// (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// </summary>
        [HttpGet]
        [Authorize(/*Roles = "CommitteeChairman, Accountant, ScopeLeader"*/)]
        public async Task<ActionResult<IEnumerable<RewardCeremonyBriefInfo>>> 
                GetRewardCeremonies([FromQuery] bool? allowPostingForm = null, [FromQuery] string? type = null)
        {
            if (_context.Household == null)
            {
                return NotFound();
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else."));
            }
            var list = _context.RewardCeremony.Where(r => allowPostingForm == null || (r.IsAccepted == true && r.ClosingFormDate > DateTime.Now.Date) == allowPostingForm);
            list = list.Where(r => type == null || type == r.Type);
            if(user.Role > 3)
            {
                list = list.Where(r => r.IsAccepted == true);
            }
            return Ok(list
                    .Select(r => new RewardCeremonyBriefInfo()
                    {
                        Id = r.Id,
                        Title = r.Title,
                        Time = r.Time,
                        Type = r.Type,
                        TotalValue = r.TotalValue,
                        IsAccepted = r.IsAccepted,
                        IsDone = r.IsDone,
                        ClosingFormDate = r.ClosingFormDate,
                        RewardDate = r.RewardDate,
                    }));
        }

        // GET: api/RewardCeremonies/5
        /// <summary>
        /// Lấy ra thông tin chi tiết của đợt thưởng, chỉ người dùng cấp độ đặc biệt 
        /// (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// </summary>
        /// <param name="id">mã định danh đợt thưởng</param>
        [HttpGet("{id}")]
        [Authorize(/*Roles = "CommitteeChairman, Accountant, ScopeLeader"*/)]
        public async Task<ActionResult<RewardCeremonyDetail>> GetRewardCeremony(int id)
        {
            if (_context.Household == null)
            {
                return NotFound();
            }
            var r = await _context.RewardCeremony.Include(r => r.AchievementRewardPairs).FirstOrDefaultAsync(r => r.Id == id);

            if (r == null)
            {
                return NotFound();
            }

            return Ok(new RewardCeremonyDetail()
            {
                Id = r.Id,
                Title = r.Title,
                Description= r.Description,
                Time = r.Time,
                Type = r.Type,
                TotalValue = r.TotalValue,
                IsAccepted = r.IsAccepted,
                IsDone = r.IsDone,
                ClosingFormDate = r.ClosingFormDate,
                RewardDate = r.RewardDate,
                AchievementRewardPairs = r.AchievementRewardPairs.Select(a => new AchievementReward()
                {
                    AchievementType = a.AchievementType,
                    AchievementName = a.AchievementName,
                    RewardName = a.RewardName,
                    RewardValue = a.RewardValue,
                }),

            });
        }

        // POST: api/RewardCeremonies
        /// <summary>
        /// Thêm đợt thưởng mới, chỉ chủ tịch phường mới dùng được.<br/>
        /// Sau khi thêm đợt thưởng mới, có thể gửi tin nhắn (nếu điền) đến tất cả tài khoản đặc biệt trừ bản thân.
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "CommitteeChairman")]
        public async Task<IActionResult> PostRewardCeremony(AddingRewardCeremonyRequestModel model)
        {
            if(await _context.RewardCeremony.AnyAsync(r => r.Title == model.Title))
            {
                return Conflict();
            }
            if (model.RewardDate < model.ClosingFormDate)
            {
                return BadRequest(new RequestError("InvalidClosingFormDate", "`ClosingFormDate` không được phép lớn hơn `RewardDate`."));
            }
            RewardCeremony rewardceremony = new RewardCeremony()
            {
                Title = model.Title,
                Description = model.Description,
                Time = DateTime.Now,
                Type = model.Type,
                TotalValue = 0,
                IsAccepted = false,
                IsDone = false,
                ClosingFormDate = model.ClosingFormDate.Date,
                RewardDate = model.RewardDate.Date,
            };

            //if(model.ExistMemberIds != null)
            //{
            //    var list = _context.Resident.Where(x => 
            //        model.ExistMemberIds.Contains(x.IdentityCode) && x.Household == null
            //    );
            //    residents.AddRange(list);
            //    if (residents.Count != model.ExistMemberIds.Length)
            //    {
            //        return BadRequest(new RequestError()
            //        {
            //            Code = "Household_Add_InvalidExistMemberIds",
            //            Description = "Một số số CMND/CCCD trong ExistMemberIds không tồn tại trong CSDL hoặc đã thuộc về một hộ khẩu khác."
            //        });
            //    }

            //}


            _context.RewardCeremony.Add(rewardceremony);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await RewardCeremonyExists(rewardceremony.Id)))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if (userName != null && !string.IsNullOrEmpty(model.MessageToSpecialAccount))
                await _notification.Notify(userName, new string[] { "#" }, new string[] { userName }, model.MessageToSpecialAccount);
            var r = rewardceremony;
            return Ok(new RewardCeremonyBriefInfo()
            {
                Id = r.Id,
                Title = r.Title,
                Time = r.Time,
                Type = r.Type,
                TotalValue = r.TotalValue,
                IsAccepted = r.IsAccepted,
                IsDone = r.IsDone,
                ClosingFormDate = r.ClosingFormDate,
                RewardDate = r.RewardDate,
            });
        }

        // POST: api/RewardCeremonies
        /// <summary>
        /// Cập nhật thông tin đợt thưởng, chỉ thư kí, chủ tịch phường mới dùng được.<br/>
        /// Sau khi cập nhật thông tin đợt thưởng, có thể gửi tin nhắn (nếu điền) đến tất cả tài khoản đặc biệt trừ bản thân.
        /// </summary>
        [HttpPut()]
        [Authorize(Roles = "CommitteeChairman, Accountant")]
        public async Task<IActionResult> PutRewardCeremony(UpdateRewardCeremonyRequestModel model)
        {
            if (await _context.RewardCeremony.AnyAsync(r => r.Title == model.Title))
            {
                return Conflict();
            }
            var r = await _context.RewardCeremony.FindAsync(model.Id);
            if (r == null)
            {
                return NotFound();
            }
            if (model.Title != null)
            {
                r.Title = model.Title;
            }
            if (model.Description != null)
            {
                r.Description = model.Description;
            }
            if (model.Type != null)
            {
                r.Type = model.Type;
            }
            if (model.ClosingFormDate != null)
            {
                r.ClosingFormDate = model.ClosingFormDate.Value.Date;
            }
            if (model.RewardDate != null)
            {
                if(model.RewardDate < r.ClosingFormDate)
                {
                    return BadRequest(new RequestError("InvalidClosingFormDate", "`ClosingFormDate` không được phép lớn hơn `RewardDate`."));
                }
                r.RewardDate = model.RewardDate.Value.Date;
            }

            _context.RewardCeremony.Update(r);

            await _context.SaveChangesAsync();
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if (userName != null && !string.IsNullOrEmpty(model.MessageToSpecialAccount))
                await _notification.Notify(userName, new string[] { "#" }, new string[] { userName }, model.MessageToSpecialAccount);
            return Ok();
        }
        // POST: api/RewardCeremonies/setARPairs/{id}
        /// <summary>
        /// Thiết lập Bảng chuyển đổi loại thành tích thành giá trị phần thưởng cho đợt thưởng, 
        /// tạo mới nếu không có, ghi đè bảng cũ nếu có.<br/>
        /// Chỉ thư kí, chủ tịch phường mới dùng được.
        /// </summary>
        [HttpPost("setARPairs/{id}")]
        [Authorize(Roles = "CommitteeChairman, Accountant")]
        public async Task<IActionResult> SetAchievementRewardPairs([FromRoute] int id, [FromBody]List<AchievementReward> modelList)
        {
            if(modelList.Count == 0) return BadRequest(new RequestError()
            {
                Code = "ZeroList",
                Description = "Danh sách không chứa phần tử nào.",
            });
            //modelList.Sort((a, b) => a.AchievementType.CompareTo(b.AchievementType));
            if(modelList[0].AchievementType != 1)
            {
                return BadRequest(new RequestError()
                {
                    Code = "InvalidAchievementRewardList",
                    Description = "Danh sách KHÔNG bắt đầu từ phần tử có AchievementType = 1.",
                });
            }
            for(int i = 1; i < modelList.Count; i++)
            {
                if (modelList[i].AchievementType != i + 1)
                {
                    string description =
                        string.Format("Sau phần tử có AchievementType = {0} KHÔNG phải là phần tử có AchievementType = {1}",
                        modelList[i - 1].AchievementType, modelList[i - 1].AchievementType + 1);
                    return BadRequest(new RequestError()
                    {
                        Code = "InvalidAchievementRewardList",
                        Description =  description,
                    });
                }
            }
            var r = await _context.RewardCeremony.Include(r => r.AchievementRewardPairs).FirstOrDefaultAsync(r => r.Id == id);
            if (r == null)
            {
                return NotFound();
            }
            var list = r.AchievementRewardPairs;
            if(list.Count > modelList.Count)
            {
                int i = 0;
                for (; i < modelList.Count; i++)
                {
                    list[i].AchievementName = modelList[i].AchievementName;
                    list[i].RewardName = modelList[i].RewardName;
                    list[i].RewardValue = modelList[i].RewardValue;
                    _context.AchievementRewardPair.Update(list[i]);
                }
                for (; i < list.Count; i++)
                {
                    _context.AchievementRewardPair.Update(list[i]);
                }
            }
            else
            {
                int i = 0;
                for (; i < list.Count; i++)
                {
                    list[i].AchievementName = modelList[i].AchievementName;
                    list[i].RewardName = modelList[i].RewardName;
                    list[i].RewardValue = modelList[i].RewardValue;
                    _context.AchievementRewardPair.Update(list[i]);
                }
                for (; i < modelList.Count; i++)
                {
                    var arp = new AchievementRewardPair()
                    {
                        RewardCeremony = r,
                        AchievementType = i + 1,
                        AchievementName = modelList[i].AchievementName,
                        RewardName = modelList[i].RewardName,
                        RewardValue = modelList[i].RewardValue,
                    };
                    _context.AchievementRewardPair.Add(arp);
                }
            }

            await _context.SaveChangesAsync();

            return Ok();
        }
        // POST: api/RewardCeremonies/accept/5
        /// <summary>
        /// Phê duyệt đợt thưởng, gửi thông báo mở đợt thưởng với toàn bộ người dân (nếu điền)
        /// , và tài khoản đặc biệt (nếu điền).<br/>
        /// Chỉ chủ tịch phường mới dùng được.
        /// </summary>
        [HttpPost("accept/{id}")]
        [Authorize(Roles = "CommitteeChairman")]
        public async Task<IActionResult> AcceptRewardCeremony([FromRoute]int id, [FromBody] AcceptRewardCeremonyRequestModel model)
        {
            var r = await _context.RewardCeremony.FindAsync(id);
            if (r == null)
            {
                return NotFound();
            }
            r.IsAccepted = true;
            await _context.SaveChangesAsync();
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if (userName != null)
            {
                if (!string.IsNullOrEmpty(model.MessageToSpecialAccount))
                    await _notification.Notify(userName, new string[] { "#" }, new string[] { userName }, model.MessageToSpecialAccount); 
                if (!string.IsNullOrEmpty(model.MessageToHousehold))
                    await _notification.Notify(userName, new string[] { "!" }, new string[] { userName }, model.MessageToHousehold);
            }

            return Ok();
        }
        // POST: api/RewardCeremonies/done/5
        /// <summary>
        /// Đánh dấu đợt thưởng đã được thực hiện xong.<br/>
        /// Chỉ chủ tịch phường mới dùng được.
        /// </summary>
        [HttpPost("done/{id}")]
        [Authorize(Roles = "CommitteeChairman")]
        public async Task<IActionResult> DoneRewardCeremony([FromRoute] int id)
        {
            var r = await _context.RewardCeremony.FindAsync(id);
            if (r == null)
            {
                return NotFound();
            }
            if(!r.IsAccepted)
            {
                return BadRequest(new RequestError()
                {
                    Code = "RewardCeremonyNotAccept",
                    Description = "Đợt thưởng chưa được phê duyệt, vậy nên nó chưa thể được hoàn thành"
                });
            }
            r.IsDone = true;
            await _context.SaveChangesAsync();

            return Ok();
        }
        // DELETE: api/RewardCeremonies/5
        /// <summary>
        /// Xoá đợt thưởng, chỉ chủ tịch phường mới dùng được.
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "CommitteeChairman")]
        public async Task<IActionResult> DeleteRewardCeremony(int id)
        {
            var r = await _context.RewardCeremony.FindAsync(id);
            if (r == null)
            {
                return NotFound();
            }
            if (r.IsAccepted)
                return BadRequest(new RequestError("CannotDeleteAcceptedRewardCeremony", "Đợt thưởng đã được phê duyệt và thông báo đến toàn thể người dân nên không thể rút lại."));
            _context.AchievementRewardPair.Where(x => x.RewardCeremonyId == id).ExecuteDelete();
            _context.RewardCeremony.Remove(r);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {

                if (ex.InnerException != null)
                {
                    if (ex.InnerException.GetType() == typeof(Microsoft.Data.Sqlite.SqliteException))
                    {
                        var innerEx = ex.InnerException as Microsoft.Data.Sqlite.SqliteException;
                        if (innerEx.SqliteErrorCode == 19)
                            return BadRequest(new RequestError()
                            {
                                Code = "ForeignKeyConstraintFailed",
                                Description = "Một số hàng trong các bảng khác có khoá ngoài trỏ đến phần tử này. Phần tử này hiện tại không thể bị xoá.",
                            });
                    }
                }
                string code = string.Format("{0} + innerError: {1}", ex.GetType().FullName, ex.InnerException?.GetType().FullName);
                return BadRequest(new RequestError()
                {
                    Code = code,
                    Description = ex.InnerException?.Message ?? ex.Message,
                });
            }

            return Ok();
        }
        private async Task<bool> RewardCeremonyExists(int id)
        {
            return await _context.RewardCeremony.AnyAsync(e => e.Id == id);
        }
    }
}
