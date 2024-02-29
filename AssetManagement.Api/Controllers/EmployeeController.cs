using AssetManagement.Model;
using AssetManagement.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        [HttpPost]
        public async Task<IActionResult> SaveEmployee(SaveEmployeeDto employee)
        {
            try
            {
                var Result = await _employeeRepository.SaveEmployee(employee);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeList()
        {
            try
            {
                var Result = await _employeeRepository.GetEmployeeList();
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeByEmployeeId(int employeeId)
        {
            try
            {
                var Result = await _employeeRepository.GetEmployeeByEmployeeId(employeeId);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
    }
}
