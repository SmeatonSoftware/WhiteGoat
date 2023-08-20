using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Data.Classes;
using webapi.Data;
using static webapi.Services.Authorization;
using System.Text.Json;

namespace webapi.Controllers
{
    [Route("api/games")]
    [ApiController]
    public class Games : ControllerBase
    {
        private DataEngine<GameListing>? gameListingEngine;

        public Games(DataEngine<GameListing> _gameListingEngine)
        {
            gameListingEngine = _gameListingEngine;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string? query=null, [FromQuery] GameType gameType=0)
        {
            query = query ?? string.Empty;

            string[] queryBlocks = query.Split(',', ' ');
            //gameListingEngine.Search(x => x.GameType == gameType && queryBlocks.Any(y => x.Title.Contains(y) || x.Tags.Contains(y)), out var results);
            gameListingEngine.Search(x => x.GameType == gameType && (x.Title.Contains(query) || x.Tags.Contains(query)), out var results);

            return Ok(results);
        }

        [RequireAuthAttr(AuthLevel.Admin)]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody]GameListing game)
        {
            User u = (User)Request.HttpContext.Items["user"];

            game.SetDefaults(u);

            gameListingEngine.Add(game);

            return Ok(game);
        }

        [RequireAuthAttr(AuthLevel.Admin)]
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] GameListing game)
        {
            User u = (User)Request.HttpContext.Items["user"];

            gameListingEngine.Update(game);

            return Ok(game);
        }
    }
}
