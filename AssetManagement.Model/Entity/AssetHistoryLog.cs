namespace AssetManagement.Model
{
    public class AssetHistoryLog
    {
        public int AssetHistoryLogId { get; set; }
        public int AssetId { get; set; }
        public int EmployeeId { get; set; }
        public string LogMessage { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public virtual Asset Asset { get; set; }
    }
}
