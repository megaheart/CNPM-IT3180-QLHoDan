using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdApi;
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HouseholdBriefInfo>>> GetHousehold()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            const string ownerRelationShip = "Chủ hộ";
            if (await _userManager.IsInRoleAsync(user, "ScopeLeader"))
            {
                var l = _context.Household.Where(u => u.Scope == user.Scope && u.IsManaged);
                var o = new List<HouseholdBriefInfo>(l.Count());
                foreach (var u in l){
                    var owner = u.Members.First(m => m.RelationShip == ownerRelationShip);
                    var h = new HouseholdBriefInfo()
                    {
                        HouseholdId = u.HouseholdId,
                        Scope = u.Scope,
                        OwnerFullName = owner.FullName,
                        OwnerIDCode = owner.IdentityCode,
                    };
                    o.Add(h);
                }
                return Ok(o);
            }
            else
            {

                return Ok(_context.Household.Where(u => u.IsManaged)
                    .Select(u => new HouseholdBriefInfo()
                    {
                        HouseholdId = u.HouseholdId,
                        Scope = u.Scope,
                        OwnerFullName = u.Members.First(m => m.RelationShip == ownerRelationShip).FullName,
                        OwnerIDCode = u.Members.First(m => m.RelationShip == ownerRelationShip).IdentityCode,
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
        [HttpGet("{householdId}")]
        public async Task<ActionResult<HouseholdDetail>> GetHousehold(string householdId)
        {
            if (_context.Household == null)
            {
                return NotFound();
            }
            var household = await _context.Household.FindAsync(householdId);

            if (household == null)
            {
                return NotFound();
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return BadRequest(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
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

        // PUT: api/Households
        /// <summary>
        /// Thêm hộ khẩu mới, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ thêm được hộ khẩu mới thuộc tổ quản lý.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> PostHousehold(AddingHouseholdRequestModel model)
        {
            string[] nonExistMemberIds = model.NonExistMembers.Select(m => m.IdentityCode).ToArray();
            if (await HouseholdExists(model.HouseholdId) || await ResidentsExists(nonExistMemberIds))
            {
                return Conflict();
            }
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
                };
                household.Members.Add(resident);

            }

            _context.Entry(household).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await HouseholdExists(model.HouseholdId) || !await ResidentsExists(nonExistMemberIds))
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
            var household = await _context.Household.FindAsync(model.HouseholdId);
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
            }
            if (model.MoveOutPlace != null)
            {
                household.MoveOutPlace = model.MoveOutPlace;
            }
            if (model.MoveOutDate != null)
            {
                household.MoveOutDate = model.MoveOutDate;
            }
            if (household.MoveOutReason != null)
            {
                household.MoveOutReason = model.MoveOutReason;
            }

            if(model.NonExistMembers != null)
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
                    };
                    _context.Entry(resident).State = EntityState.Modified;
                    resident.Household = household;
                }
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Households/5
        [HttpDelete("{householdId}")]
        public async Task<IActionResult> DeleteHousehold(string householdId)
        {
            var household = await _context.Household.FindAsync(householdId);
            if (household == null)
            {
                return NotFound();
            }
            _context.Household.Remove(household);
            await _context.SaveChangesAsync();

            return Ok();
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
