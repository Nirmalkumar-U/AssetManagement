using AssetManagement.Model;
using AssetManagement.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class BranchController : ControllerBase
    {
        private readonly IBranchRepository _branchRepository;

        public BranchController(IBranchRepository branchRepository)
        {
            _branchRepository = branchRepository;
        }

        [HttpPost]
        [TokenAuthorization]
        public async Task<IActionResult> SaveBranch(SaveBranchDto model)
        {
            try
            {
                var Result = await _branchRepository.SaveBranch(model);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpPost]
        [TokenAuthorization]
        public async Task<IActionResult> SyncBranch(List<SaveBranchDto> model)
        {
            try
            {
                bool isSaved = true;
                foreach (var item in model)
                {
                    var Result = await _branchRepository.SaveBranch(item);
                    if(!Result.Status)
                    {
                        isSaved = false;
                        break;
                    }
                }
                return new OkObjectResult(isSaved);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        [TokenAuthorization]
        public async Task<IActionResult> GetBranchList()
        {
            try
            {
                var Result = await _branchRepository.GetBranchList();
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        [TokenAuthorization]
        public async Task<IActionResult> GetBranchByBranchId(int branchId)
        {
            try
            {
                var Result = await _branchRepository.GetBranchByBranchId(branchId);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        [TokenAuthorization]
        public async Task<IActionResult> GetBranchDropDown()
        {
            try
            {
                var Result = await _branchRepository.GetBranchDropDown();
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
    }
}
