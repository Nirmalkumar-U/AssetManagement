namespace AssetManagement.Repository
{
    public interface IEncriptDecriptRepository
    {
        public string EncryptData(string data);
        public string DecryptData(string data);
    }
}
