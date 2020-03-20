using AzureAd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AzureAd.Controllers
{
    public class UserInfo
    {
        public string Id { get; set; }
        public string Login { get; set; }
        public bool IsAuthenticated { get; set; }
    }

    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        public UserController(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        [HttpGet("current")]
        public UserInfo CurrentUser()
        {

            var test1 = _identityService;

            return new UserInfo
            {
                Id = _identityService.GetId(),
                Login = _identityService.GetMail(),
                IsAuthenticated = _identityService.IsAuthenticated()
            };
        }
    }
}