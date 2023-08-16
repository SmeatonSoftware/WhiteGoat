using webapi.Data;
using webapi.Data.Classes;
using webapi.Services;

namespace webapi
{
    public class Program
    {
        

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "_myAllowSpecificOrigins",
                                  builder =>
                                  {
                                      builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                                  });
            });

            DataEngineMangment.Init(builder);

            var app = builder.Build();

            app.Use(async (context, next) => await Authorization.CheckAuth(context,next));

            app.UseCors("_myAllowSpecificOrigins");

            app.MapControllers();

            app.Run();
        }
    }
}