using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace AssetManagement.Api
{
    public class ApiKeyValidationService
    {
        public static bool ValidateApiKey(string headerApiKey, string actualApiKey)
        {
            return headerApiKey == actualApiKey;
        }
    }

    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiKeyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.Request.Headers.TryGetValue("ApiKey", out var apiKey))
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await context.Response.WriteAsync("API Key is missing.");
                return;
            }
            var actualApiKey = ApplicationAppContext.GetConfigValue("ApiKey");
            if (!ApiKeyValidationService.ValidateApiKey(apiKey, actualApiKey))
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await context.Response.WriteAsync("Invalid API Key.");
                return;
            }

            await _next(context);
        }
    }
    // ApiKeyAuthorizationAttribute.cs
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ApiKeyAuthorizationAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue("ApiKey", out var apiKey))
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            var actualApiKey = ApplicationAppContext.GetConfigValue("ApiKey");
            if (!ApiKeyValidationService.ValidateApiKey(apiKey, actualApiKey))
            {
                context.Result = new UnauthorizedResult();
            }

        }
    }

}
