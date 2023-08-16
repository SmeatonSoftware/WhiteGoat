using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Data.Classes;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class Auth : ControllerBase
    {
        private DataEngine<User> userData;

        public Auth(DataEngine<User> _userData)
        {
            userData = _userData;
        }

        private static bool IsStrongPassword(string pword)
        {
            return pword.Length>5;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromQuery] string email, [FromQuery] string password)
        {
            if (email.Length<5 || !IsStrongPassword(password))
                return Problem("Email Is Invalid Or Password Is Weak", statusCode: 409);

            if (userData.TryFind(x => x.Email == email, out _))
                return Problem("Email In Use!",statusCode: 409);

            var u = new User(email, password);

            userData.Add(u, true);



            return Ok(new { message = "Account Created" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromQuery] string email, [FromQuery] string password)
        {
            if (userData.TryFind(x => x.Email == email, out var u))
            {
                if (Hashing.Match(password+u.PwordSalt,u.HashedPassword))
                {
                    return Ok(new { message = "Login Completed" });
                }
            }

            return Problem("Account Details Wrong", statusCode: 401);
        }
    }
}
