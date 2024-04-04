using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AssetManagement.Api
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class TokenAuthorizationAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            bool isValidToken = ApplicationAppContext.HttpContext != null && ApplicationAppContext.HttpContext.User.Claims.Any();
            if (isValidToken)
            {
                return;
            }
            else
            {
                context.Result = new UnauthorizedResult();
                return;
            }

        }
    }

}
