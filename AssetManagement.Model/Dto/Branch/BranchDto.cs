namespace AssetManagement.Model
{
    public class BranchDto
    {
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string BranchCity { get; set; }
        public string BranchState { get; set; }
        public List<EmployeeListDto> EmployeeList { get; set; }
    }
}
