using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static webapi.Services.Authorization;

namespace webapi.Controllers
{
    [Route("api/games")]
    [ApiController]
    public class Games : ControllerBase
    {

        [RequireAuthAttr(AuthLevel.User)]
        [HttpGet("search")]
        public async Task<IActionResult> Search()
        {
            return Ok();
        }
    }
}
