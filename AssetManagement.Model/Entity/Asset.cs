namespace AssetManagement.Model
{
    public class Asset : EntityBase
    {
        public int AssetId { get; set; }
        public int BranchId { get; set; }
        public int? EmployeeId { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string AssetDescription { get; set; }
        public string AssetType { get; set; }
        public string ModelName { get; set; }
        public int AssetCost { get; set; }
        public string SerialNumber { get; set; }
        public string AssetStatus { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual Employee Employee { get; set; } = null;
        public virtual List<AssetHistoryLog> AssetHistoryLog { get; set; }
    }
}
