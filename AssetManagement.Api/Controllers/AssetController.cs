using AssetManagement.Model;
using AssetManagement.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AssetController : ControllerBase
    {
        private readonly IAssetRepository _assetRepository;

        public AssetController(IAssetRepository assetRepository)
        {
            _assetRepository = assetRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAssetList()
        {
            try
            {
                var Result = await _assetRepository.GetAssetList();
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpPost]
        public async Task<IActionResult> SaveAsset(CreateAssetDto model)
        {
            try
            {
                var Result = await _assetRepository.SaveAsset(model);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        public async Task<IActionResult> EditAssetInitialLoad(int assetId)
        {
            try
            {
                var Result = await _assetRepository.EditAssetInitialLoad(assetId);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateAsset(AssetDto model)
        {
            try
            {
                var Result = await _assetRepository.UpdateAsset(model);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
    }
}
