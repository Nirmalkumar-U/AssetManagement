namespace AssetManagement.Model
{
    public class DefaultValue
    {
        public int DefaultValueId { get; set; }
        public string ValueName { get; set; }
        public string ValueCode { get; set; }
        public string ValueDescription { get; set; }
        public string Data1 { get; set; }
        public string Data2 { get; set; }
        public string Data3 { get; set; }
        public int OrderNo { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public bool IsDeleted { get; set; }
    }
}
