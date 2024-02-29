using AssetManagement.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoleList()
        {
            try
            {
                var Result = await _roleRepository.GetRoleList();
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
    }
}
