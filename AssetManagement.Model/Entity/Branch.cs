namespace AssetManagement.Model
{
    public class Branch : EntityBase
    {
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string BranchCity { get; set; }
        public string BranchState { get; set; }
        public virtual List<Employee> Employees { get; set; }
        public virtual List<Asset> Assets { get; set; }
    }
}
