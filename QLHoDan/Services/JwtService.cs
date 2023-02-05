using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QLHoDan.Models;

namespace QLHoDan.Services
{

    public class JwtService : ITokenCreationService
    {
        private const int EXPIRATION_MINUTES = 60 * 24;

        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        public JwtService(IConfiguration configuration,
                            UserManager<ApplicationUser> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }
        /// <summary>
        /// Tạo Jwt Token từ thông tin tài khoản người dùng và token này được sử dụng để xác thực tài khoản truy cập
        /// </summary>
        /// <param name="user">Tài khoản người muốn tạo Jwt token</param>
        /// <returns>Jwt Token được tạo từ thông tin tài khoản người dùng</returns>
        public async Task<BearerToken> CreateToken(ApplicationUser user)
        {
            var expiration = DateTime.UtcNow.AddMinutes(EXPIRATION_MINUTES);

            var token = CreateJwtToken(
                await CreateClaims(user, expiration),
                CreateSigningCredentials(),
                expiration
            );

            var tokenHandler = new JwtSecurityTokenHandler();

            return new BearerToken()
            {
                Content = tokenHandler.WriteToken(token),
                Expiration= expiration,
            };
        }

        private JwtSecurityToken CreateJwtToken(IEnumerable<Claim> claims, SigningCredentials credentials, DateTime expiration) =>
            new JwtSecurityToken(
                _configuration["JwtToken:Issuer"],
                _configuration["JwtToken:Audience"],
                claims,
                expires: expiration,
                signingCredentials: credentials
            );
        /// <summary>
        /// Lấy ra các thông tin quan trọng phục vụ cho việc xác minh truy cập
        /// </summary>
        /// <param name="user">Thông tin người dùng</param>
        /// <param name="expiration">Ngày token hết hạn</param>
        /// <returns>Danh sách các thông tin quan trọng phục vụ cho việc xác minh truy cập</returns>
        private async Task<List<Claim>> CreateClaims(ApplicationUser user, DateTime expiration)
        {
            List<Claim> claims = new List<Claim>(8) {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                //new Claim(JwtRegisteredClaimNames.Sub, _configuration["JwtToken:Subject"]),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
            };
            foreach(var role in await _userManager.GetRolesAsync(user))
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }

        /// <summary>
        /// Lấy ra chữ kí phục vụ cho việc xác minh truy cập
        /// </summary>
        /// <returns>Chữ kí phục vụ cho việc xác minh truy cập</returns>
        private SigningCredentials CreateSigningCredentials() =>
            new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["JwtToken:Key"])
                ),
                SecurityAlgorithms.HmacSha256
            );
    }
}
