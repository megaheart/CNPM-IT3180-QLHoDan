using Microsoft.AspNetCore.Identity;
using QLHoDan.Models;

namespace QLHoDan.Services
{
    /// <summary>
    /// Thông tin token
    /// </summary>
    public class BearerToken
    {
        public string Content { get; set; }
        public DateTime Expiration { get; set; }
    }
    /// <summary>
    /// Interface cho Service phụ trách tạo token đăng nhập
    /// </summary>
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
