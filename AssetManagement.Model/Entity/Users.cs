namespace AssetManagement.Model
{
    public class Users : EntityBase
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string UserCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public bool IsActive { get; set; }
        public Roles Roles { get; set; }
    }
}
