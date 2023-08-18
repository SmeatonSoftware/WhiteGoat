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
        private DataEngine<Session> sessionData;

        public Auth(DataEngine<User> _userData, DataEngine<Session> _sessionData)
        {
            userData = _userData;
            sessionData = _sessionData;
        }

        private static bool IsStrongPassword(string pword)
        {
            return pword.Length>5;
        }

        [HttpGet("logout")]
        public async Task<IActionResult> logout()
        {
            int sid;
            string key;
            if (Request.Headers.Origin[0].Contains("localhost"))
            {
                if (!Request.Headers.TryGetValue("sid", out var _sid) || !Request.Headers.TryGetValue("key", out var _key))
                    return Problem("Missing Auth Headers", statusCode: 401);

                sid = int.Parse(_sid[0]);
                key = _key[0];
            }
            else
            {
                if (!Request.Cookies.TryGetValue("sid", out var _sid) || !Request.Cookies.TryGetValue("key", out var _key))
                    return Problem("Missing Auth Headers", statusCode: 401);

                sid = int.Parse(_sid);
                key = _key;
            }

            if (!sessionData.Get(sid, out var s))
                return Problem("Invalid Session Id", statusCode: 401);

            if (!Hashing.Match(key, s.HashedKey))
                return Problem("Invalid Session Key", statusCode: 401);

            sessionData.Remove(s.Id);

            return Ok();
        }

        [HttpGet("check")]
        public async Task<IActionResult> Check()
        {
            int sid;
            string key;
            if ((Request.Headers.TryGetValue("Host", out var _host) && _host[0].Contains("localhost"))
                || (Request.Headers.TryGetValue("Origin", out var _origin) && _origin[0].Contains("localhost"))) 
            { 
                if (!Request.Headers.TryGetValue("sid", out var _sid) || !Request.Headers.TryGetValue("key", out var _key))
                    return Problem("Missing Auth Headers", statusCode: 401);

                sid = int.Parse(_sid[0]);
                key = _key[0];
            }
            else
            {
                if (!Request.Cookies.TryGetValue("sid", out var _sid) || !Request.Cookies.TryGetValue("key", out var _key))
                    return Problem("Missing Auth Headers", statusCode: 401);

                sid = int.Parse(_sid);
                key = _key;
            }

            if (!sessionData.Get(sid, out var s))
                return Problem("Invalid Session Id", statusCode: 401);

            if (!Hashing.Match(key, s.HashedKey))
                return Problem("Invalid Session Key", statusCode: 401);

            userData.Get(s.UserId, out var u);

            return Ok(u);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromQuery] string email, [FromQuery] string password)
        {
            if (email.Length<5 || !IsStrongPassword(password))
                return Problem("Email Is Invalid Or Password Is Weak", statusCode: 409);

            if (userData.TryFind(x => x.Email == email, out _))
                return Problem("Email In Use!",statusCode: 409);

            var u = new User(email, password);

            userData.Add(u);

            return Ok(new { message = "Account Created" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromQuery] string email, [FromQuery] string password)
        {
            if (userData.TryFind(x => x.Email == email, out var u))
            {
                if (Hashing.Match(password+u.PwordSalt,u.HashedPassword))
                {
                    var sessionKey = Salt.GenerateSalt(64);

                    Session s;

                    if (sessionData.TryFind(x => x.UserId == u.Id, out s))
                    {
                        s.SetKey(sessionKey);
                        sessionData.Update(s);
                    }
                    else
                    {
                        s = new Session(u.Id, sessionKey);
                        sessionData.Add(s);
                    }

                    Response.Cookies.Append("sid", s.Id.ToString());
                    Response.Cookies.Append("key", sessionKey);

                    if (Request.Headers.Origin[0].Contains("localhost"))
                    {
                        return Ok(new { sid = s.Id, key = sessionKey });
                    }

                    return Ok(new { message = "Login Completed" });
                }
            }

            return Problem("Account Details Wrong", statusCode: 401);
        }
    }
}
