namespace AssetManagement.Repository
{
    public interface ICommonSharedRepository
    {
        public void SetClaim(string claimType, string claimValue);
        public string GetClaimValue(string claimType);
        public void RemoveAllClaims();
    }
}
