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
        Task<BearerToken> CreateToken(ApplicationUser user);
    }
}
