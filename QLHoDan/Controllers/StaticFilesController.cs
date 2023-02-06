using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QLHoDan.Models;
using QLHoDan.Models.Api;
using System.Security.Claims;

namespace QLHoDan.Controllers
{
    [Route("static")]
    [ApiController]
    public class StaticFilesController : ControllerBase
    {
        private readonly QLHoDan.Services.Storage _storage;
        public StaticFilesController(QLHoDan.Services.Storage storage)
        {
            _storage = storage;
        }
        //static/img/{id}
        /// <summary>
        /// Dùng để lấy nội dung file ảnh
        /// </summary>
        /// <param name="id">Id của bức ảnh</param>
        [HttpGet("img/{id}")]
        public async Task<IActionResult> GetImage([FromRoute]string id)
        {
            var f = _storage.GetImage(id);
            if(f == null) { return NotFound(); }
            return File(f.Stream, f.ContentType);
        }
    }
}
