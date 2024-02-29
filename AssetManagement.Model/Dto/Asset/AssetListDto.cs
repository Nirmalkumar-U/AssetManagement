namespace AssetManagement.Model
{
    public class AssetListDto
    {
        public int AssetId {  get; set; }
        public string AssetName { get; set; }
        public string AssetCode { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int? BranchId { get; set; }
        public string BranchName { get; set; }
        public string AssetType { get; set; }
        public string SerialNo { get; set; }
        public string Status { get; set; }
    }
}
