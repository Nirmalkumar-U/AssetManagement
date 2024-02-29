using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.Repository
{
    public class CommonRepository : EntityRepository<DefaultValue>, ICommonRepository
    {
        public CommonRepository(AMContext amContext) : base(amContext)
        { }
        public async Task<List<DropDownListDto>> GetStatusDropDown(string valueCode)
        {
            try
            {
                var result = await (from dv in amContext.DefaultValue.AsNoTracking()
                                    where !dv.IsDeleted && dv.ValueCode == valueCode
                                    select new DropDownListDto
                                    {
                                        Value = dv.ValueName,
                                        Label = dv.ValueDescription
                                    }).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
    }
}
