using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Data.Classes;
using webapi.Data;
using static webapi.Services.Authorization;
using System.Text.Json;

namespace webapi.Controllers
{
    [Route("api/votes")]
    [ApiController]
    public class Votes : ControllerBase
    {
        private DataEngine<GameListing> gameListingEngine;
        private DataEngine<GameVote> gameVoteEngine;

        public Votes(DataEngine<GameListing> _gameListingEngine, DataEngine<GameVote> _gameVoteEngine)
        {
            gameListingEngine = _gameListingEngine;
            gameVoteEngine = _gameVoteEngine;
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] int gameId)
        {
            gameVoteEngine.Search(x => x.GameListingId == gameId,out var votes);

            var positive = votes.Count(x => x.Positive);

            return Ok(new { positive = positive, negative = votes.Length - positive });
        }

        [RequireAuthAttr(AuthLevel.User)]
        [HttpGet("votefor")]
        public async Task<IActionResult> Update([FromQuery] int gameId, [FromQuery] bool positive)
        {
            User u = (User)Request.HttpContext.Items["user"];

            if (gameListingEngine.Get(gameId, out var game))
            {
                gameVoteEngine.Search(x => x.UserId == u.Id && x.GameListingId == gameId, out var results);
                if (results.Length>0)
                {
                    var v = results[0];
                    v.Positive = positive;
                    v.CreatedAt = DateTime.UtcNow;
                    gameVoteEngine.Update(v);
                }
                else
                {
                    gameVoteEngine.Add(new GameVote() { GameListingId = gameId, UserId = u.Id, Positive = positive });
                }

                return Ok(new { success = true, message = "Voted!" });
            }
            return Ok(new { success = false, message = "Vote Failed" });
        }
    }
}
