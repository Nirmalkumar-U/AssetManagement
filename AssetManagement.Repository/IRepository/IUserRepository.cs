using AssetManagement.Model;

namespace AssetManagement.Repository
{
    public interface IUserRepository
    {
        Task<BaseResponseDto<UserDto>> Login(string email, string password);
        Task<BaseResponseDto<TokenDto>> CreateToken(UserDto user);
    }
}
