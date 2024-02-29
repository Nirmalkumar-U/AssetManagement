namespace AssetManagement.Model
{
    public class Employee : EntityBase
    {
        public int EmployeeId { get; set; }
        public int? BranchId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeCode { get; set; }
        public string Department { get; set; }
        public bool Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string EmailId { get; set; }
        public string PhoneNumber { get; set; }
        public string EmployeeCity { get; set; }
        public string EmployeeState { get; set; }
        public string EmployeeStatus { get; set; }
        public virtual Branch Branch { get; set; }
        public virtual List<Asset> Assets { get; set; }
    }
}
