using AzureAd.Constants;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace AzureAd.Services
{
    public interface IIdentityService
    {
        bool IsAuthenticated();
        string GetMail();
        string GetId();
    }

    public class AzureAdIdentityService : IIdentityService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AzureAdIdentityService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public bool IsAuthenticated()
        {
            return _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated;
        }

        public string GetMail()
        {
            var test = _httpContextAccessor.HttpContext.User.Identity.Name;
            return test;
        }

        public string GetId()
        {
            var idClaims = _httpContextAccessor.HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == AzureAdClaimTypes.ObjectId);

            return idClaims?.Value;
        }
    }
}
