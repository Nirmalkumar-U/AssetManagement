using AssetManagement.Model;

namespace AssetManagement.Repository
{
    public interface IRoleRepository
    {
        Task<BaseResponseDto<List<RoleListDto>>> GetRoleList();
        Task<BaseResponseDto<AddEditRoleInitialLoadDto>> GetAddEditRoleInitialLoad(int roleId);
    }
}
