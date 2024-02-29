namespace AssetManagement.Model
{
    public class CreateAssetDto
    {
        public int BranchId { get; set; }
        public int NoOfAsset { get; set; }
        public string AssetName { get; set; }
        public string AssetDescription { get; set; }
        public string TypeOfAsset { get; set; }
        public int CostOfAsset { get; set; }
    }
}