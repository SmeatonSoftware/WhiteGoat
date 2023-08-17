using LiteDB;
using webapi.Data.Classes;

namespace webapi.Data
{
    public static class DataEngineMangment
    {
        public static DataEngine<User>? userEngine;
        public static DataEngine<Session>? sessionEngine;

        public static DataEngine<GameListing>? gameListingEngine;
        public static DataEngine<GameVote>? gameVoteEngine;
        public static DataEngine<PrintRelease>? printReleaseEngine;
        public static DataEngine<QualityRelease>? qualityReleaseEngine;

        public static LiteDatabase db;

        public static void Init(WebApplicationBuilder builder)
        {
            db = new LiteDatabase("./database.db");

            userEngine = new DataEngine<User>(db.GetCollection<User>("users"));
            builder.Services.AddSingleton(userEngine);

            sessionEngine = new DataEngine<Session>(db.GetCollection<Session>("sessions"));
            builder.Services.AddSingleton(sessionEngine);

            //Game Lisitings

            gameListingEngine = new DataEngine<GameListing>(db.GetCollection<GameListing>("games"));
            builder.Services.AddSingleton(gameListingEngine);

            gameVoteEngine = new DataEngine<GameVote>(db.GetCollection<GameVote>("votes"));
            builder.Services.AddSingleton(gameVoteEngine);

            printReleaseEngine = new DataEngine<PrintRelease>(db.GetCollection<PrintRelease>("printReleases"));
            builder.Services.AddSingleton(printReleaseEngine);

            qualityReleaseEngine = new DataEngine<QualityRelease>(db.GetCollection<QualityRelease>("qualityReleases"));
            builder.Services.AddSingleton(qualityReleaseEngine);
        }
    }
}
