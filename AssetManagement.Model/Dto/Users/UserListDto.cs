namespace AssetManagement.Model
{
    public class UserListDto
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string UserCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public bool IsActive { get; set; }
    }
}
