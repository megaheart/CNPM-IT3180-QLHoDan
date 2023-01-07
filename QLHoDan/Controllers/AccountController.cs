using Duende.IdentityServer.Services;
using Duende.IdentityServer.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QLHoDan.Models.AccountApi;
using QLHoDan.Models;
using System.Text.Json;

namespace QLHoDan.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IClientStore _clientStore;
        private readonly IEventService _events;

        public AccountController(SignInManager<ApplicationUser> signInManager,
                                    UserManager<ApplicationUser> userManager,
                                    IIdentityServerInteractionService interaction,
                                    IAuthenticationSchemeProvider schemeProvider,
                                    IClientStore clientStore,
                                    IEventService events)
        {
            _userManager = userManager;
            _interaction = interaction;
            _schemeProvider = schemeProvider;
            _clientStore = clientStore;
            _events = events;
            _signInManager = signInManager;
        }
        // POST api/account/signin
        [HttpPost("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn([FromBody] RegisterRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email
            };
            IdentityResult result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(string.Format("[{0}]", Json(new IdentityError
                {
                    Description = "Unknown Error"
                })));
            }

            return Ok("[]");
        }
        // POST api/account/register
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email
            };
            IdentityResult result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(string.Format("[{0}]", Json(new IdentityError
                {
                    Description = "Unknown Error"
                })));
            }

            return Ok("[]");
        }
        //POST api/account/changepassword
        [HttpPost("changepassword")]
        //[Authorize(AuthenticationSchemes = "Bearer")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IdentityResult result =
                await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(string.Format("[{0}]", Json(new IdentityError
                {
                    Description = "Unknown Error"
                })));
            }

            return Ok("[]");
        }

        [HttpPost("forgotpassword")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            string token = await _userManager.GeneratePasswordResetTokenAsync(user);

            return Ok(token);
        }

        [HttpPost("resetpassword")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            IdentityResult result =
                await _userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(string.Format("[{0}]", Json(new IdentityError
                {
                    Description = "Unknown Error"
                })));
            }

            return Ok();
        }
        //GET api/account/deleteself
        [HttpGet("deleteself")]
        //[Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> DeleteAccount(/*[FromBody] DeleteAccountRequestModel model*/)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            IdentityResult result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                    return BadRequest(result.Errors);
                return BadRequest(string.Format("[{0}]", Json(new IdentityError
                {
                    Description = "Unknown Error"
                })));
            }

            return Ok("[]");
        }
        #region Helper
        private JsonSerializerOptions _jsonSerializerOptions = new JsonSerializerOptions()
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        public string Json<T>(T o)
        {
            return JsonSerializer.Serialize(o, _jsonSerializerOptions);
        }
        #endregion
    }
}
