using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.Reward
{
    [Route("api/forms")]
    [ApiController]
    public class FormsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public FormsController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        // GET: api/forms/AchievementEvidence
        [HttpGet("AchievementEvidence")]
        public async Task<IActionResult> GetAchievementEvidenceForms()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return Unauthorized(new[] { new RequestError("IdS_InvalidToken", "Jwt token is invalid or something else.") });
            }

            return Ok();
        }
    }
}
