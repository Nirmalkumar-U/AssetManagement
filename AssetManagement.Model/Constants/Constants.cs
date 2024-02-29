namespace AssetManagement.Model
{
    public static class Constants
    {
        public const int AssetStatusValueCode = 100;
        public const int EmployeeStatusValueCode = 200;
    }
    public static class AssetStatus
    {
        public const string Available = "AVBL";
        public const string NotUsable = "NUSB";
        public const string InUse = "INUS";
        public const string NewRecord = "NREC";
    }
    public static class EmployeeStatus
    {
        public const string Active = "ACTV";
        public const string InActive = "IACT";
        public const string Resigned = "RESI";
    }
    public static class AppClaimTypes
    {
        public const string FirstName = nameof(FirstName);
        public const string LastName = nameof(LastName);
        public const string UserId = nameof(UserId);
        public const string EmailId = nameof(EmailId);
        public const string RoleId = nameof(RoleId);
        public const string Actions = nameof(Actions);
    }
}
