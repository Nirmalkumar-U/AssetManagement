using AssetManagement.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AssetManagement.Repository
{
    public class UserRepository : EntityRepository<Users>, IUserRepository
    {
        private readonly IEncriptDecriptRepository _encriptDecriptRepository;
        public UserRepository(AMContext amContext, IEncriptDecriptRepository encriptDecriptRepository) : base(amContext)
        {
            _encriptDecriptRepository = encriptDecriptRepository;
        }
        public async Task<BaseResponseDto<UserDto>> Login(string email, string password)
        {
            try
            {
                var response = new BaseResponseDto<UserDto> { Status = false };
                response.Message = new();

                var user = await amContext.Users.Where(z => z.EmailId == email).FirstOrDefaultAsync();
                if (user == null)
                {
                    response.Status = false;
                    response.Message.Add("User is not Created...");
                }
                else
                {
                    var pass = _encriptDecriptRepository.DecryptData(user.Password);
                    if (pass == password)
                    {
                        response.Status = true;
                        response.Message.Add("Login Successfully...");
                        var loggedUser = new UserDto()
                        {
                            UserId = user.UserId,
                            Email = email,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            RoleId = user.RoleId
                        };
                        response.Result = loggedUser;
                    }
                    else
                    {
                        response.Status = false;
                        response.Message.Add("Password is incorrect...");
                    }
                }
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<BaseResponseDto<TokenDto>> CreateToken(UserDto user)
        {
            try
            {
                var response = new BaseResponseDto<TokenDto> { Status = false };

                var securityKey = "NMyISuRpeMrSAecLreHtKAeyR12I3!NI";
                var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(securityKey));
                var issuer = "itismekumaru";
                var audience = "itisaudience";
                var expiresInSeconds = 900;
                var expiresIn = DateTime.Now.AddSeconds(expiresInSeconds);

                var actions = await amContext.RoleAccess.Where(x => x.RoleId == user.RoleId).Select(z => z.ActionId).ToListAsync();
                var act = string.Join(",", actions);

                var claims = new List<ClaimDto>
                    {
                        new ClaimDto { Key = AppClaimTypes.UserId, Value = user.UserId.ToString()},
                        new ClaimDto { Key = AppClaimTypes.FirstName, Value = user.FirstName},
                        new ClaimDto { Key = AppClaimTypes.LastName, Value = user.LastName },
                        new ClaimDto { Key = AppClaimTypes.EmailId, Value = user.Email },
                        new ClaimDto { Key = AppClaimTypes.RoleId, Value = user.RoleId.ToString()},
                        new ClaimDto { Key = AppClaimTypes.Actions, Value = act}
                    };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                            new Claim(AppClaimTypes.UserId, claims.Find(x=>x.Key==AppClaimTypes.UserId)?.Value),
                            new Claim(AppClaimTypes.FirstName, claims.Find(x=>x.Key==AppClaimTypes.FirstName)?.Value),
                            new Claim(AppClaimTypes.LastName, claims.Find(x=>x.Key==AppClaimTypes.LastName)?.Value),
                            new Claim(AppClaimTypes.EmailId, claims.Find(x=>x.Key==AppClaimTypes.EmailId)?.Value),
                            new Claim(AppClaimTypes.RoleId, claims.Find(x=>x.Key==AppClaimTypes.RoleId)?.Value),
                            new Claim(AppClaimTypes.Actions, claims.Find(x=>x.Key==AppClaimTypes.Actions)?.Value)
                    }),

                    Expires = expiresIn,
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);

                response.Result = new()
                {
                    AccessToken = tokenHandler.WriteToken(token),
                    Claims = claims,
                    ExpireIn = expiresInSeconds.ToString()
                };
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
        public async Task<BaseResponseDto<List<UserListDto>>> GetUserList(int userId)
        {
            try
            {
                var response = new BaseResponseDto<List<UserListDto>> { Status = false };

                var userList = await amContext.Users.Where(x => !x.IsDeleted).Select(u => new UserListDto
                {
                    UserId = u.UserId,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    EmailId = u.EmailId,
                    Password = u.UserId == userId ? _encriptDecriptRepository.DecryptData(u.Password) : null,
                    UserCode = u.UserCode,
                    City = u.City,
                    State = u.State,
                    IsActive = u.IsActive
                }).ToListAsync();
                response.Result = userList;
                response.Status = true;
                return response;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex);
                throw;
            }
        }
    }
}
