namespace AssetManagement.Model
{
    public class BaseResponseDto<T>
    {
        public List<string> Message { get; set; }
        public T Result { get; set; }
        public bool Status { get; set; }
    }
}
