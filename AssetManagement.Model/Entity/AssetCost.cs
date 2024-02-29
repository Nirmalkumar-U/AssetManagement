namespace AssetManagement.Model
{
    public class AssetCost
    {
        public int AssetCostId { get; set; }
        public int AssetId { get; set; }
        public int BranchId { get; set; }
        public int NoOfItem { get; set; }
        public int TotalCost { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
