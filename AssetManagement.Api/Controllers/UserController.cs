using AssetManagement.Model;
using AssetManagement.Repository;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagement.Api.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly IEncriptDecriptRepository _encriptDecriptRepository;
        private readonly IUserRepository _userRepository;

        public UserController(IEncriptDecriptRepository encriptDecriptRepository, IUserRepository userRepository)
        {
            _encriptDecriptRepository = encriptDecriptRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetEncriptedString(string word)
        {
            try
            {
                var Result = _encriptDecriptRepository.EncryptData(word);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        public IActionResult GetDecriptedString(string word)
        {
            try
            {
                var Result = _encriptDecriptRepository.DecryptData(word);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
        [HttpGet]
        [ApiKeyAuthorization]
        public async Task<IActionResult> Login(string email, string password)
        {
            try
            {
                var Result = await _userRepository.Login(email, password);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }

        [HttpPost]
        [ApiKeyAuthorization]
        public async Task<IActionResult> CreateToken(UserDto user)
        {
            try
            {
                var Result = await _userRepository.CreateToken(user);
                return new OkObjectResult(Result);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
    }
}
