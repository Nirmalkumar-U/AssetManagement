using AssetManagement.Model;

namespace AssetManagement.Repository
{
    public interface IAssetRepository
    {
        Task<BaseResponseDto<List<AssetDto>>> SaveAsset(CreateAssetDto model);
        Task<BaseResponseDto<List<AssetListDto>>> GetAssetList();
        Task<BaseResponseDto<AssetDto>> GetAssetByAssetId(int assetId);
        Task<BaseResponseDto<EditAssetInitialLoadDto>> EditAssetInitialLoad(int assetId);
        Task<BaseResponseDto<bool>> UpdateAsset(AssetDto model);
    }
}
