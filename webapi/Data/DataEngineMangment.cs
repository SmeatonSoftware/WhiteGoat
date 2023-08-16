using LiteDB;
using webapi.Data.Classes;

namespace webapi.Data
{
    public static class DataEngineMangment
    {
        public static DataEngine<User>? userEngine;
        public static DataEngine<Session>? sessionEngine;

        public static LiteDatabase db;

        public static void Init(WebApplicationBuilder builder)
        {
            db = new LiteDatabase("./database.db");

            userEngine = new DataEngine<User>(db.GetCollection<User>("users"));
            builder.Services.AddSingleton(userEngine);

            sessionEngine = new DataEngine<Session>(db.GetCollection<Session>("sessions"));
            builder.Services.AddSingleton(sessionEngine);
        }
    }
}
