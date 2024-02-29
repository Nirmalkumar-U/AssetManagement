using AssetManagement.Model;

namespace AssetManagement.Repository
{
    public interface ICommonRepository
    {
        Task<List<DropDownListDto>> GetStatusDropDown(string valueCode);
    }
}
