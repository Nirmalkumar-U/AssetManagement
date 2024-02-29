using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.Repository
{
    public class RoleRepository : EntityRepository<Roles>, IRoleRepository
    {
        public RoleRepository(AMContext amContext) : base(amContext)
        {
        }
        public async Task<BaseResponseDto<List<RoleListDto>>> GetRoleList()
        {
            try
            {
                var response = new BaseResponseDto<List<RoleListDto>> { Status = false };

                var result = await (from r in amContext.Roles.AsNoTracking()
                                    join u in amContext.Users.AsNoTracking() on r.RoleId equals u.RoleId into userGroup
                                    from us in userGroup.DefaultIfEmpty()
                                    group us by new { r.RoleName, r.RoleId, r.RoleCode } into g
                                    select new RoleListDto
                                    {
                                        RoleName = g.Key.RoleName,
                                        RoleId = g.Key.RoleId,
                                        RoleCode = g.Key.RoleCode,
                                        NoOfUser = g.Count(e => e != null)
                                    }).ToListAsync();

                response.Result = result;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<BaseResponseDto<AddEditRoleInitialLoadDto>> GetAddEditRoleInitialLoad(int roleId)
        {
            try
            {
                var response = new BaseResponseDto<AddEditRoleInitialLoadDto> { Status = false };

                var actions = await amContext.RoleAccess.Where(x => x.RoleId == roleId).Select(z => z.ActionId).ToListAsync();

                var result = await (from r in amContext.Roles.AsNoTracking()
                                    where !r.IsDeleted && r.RoleId == roleId
                                    select new AddEditRoleInitialLoadDto
                                    {
                                        RoleId = r.RoleId,
                                        RoleName = r.RoleName,
                                        RoleCode = r.RoleCode,
                                        HasAdminAccess = actions.Contains(2) || actions.Contains(3)|| actions.Contains(4)|| actions.Contains(5),
                                        HasBranchAccess = actions.Contains(6) || actions.Contains(7),
                                        HasEmployeeAccess = actions.Contains(8) || actions.Contains(9),
                                        HasAssetAccess = actions.Contains(10) || actions.Contains(11),
                                        HasUserListAccess = actions.Contains(2),
                                        HasAddEditUserAccess = actions.Contains(3),
                                        HasRoleListAccess = actions.Contains(4),
                                        HasAddEditRoleAccess = actions.Contains(5),
                                        HasBranchListAccess = actions.Contains(6),
                                        HasAddEditBranchAccess = actions.Contains(7),
                                        HasEmployeeListAccess = actions.Contains(8),
                                        HasAddEditEmployeeAccess = actions.Contains(9),
                                        HasAssetListAccess = actions.Contains(10),
                                        HasAddAssetAccess = actions.Contains(11),
                                    }).FirstOrDefaultAsync();
                if (result == null)
                {
                    response.Message = new()
                    {
                        "Selected Role is not Found..."
                    };
                    response.Status = false;
                }
                else
                {
                    response.Status = true;
                    response.Result = result;
                }

                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
    }
}
