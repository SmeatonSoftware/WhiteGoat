using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.Data.Classes;
using webapi.Data;
using static webapi.Services.Authorization;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Localization;

namespace webapi.Controllers
{
    [Route("api/prints")]
    [ApiController]
    public class Prints : ControllerBase
    {
        private DataEngine<GameListing> gameListingEngine;
        private DataEngine<PrintRelease> printReleaseEngine;

        public Prints(DataEngine<GameListing> _gameListingEngine, DataEngine<PrintRelease> _printReleaseEngine)
        {
            gameListingEngine = _gameListingEngine;
            printReleaseEngine = _printReleaseEngine;
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get([FromQuery] int gameId)
        {
            printReleaseEngine.Search(x => x.GameListingId == gameId,out var prints);

            prints = prints.OrderByDescending(x => x.MainRevision).ThenByDescending(x=>x.SubRevision).ToArray();

            return Ok(prints);
        }

        [RequireAuthAttr(AuthLevel.Admin)]
        [HttpPost("createorupdate")]
        public async Task<IActionResult> Update([FromBody] PrintRelease print)
        {
            User u = (User)Request.HttpContext.Items["user"];

            if (gameListingEngine.Get(print.GameListingId, out var game))
            {
                printReleaseEngine.Search(x => x.MainRevision == print.MainRevision && x.SubRevision == print.SubRevision, out var results);
                if (results.Length>0)
                {
                    var v = results[0];
                    print.Id = v.Id;
                    print.CreatorUserId = v.CreatorUserId;
                    printReleaseEngine.Update(print);
                }
                else
                {
                    print.SetDefaults(u);
                    printReleaseEngine.Add(print);
                }

                return Ok(new { success = true, message = "Voted!" });
            }
            return Ok(new { success = false, message = "Vote Failed" });
        }
    }
}
