using webapi.Data;
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

            var ud = new DataEngine<User>();

            builder.Services.AddSingleton(ud);

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseAuthorization();

            app.UseCors("_myAllowSpecificOrigins");

            app.MapControllers();

            app.Run();
        }
    }
}