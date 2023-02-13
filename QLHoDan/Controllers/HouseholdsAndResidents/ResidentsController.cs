using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdsAndResidents.HouseholdApi;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;
using System.Data;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/Residents")]
    [ApiController]
    [Authorize(Roles = "CommitteeChairman, Accountant, ScopeLeader")]
    public class ResidentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ResidentsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        // GET: api/Residents
        /// <summary>
        /// Lấy ra danh sách nhân khẩu (thông tin khá sơ lược), chỉ người dùng cấp độ đặc biệt 
        /// (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ lấy ra danh sách nhân khẩu thuộc tổ quản lý, thư kí, chủ tịch phường 
        /// có thể lấy được tất cả danh sách nhân khẩu của toàn phường.
        /// </summary>
        /// <param name="isDead">
        /// <seealso cref="true"/> để lấy danh sách người đã chết, <see cref="false"/> để lấy danh sách những nhân khẩu bình thường
        /// Mặc định là <see cref="false"/>
        /// </param>
        /// <param name="movedOut">
        /// `true` để lấy danh sách người đã chuyển đi, `false` để lấy danh sách những nhân khẩu đang thường trú/tạm trú
        /// <br/>Mặc định là `false`
        /// </param>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ResidentBriefInfo>>> Get([FromQuery] bool isDead = false, [FromQuery]bool movedOut = false)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            if (await _userManager.IsInRoleAsync(user, "ScopeLeader"))
            {
                return Ok(_context.Resident
                    .Where(nk => nk.IsManaged && nk.IsDead == isDead && nk.MoveOutDate.HasValue == movedOut) 
                    .Select(nk => new ResidentBriefInfo()
                    {
                        IdentityCode = nk.IdentityCode,
                        FullName = nk.FullName,
                        DateOfBirth = nk.DateOfBirth,
                        IsMale = nk.IsMale,
                        HouseholdId = nk.HouseholdId,
                        RelationShip = nk.RelationShip,
                        Scope = nk.Scope,
                    }));
            }
            else
            {

                return Ok(_context.Resident
                    .Where(nk => nk.IsManaged && nk.IsDead == isDead && nk.MoveOutDate.HasValue == movedOut)
                    .Select(nk => new ResidentBriefInfo()
                    {
                        IdentityCode = nk.IdentityCode,
                        FullName = nk.FullName,
                        DateOfBirth = nk.DateOfBirth,
                        IsMale = nk.IsMale,
                        HouseholdId = nk.HouseholdId,
                        RelationShip = nk.RelationShip,
                        Scope = nk.Scope,
                    }));
            }
        }

        // GET api/Residents/5
        /// <summary>
        /// Lấy ra thông tin chi tiết của nhân khẩu, chỉ người dùng cấp độ đặc biệt 
        /// (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ lấy ra thông tin chi tiết của nhân khẩu thuộc tổ quản lý, thư kí, chủ tịch phường 
        /// có thể lấy được thông tin chi tiết của nhân khẩu của toàn phường.
        /// </summary>
        /// <param name="idCode">Số CMND/CCCD/Mã định danh điện tử của nhân khẩu mà muốn xoá</param>
        [HttpGet("{idCode}")]
        public async Task<ActionResult<ResidentDetail>> Get(string idCode)
        {
            var resident = await _context.Resident.FindAsync(idCode);

            if (resident == null)
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
            if (isScopeLeader && manager.Scope != resident.Scope)
            {
                return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể lấy thông tin người dùng của tổ " + resident.Scope + ".") });
            }

            return Ok(new ResidentDetail()
            {
                FullName = resident.FullName,
                Alias = resident.Alias,
                DateOfBirth = resident.DateOfBirth,
                IsMale = resident.IsMale,
                BirthPlace = resident.BirthPlace,
                NativeLand = resident.NativeLand,
                Ethnic = resident.Ethnic,
                Nation = resident.Nation,
                Job = resident.Job,
                Workplace = resident.Workplace,
                IdentityCode = resident.IdentityCode,
                IDCardDate = resident.IDCardDate,
                IDCardPlace = resident.IDCardPlace,
                RelationShip = resident.RelationShip,
                IsManaged = resident.IsManaged,
                IsDead = resident.IsDead,
                MoveOutPlace = resident.MoveOutPlace,
                MoveOutDate = resident.MoveOutDate,
                MoveOutReason = resident.MoveOutReason,
                AcademicLevel = resident.AcademicLevel,
                CriminalRecord = resident.CriminalRecord,
                MoveInDate = resident.MoveInDate,
                MoveInReason = resident.MoveInReason,
                HouseholdId =  resident.HouseholdId,
                Scope= resident.Scope,
            });
        }

        // POST api/Residents
        /// <summary>
        /// Thêm nhân khẩu mới, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ thêm được nhân khẩu mới thuộc tổ quản lý.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddingResidentRequestModel model)
        {
            if (await ResidentExists(model.IdentityCode))
            {
                return Conflict();
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var manager = await _userManager.FindByIdAsync(id);
            if (manager == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            int scope;
            Household household = null;
            if (model.HouseholdId != null)
            {
                household = await _context.Household.FindAsync(model.HouseholdId);
                if (household == null)
                {
                    return NotFound(new RequestError()
                    {
                        Code = "HouseholdNotFound",
                        Description = "Không tìm thấy hộ khẩu có số hộ khẩu là " + model.HouseholdId + "."
                    });
                }
                scope = household.Scope;
            }
            else if(model.Scope.HasValue)
            {
                if(model.Scope.Value <= 0)
                {
                    return BadRequest(new RequestError()
                    {
                        Code = "InvalidScope",
                        Description = "Scope bị nhập sai định dạng (scope là 1 số nguyên dương)."
                    });
                }
                scope = model.Scope.Value;
            }
            else return BadRequest(new RequestError()
            {
                Code = "InvalidScope",
                Description = "Scope chưa được nhập và không tìm thấy hộ khẩu để lấy ra scope (householdId = " + model.HouseholdId + ")."
            });
            var isScopeLeader = await _userManager.IsInRoleAsync(manager, "ScopeLeader");
            if (isScopeLeader && manager.Scope != scope)
            {
                return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể tạo nhân khẩu thuộc tổ " + scope + ".") });
            }
            
            Resident resident = new Resident()
            {
                FullName = model.FullName,
                Alias = model.Alias,
                DateOfBirth = model.DateOfBirth,
                IsMale = model.IsMale,
                BirthPlace = model.BirthPlace,
                NativeLand = model.NativeLand,
                Ethnic = model.Ethnic,
                Nation = model.Nation,
                Job = model.Job,
                Workplace = model.Workplace,
                IdentityCode = model.IdentityCode,
                IDCardDate = model.IDCardDate,
                IDCardPlace = model.IDCardPlace,
                RelationShip = model.RelationShip,
                IsManaged = true,
                IsDead = false,
                AcademicLevel = model.AcademicLevel,
                CriminalRecord = model.CriminalRecord,
                MoveInDate = model.MoveInDate,
                MoveInReason = model.MoveInReason,
                Scope = scope,
            };
            resident.Household = household;
            _context.Resident.Add(resident);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ResidentExists(model.IdentityCode))
                {
                    return NotFound(new RequestError()
                    {
                        Code = "ResidentNotFound",
                        Description = "Không tìm thấy nhân khẩu có số CMND/CCCD/Mã định danh điện tử là " + model.IdentityCode + "."
                    });
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // PUT api/Residents
        /// <summary>
        /// Cập nhật thông tin nhân khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ cập nhật được thông tin nhân khẩu thuộc tổ quản lý.
        /// </summary>
        [HttpPut()]
        public async Task<IActionResult> Put([FromBody] UpdateResidentRequestModel model)
        {
            Resident resident = await _context.Resident.FindAsync(model.IdentityCode);
            if (resident == null)
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
            if (isScopeLeader && manager.Scope != resident.Scope)
            {
                return BadRequest(new[] { new RequestError("IdS_ScopeOutOfManagement", "Tổ trưởng tổ " + manager.Scope + " không thể cập nhật nhân khẩu thuộc tổ " + resident.Scope + ".") });
            }

            if (model.HouseholdId != null)
            {
                if(model.HouseholdId == "delete")
                {
                    resident.HouseholdId = null;
                    resident.Household = null;
                }
                else
                {
                    var household = await _context.Household.FindAsync(model.HouseholdId);
                    if (household == null)
                    {
                        return NotFound(new RequestError()
                        {
                            Code = "HouseholdNotFound",
                            Description = "Không tìm thấy hộ khẩu có số hộ khẩu là " + model.HouseholdId + "."
                        });
                    }
                    resident.Scope = household.Scope;
                    resident.Household = household;
                }
            }

            if (model.Scope.HasValue && resident.HouseholdId == null)
            {
                resident.Scope = model.Scope.Value;
            }

            if (model.FullName != null) resident.FullName = model.FullName;
            if (model.Alias != null) resident.Alias = model.Alias;
            if (model.DateOfBirth != null) resident.DateOfBirth = model.DateOfBirth.Value;
            if (model.IsMale != null) resident.IsMale = model.IsMale.Value;
            if (model.BirthPlace != null) resident.BirthPlace = model.BirthPlace;
            if (model.NativeLand != null) resident.NativeLand = model.NativeLand;
            if (model.Ethnic != null) resident.Ethnic = model.Ethnic;
            if (model.Nation != null) resident.Nation = model.Nation;
            if (model.Job != null) resident.Job = model.Job;
            if (model.Workplace != null) resident.Workplace = model.Workplace;
            if (model.IDCardDate != null) resident.IDCardDate = model.IDCardDate;
            if (model.IDCardPlace != null) resident.IDCardPlace = model.IDCardPlace;
            if (model.RelationShip != null) resident.RelationShip = model.RelationShip;
            if (model.AcademicLevel != null) resident.AcademicLevel = model.AcademicLevel;
            if (model.CriminalRecord != null) resident.CriminalRecord = model.CriminalRecord;
            if (model.MoveInDate != null) resident.MoveInDate = model.MoveInDate.Value;
            if (model.MoveInReason != null) resident.MoveInReason = model.MoveInReason;
            //if (model.FullName != null) IsDead = false;
            if (model.MoveOutPlace != null && model.MoveOutDate != null && model.MoveOutReason != null)
            {
                resident.MoveOutDate = model.MoveOutDate;
                resident.MoveOutPlace = model.MoveOutPlace;
                resident.MoveOutReason = model.MoveOutReason;
            }
            else if (!(model.MoveOutPlace == null && model.MoveOutDate == null && model.MoveOutReason == null))
            {
                return BadRequest(new RequestError()
                {
                    Code = "InvalidMoveOut",
                    Description = "Phải thay đổi đồng thời cả nơi chuyển đi, ngày chuyển đi và lý do chuyển đi.",
                });
            }

            _context.Resident.Update(resident);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await ResidentExists(model.IdentityCode))
                {
                    return NotFound(new RequestError()
                    {
                        Code = "ResidentNotFound",
                        Description = "Không tìm thấy nhân khẩu có số CMND/CCCD/Mã định danh điện tử là " + model.IdentityCode + "."
                    });
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // DELETE api/Residents/5
        /// <summary>
        /// Xoá nhân khẩu, chỉ người dùng cấp độ đặc biệt (Tổ trưởng, thư kí, chủ tịch phường) mới dùng được.
        /// Tổ trưởng chỉ xoá được nhân khẩu thuộc tổ quản lý.
        /// </summary>
        /// <param name="idCode">Số CMND/CCCD/Mã định danh điện tử của nhân khẩu mà muốn xoá</param>
        [HttpDelete("{idCode}")]
        public async Task<IActionResult> Delete([FromRoute]string idCode)
        {
            Resident resident = await _context.Resident.FindAsync(idCode);
            if (resident == null)
            {
                return NotFound();
            }

            _context.Resident.Remove(resident);
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
        private async Task<bool> ResidentExists(string id)
        {
            return await _context.Resident.AnyAsync(e => e.IdentityCode == id);
        }
    }
}
