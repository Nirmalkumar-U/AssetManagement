namespace AssetManagement.Model
{
    public class AddEditRoleInitialLoadDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleCode { get; set; }
        public bool HasAdminAccess { get; set; }
        public bool HasBranchAccess { get; set; }
        public bool HasEmployeeAccess { get; set; }
        public bool HasAssetAccess { get; set; }
        public bool HasUserListAccess { get; set; }
        public bool HasAddEditUserAccess { get; set; }
        public bool HasRoleListAccess { get; set; }
        public bool HasAddEditRoleAccess { get; set; }
        public bool HasBranchListAccess { get; set; }
        public bool HasAddEditBranchAccess { get; set; }
        public bool HasEmployeeListAccess { get; set; }
        public bool HasAddEditEmployeeAccess { get; set; }
        public bool HasAssetListAccess { get; set; }
        public bool HasAddAssetAccess { get; set; }

    }
}
