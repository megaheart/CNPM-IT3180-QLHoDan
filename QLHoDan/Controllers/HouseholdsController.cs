using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;

namespace QLHoDan.Controllers
{
    [Route("api/Households")]
    [ApiController]
    public class HouseholdsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HouseholdsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Households
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Household>>> GetHousehold()
        {
          if (_context.Household == null)
          {
              return NotFound();
          }
            return await _context.Household.ToListAsync();
        }

        // GET: api/Households/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Household>> GetHousehold(string id)
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

            return household;
        }

        // PUT: api/Households/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHousehold(string id, Household household)
        {
            if (id != household.HouseholdId)
            {
                return BadRequest();
            }

            _context.Entry(household).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HouseholdExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

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
