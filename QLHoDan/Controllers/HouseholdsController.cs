using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.AccountApi;
using QLHoDan.Models.Api;
using QLHoDan.Models.HouseholdApi;
using System.Data;
using System.Linq;
using System.Security.Claims;

namespace QLHoDan.Controllers
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
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HouseholdBriefInfo>>> GetHousehold()
        {
            if (_context.Household == null)
            {
                return NotFound();
            }
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return BadRequest(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }
            const string ownerRelationShip = "Chủ hộ";
            if (await _userManager.IsInRoleAsync(user, "ScopeLeader"))
            {
                return Ok(_context.Household.Where(u => u.Scope == user.Scope && u.IsManaged)
                    .Select(u => new HouseholdBriefInfo()
                    {
                        HouseholdId = u.HouseholdId,
                        Scope = u.Scope,
                        OwnerFullName = u.Members.First(m => m.RelationShip == ownerRelationShip).FullName,
                        OwnerIDCode = u.Members.First(m => m.RelationShip == ownerRelationShip).IdentityCode,
                    }));
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

            return Ok(new HouseholdDetail() { 
                Address = household.Address,
                CreatedTime = household.CreatedTime,
                HouseholdId = household.HouseholdId,
                MemberIdCodes = household.Members.Order(new ResidentInHouseholdComparer())
                                                .Select(m => m.IdentityCode).ToArray(),
                MoveOutDate = household.MoveOutDate ,
                MoveOutPlace = household.MoveOutPlace,
                MoveOutReason = household.MoveOutReason,
                Scope = household.Scope

            });
        }

        // PUT: api/Households
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut()]
        public async Task<IActionResult> PutHousehold(AddingHouseholdRequestModel model)
        {
            //var household = new Household();
            //_context.Entry(household).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!HouseholdExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return NoContent();
        }

        // POST: api/Households
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Household>> PostHousehold(Household household)
        {
            if (_context.Household == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Household'  is null.");
            }
            _context.Household.Add(household);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (HouseholdExists(household.HouseholdId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetHousehold", new { id = household.HouseholdId }, household);
        }

        // DELETE: api/Households/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHousehold(string id)
        {
            if (_context.Household == null)
            {
                return NotFound();
            }
            var household = await _context.Household.FindAsync(id);
            if (household == null)
            {
                return NotFound();
            }

            _context.Household.Remove(household);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HouseholdExists(string id)
        {
            return (_context.Household?.Any(e => e.HouseholdId == id)).GetValueOrDefault();
        }
    }
}
