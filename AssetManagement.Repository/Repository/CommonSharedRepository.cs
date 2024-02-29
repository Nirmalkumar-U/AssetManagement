using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AssetManagement.Repository
{
    public class CommonSharedRepository : ICommonSharedRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CommonSharedRepository(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public void SetClaim(string claimType, string claimValue)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;

            // Remove existing claim, if any
            var existingClaim = identity?.FindFirst(claimType);
            if (existingClaim != null)
            {
                identity?.RemoveClaim(existingClaim);
            }

            // Add the new claim
            identity?.AddClaim(new Claim(claimType, claimValue));
        }
        public string GetClaimValue(string claimType)
        {
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
            var claim = identity?.FindFirst(claimType);

            return claim?.Value;
        }
        public void RemoveAllClaims()
        {
            var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;

            // Remove all claims
            if (identity != null)
            {
                foreach (var claim in identity.Claims.ToList())
                {
                    identity.RemoveClaim(claim);
                }
            }
        }
    }
}
