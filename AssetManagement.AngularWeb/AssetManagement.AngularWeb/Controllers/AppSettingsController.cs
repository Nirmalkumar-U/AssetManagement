using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AssetManagement.AngularWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppSettingsController : ControllerBase
    {
        private readonly AppSettings appSettings;


        public AppSettingsController(IOptions<AppSettings> appSettingsOptions)
        {
            appSettings = appSettingsOptions.Value;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(appSettings);
        }

    }

}