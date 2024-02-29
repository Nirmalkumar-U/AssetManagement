namespace AssetManagement.Model
{
    public class EditAssetInitialLoadDto
    {
        public AssetDto Asset { get; set; }
        public List<DropDownListDto> BranchDropDown { get; set; }
        public List<DropDownListDto> EmployeeDropDown { get; set; }
        public List<DropDownListDto> AssetStatusDropDown { get; set; }
    }
}
