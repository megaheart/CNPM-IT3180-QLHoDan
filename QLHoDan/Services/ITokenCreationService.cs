using Microsoft.AspNetCore.Identity;
using QLHoDan.Models;

namespace QLHoDan.Services
{
    public class BearerToken
    {
        public string Content { get; set; }
        public DateTime Expiration { get; set; }
    }
    public interface ITokenCreationService
    {
        /// <summary>
        /// Tạo Jwt Token từ thông tin tài khoản người dùng và token này được sử dụng để xác thực tài khoản truy cập
        /// </summary>
        /// <param name="user">Tài khoản người muốn tạo Jwt token</param>
        /// <returns>Jwt Token được tạo từ thông tin tài khoản người dùng</returns>
        Task<BearerToken> CreateToken(ApplicationUser user);
    }
}
