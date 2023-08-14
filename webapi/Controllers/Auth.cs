using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Auth : ControllerBase
    {
        private DataEngine<User> userData;

        public Auth(DataEngine<User> _userData)
        {
            userData = _userData;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromQuery] string email, [FromQuery] string password)
        {
            if (userData.TryFind(x => x.Email == email, out _))
                return Problem("Email In Use!",statusCode: 409);

            var u = new User(email, password);

            userData.Add(u);

            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromQuery] string email, [FromQuery] string password)
        {
            if (userData.TryFind(x => x.Email == email, out var u))
            {
                if (Hashing.Match(password+u.PwordSalt,u.HashedPassword))
                {
                    return Ok();
                }
            }

            return Problem("Account Details Wrong", statusCode: 401);
        }
    }
}
