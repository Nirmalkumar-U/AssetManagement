using AssetManagement.Model;
using Microsoft.AspNetCore.Http;
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

                var tokenHandler = new JwtSecurityTokenHandler();
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
                            new(AppClaimTypes.UserId, claims.Find(x=>x.Key==AppClaimTypes.UserId)?.Value),
                            new(AppClaimTypes.FirstName, claims.Find(x=>x.Key==AppClaimTypes.FirstName)?.Value),
                            new(AppClaimTypes.LastName, claims.Find(x=>x.Key==AppClaimTypes.LastName)?.Value),
                            new(AppClaimTypes.EmailId, claims.Find(x=>x.Key==AppClaimTypes.EmailId)?.Value),
                            new(AppClaimTypes.RoleId, claims.Find(x=>x.Key==AppClaimTypes.RoleId)?.Value),
                            new(AppClaimTypes.Actions, claims.Find(x=>x.Key==AppClaimTypes.Actions)?.Value)
                    }),
                    IssuedAt = DateTime.Now,
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256)
                };

                tokenDescriptor.Expires = tokenDescriptor.IssuedAt?.AddSeconds(expiresInSeconds);
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

        public async Task<BaseResponseDto<TokenDto>> RefreshToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = "itismekumaru",
                    ValidateAudience = true,
                    ValidAudience = "itisaudience",
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("NMyISuRpeMrSAecLreHtKAeyR12I3!NI"))
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == AppClaimTypes.UserId).Value);
                var user = await amContext.Users.FirstOrDefaultAsync(x => x.UserId == userId);
                if (user != null)
                {
                    return await CreateToken(new UserDto
                    {
                        UserId = user.UserId,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.EmailId,
                        RoleId = user.RoleId
                    });
                }
                else
                {
                    return new BaseResponseDto<TokenDto> { Status = false, Message = new List<string> { "User Not Found" } };
                }

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
