using AssetManagement.Model;

namespace AssetManagement.Repository
{
    public interface IBranchRepository
    {
        Task<BaseResponseDto<int>> SaveBranch(SaveBranchDto model);
        Task<BaseResponseDto<List<BranchListDto>>> GetBranchList();
        Task<BaseResponseDto<BranchDto>> GetBranchByBranchId(int branchId);
        Task<List<DropDownListDto>> GetBranchDropDown();
    }
}
