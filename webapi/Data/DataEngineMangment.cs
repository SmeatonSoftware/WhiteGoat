using webapi.Data.Classes;

namespace webapi.Data
{
    public static class DataEngineMangment
    {
        public static DataEngine<User>? userEngine;
        public static DataEngine<Session>? sessionEngine;

        public static void Init(WebApplicationBuilder builder)
        {
            userEngine = new DataEngine<User>();
            builder.Services.AddSingleton(userEngine);

            sessionEngine = new DataEngine<Session>();
            builder.Services.AddSingleton(sessionEngine);
        }
    }
}
