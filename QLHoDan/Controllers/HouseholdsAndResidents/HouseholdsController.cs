using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.HouseholdApi;
using System.Data;
using System.Security.Claims;

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/Households")]
    [ApiController]
    [Authorize(Roles = "CommitteeChairman, Accountant, ScopeLeader")]
    public class HouseholdsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public HouseholdsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Households
        /// <summary>
        /// Lấy ra danh sách hộ khẩu (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt 
        /// (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ lấy ra danh sách hộ khẩu thuộc tổ quản lý, thư kí, chủ tịch phường 
        /// có thể lấy được tất cả danh sách hộ khẩu của toàn phường.
        /// </summary>
        /// <param name="movedOut">
        /// `true` để lấy danh sách người đã chuyển đi, `false` để lấy danh sách những nhân khẩu đang thường trú/tạm trú
        /// <br/>Mặc định là `false`
        /// </param>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HouseholdBriefInfo>>> GetHousehold([FromQuery]bool movedOut = false)
        {
            if (_context.Household == null)
            {
                return NotFound();
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            const string ownerRelationShip = "Chủ hộ";
            if (await _userManager.IsInRoleAsync(user, "ScopeLeader"))
            {
                return Ok(_context.Household.Where(u => u.Scope == user.Scope && u.IsManaged && u.MoveOutDate.HasValue == movedOut)
                    .Select(u => new HouseholdBriefInfo()
                    {
                        HouseholdId = u.HouseholdId,
                        Scope = u.Scope,
                        OwnerFullName = u.Members.First(m => m.RelationShip == ownerRelationShip).FullName,
                        OwnerIDCode = u.Members.First(m => m.RelationShip == ownerRelationShip).IdentityCode,
                        CreatedTime= u.CreatedTime,
                    }));
            }
            else
            {

                return Ok(_context.Household.Where(u => u.IsManaged && u.MoveOutDate.HasValue == movedOut)
                    .Select(u => new HouseholdBriefInfo()
                    {
                        HouseholdId = u.HouseholdId,
                        Scope = u.Scope,
                        OwnerFullName = u.Members.First(m => m.RelationShip == ownerRelationShip).FullName,
                        OwnerIDCode = u.Members.First(m => m.RelationShip == ownerRelationShip).IdentityCode,
                        CreatedTime = u.CreatedTime,
                    }));
            }
        }

        // GET: api/Households/5
        /// <summary>
        /// Lấy ra thông tin chi tiết của hộ khẩu, chỉ người dùng cấp độ đặc biệt 
        /// (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ lấy ra thông tin chi tiết của hộ khẩu thuộc tổ quản lý, thư kí, 
        /// chủ tịch phường có thể lấy được thông tin chi tiết của hộ khẩu của toàn phường.
        /// </summary>
        /// <param name="householdId">Số hộ khẩu mà muốn lấy thông tin ra</param>
        [HttpGet("{householdId}")]
        public async Task<ActionResult<HouseholdDetail>> GetHousehold(string householdId)
        {
            if (_context.Household == null)
            {
                return NotFound();
            }
            var household = await _context.Household.Include(h => h.Members).FirstOrDefaultAsync(h => h.HouseholdId == householdId);

            if (household == null)
            {
                return NotFound();
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            var isScopeLeader = await _userManager.IsInRoleAsync(manager, "ScopeLeader");
            if (isScopeLeader && manager.Scope != household.Scope)
            {
                return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể lấy thông tin người dùng của tổ " + household.Scope + ".") });
            }

            return Ok(new HouseholdDetail()
            {
                Address = household.Address,
                CreatedTime = household.CreatedTime,
                HouseholdId = household.HouseholdId,
                MemberIdCodes = household.Members.Order(new ResidentInHouseholdComparer())
                                                .Select(m => m.IdentityCode).ToArray(),
                MoveOutDate = household.MoveOutDate,
                MoveOutPlace = household.MoveOutPlace,
                MoveOutReason = household.MoveOutReason,
                Scope = household.Scope

            });
        }

        // POST: api/Households
        /// <summary>
        /// Thêm hộ khẩu mới, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ thêm được hộ khẩu mới thuộc tổ quản lý.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> PostHousehold(AddingHouseholdRequestModel model)
        {
            string[] nonExistMemberIds = model.NonExistMembers.Select(m => m.IdentityCode).ToArray();
            //var hState = await GetHouseholdState(model.HouseholdId);
            if (await HouseholdExists(model.HouseholdId) || await ResidentsExists(nonExistMemberIds /*|| hState == _HouseholdState.Managed*/ ))
            {
                return Conflict();
            }
            //else if(hState == _HouseholdState.NotManaged)
            //{
            //    return BadRequest(new RequestError()
            //    {
            //        Code = "ExistAtRecycleBin",
            //        Description = "Household có cùng HouseholdId đang tồn tại trong thùng rác, dọn nó trong thùng rác trước khi thêm"
            //    });
            //}
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            var isScopeLeader = await _userManager.IsInRoleAsync(manager, "ScopeLeader");
            if (isScopeLeader && manager.Scope != model.Scope)
            {
                return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể tạo hộ khẩu thuộc tổ " + model.Scope + ".") });
            }
            Household household = new Household()
            {
                HouseholdId = model.HouseholdId,
                Address = model.Address,
                Scope = model.Scope,
                CreatedTime = DateTime.Now,
                MoveOutPlace = model.MoveOutPlace,
                MoveOutDate = model.MoveOutDate,
                MoveOutReason = model.MoveOutReason,
                IsManaged = true,
                Members = new List<Resident>()
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
            if (model.NonExistMembers != null)
            {
                foreach (var mem in model.NonExistMembers)
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
                        IDCardDate = mem.IDCardDate,
                        IDCardPlace = mem.IDCardPlace,
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
            }

            _context.Household.Add(household);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await GetHouseholdState(model.HouseholdId) == _HouseholdState.NotExist) || !await ResidentsExists(nonExistMemberIds))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Households
        /// <summary>
        /// Cập nhật thông tin hộ khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ cập nhật được thông tin hộ khẩu thuộc tổ quản lý.
        /// </summary>
        [HttpPut()]
        public async Task<IActionResult> PutHousehold(UpdateHouseholdRequestModel model)
        {
            if (model.NonExistMembers != null)
            {
                string[] nonExistMemberIds = model.NonExistMembers.Select(m => m.IdentityCode).ToArray();
                if (await ResidentsExists(nonExistMemberIds))
                {
                    return Conflict();
                }
            }
            var household = await _context.Household.Include(h => h.Members).FirstOrDefaultAsync(h => h.HouseholdId == model.HouseholdId);
            if (household == null)
            {
                return NotFound();
            }
            if (model.Address != null)
            {
                household.Address = model.Address;
            }
            if (model.Scope != null)
            {
                household.Scope = model.Scope.Value;
                household.Members.ForEach(member =>
                {
                    member.Scope = model.Scope.Value;
                });
            }
            bool moveOut = model.MoveOutPlace != null && model.MoveOutDate != null && model.MoveOutReason != null;
            if (moveOut)
            {
                household.MoveOutPlace = model.MoveOutPlace;
                household.MoveOutDate = model.MoveOutDate;
                household.MoveOutReason = model.MoveOutReason;
                household.Members.ForEach(resident =>
                {
                    resident.MoveOutDate = model.MoveOutDate;
                    resident.MoveOutPlace = model.MoveOutPlace;
                    resident.MoveOutReason = model.MoveOutReason;
                    _context.Resident.Update(resident);
                });
            }
            else if (!(model.MoveOutPlace == null && model.MoveOutDate == null && model.MoveOutReason == null))
            {
                return BadRequest(new RequestError()
                {
                    Code = "InvalidMoveOut",
                    Description = "Phải thay đổi đồng thời cả nơi chuyển đi, ngày chuyển đi và lý do chuyển đi.",
                });
            }

            

            if (model.NonExistMembers != null)
            {
                foreach (var mem in model.NonExistMembers)
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
                        IDCardDate = mem.IDCardDate,
                        IDCardPlace = mem.IDCardPlace,
                        RelationShip = mem.RelationShip,
                        IsManaged = true,
                        IsDead = false,
                        AcademicLevel = mem.AcademicLevel,
                        CriminalRecord = mem.CriminalRecord,
                        MoveInDate = mem.MoveInDate,
                        MoveInReason = mem.MoveInReason,
                        Scope = household.Scope,
                    };
                    resident.Household = household;
                    if (moveOut)
                    {
                        resident.MoveOutDate = model.MoveOutDate;
                        resident.MoveOutPlace = model.MoveOutPlace;
                        resident.MoveOutReason = model.MoveOutReason;
                    }
                    _context.Resident.Add(resident);
                }
            }
            _context.Household.Update(household);

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Households/5
        /// <summary>
        /// Xoá hộ khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ xoá được hộ khẩu thuộc tổ quản lý.
        /// </summary>
        [HttpDelete("{householdId}")]
        public async Task<IActionResult> DeleteHousehold(string householdId)
        {
            if((await _userManager.FindByNameAsync(householdId)) != null)
                return BadRequest(new RequestError()
                {
                    Code = "ForeignKeyConstraintFailed",
                    Description = "Một số hàng trong các bảng khác có khoá ngoài trỏ đến phần tử này. Phần tử này hiện tại không thể bị xoá.",
                });
            var household = await _context.Household.FindAsync(householdId);
            if (household == null)
            {
                return NotFound();
            }
            //household.IsManaged = false;
            await _context.Resident.Where(x => x.HouseholdId == householdId).ExecuteDeleteAsync();
            _context.Household.Remove(household);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {

                if(ex.InnerException != null)
                {
                    if(ex.InnerException.GetType() == typeof(Microsoft.Data.Sqlite.SqliteException))
                    {
                        var innerEx = ex.InnerException as Microsoft.Data.Sqlite.SqliteException;
                        if(innerEx.SqliteErrorCode == 19) 
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
        enum _HouseholdState
        {
            NotExist,
            NotManaged,
            Managed
        }
        private async Task<_HouseholdState> GetHouseholdState(string id)
        {
            var h = await _context.Household.FindAsync(id);
            if (h == null) return _HouseholdState.NotExist;
            if (h.IsManaged) return _HouseholdState.Managed;
            return _HouseholdState.NotManaged;
        }
        private async Task<bool> HouseholdExists(string id)
        {
            return await _context.Household.AnyAsync(e => e.HouseholdId == id);
        }
        private async Task<bool> ResidentsExists(string[] ids)
        {
            return await _context.Resident.AnyAsync(e => ids.Contains(e.IdentityCode));
        }
    }
}
