using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHoDan.Data;
using QLHoDan.Models;
using QLHoDan.Models.AccountApi;
using QLHoDan.Models.Api;
using QLHoDan.Services;
using System.Linq;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.Account
{
    [Route("api/Notification")]
    [ApiController]
    [Authorize]
    public class NotificationController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public NotificationController(ApplicationDbContext context,
                                    UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        // GET: api/Notification
        /// <summary>
        /// Lấy ra danh sách thông báo thoả mã điều kiện cho trước.
        /// </summary>
        /// <param name="isRead">
        /// `true` để lấy danh sách thông báo đã đọc, `false` để lấy danh sách thông báo chưa đọc.<br/>Mặc định là `false`
        /// </param>
        /// <returns>danh sách thông báo thoả mã điều kiện cho trước</returns>
        [HttpGet]
        public async Task<IEnumerable<NotificationMsgResponseModel>> Get([FromQuery] bool isRead = false)
        {
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if (userName == null) { return new NotificationMsgResponseModel[0]; }
            var list = await _context.NotificationMessage.Where(m => m.Receiver == userName && m.IsRead == isRead)
                            .Select(m => new NotificationMsgResponseModel()
                            {
                                Id = m.Id,
                                Sender = m.Sender,
                                SenderFullname = null,
                                Time = m.Time,
                                Content = m.Content,
                                IsRead = m.IsRead,
                            }).ToListAsync();
            Dictionary<string, string> dic = new Dictionary<string, string>();
            foreach (var item in list)
            {
                string fullName;
                if(!dic.TryGetValue(item.Sender, out fullName))
                {
                    fullName = (await _userManager.FindByNameAsync(item.Sender))?.FullName ?? "Người gửi không tồn tại";
                    dic[item.Sender] = fullName;
                }
                item.SenderFullname = fullName;
            }
            return list;
        }

        // GET api/Notification/count
        /// <summary>
        /// Đếm số lượng thông báo chưa đọc.
        /// </summary>
        /// <returns>Số thông báo chưa đọc</returns>
        [HttpGet("count")]
        public async Task<int> CountUnreadNotificationMessages()
        {
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if(userName == null) { return 0; }
            int c = await _context.NotificationMessage.CountAsync(m => m.Receiver == userName && m.IsRead == false);
            return c;
        }
        // POST api/Notification/read
        /// <summary>
        /// Đếm số lượng thông báo chưa đọc.
        /// </summary>
        /// <param name="msgIds">
        /// Danh sách các mã thông báo cần đánh dấu đã đọc, có thể gồm 1 hoặc nhiều phần tử, 
        /// là các số nguyên dương cách nhau bởi dấu phẩy
        /// </param>
        /// <returns>Số thông báo chưa đọc</returns>
        [HttpPost("read")]
        public async Task<IActionResult> ReadNotificationMessage([FromQuery]string msgIds)
        {
            var userName = User.FindFirst(ClaimTypes.Name)?.Value;
            if (userName == null) { return Unauthorized(); }
            int[] msgIdList;
            try
            {
                msgIdList = Array.ConvertAll(msgIds.Split(','), int.Parse);
            }
            catch(Exception e)
            {
                return BadRequest(new RequestError()
                {
                    Code = "InvalidMsgIds",
                    Description = "msgIds bị sai định dạng"
                });
            }
            if(msgIdList == null || msgIdList.Length == 0) { return NotFound(); }
            var list = _context.NotificationMessage
                .Where(m => m.Receiver == userName && m.IsRead == false && msgIdList.Contains(m.Id)).AsAsyncEnumerable();
            var success = new List<int>();
            await foreach(var item in list)
            {
                item.IsRead = true;
                success.Add(item.Id);
            }

            await _context.SaveChangesAsync();
            return Ok(success);
        }
    }
}
