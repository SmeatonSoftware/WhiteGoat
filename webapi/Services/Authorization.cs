using Microsoft.AspNetCore.Mvc;
using webapi.Data;
using webapi.Data.Classes;

namespace webapi.Services
{
    public static class Authorization
    {
        public enum AuthLevel
        {
            Guest,
            User,
            Admin
        }

        public class RequireAuthAttr : Attribute
        {
            public AuthLevel AuthLevel { get; set; }
            public RequireAuthAttr(AuthLevel authLevel = AuthLevel.Guest) { 
                this.AuthLevel = authLevel;
            }
        }

        public static AuthLevel GetAuthLevel(HttpRequest Request, out User u)
        {
            u = null;

            int sid;
            string key;
            if (Request.Headers.Origin[0].Contains("localhost"))
            {
                if (!Request.Headers.TryGetValue("sid", out var _sid) || !Request.Headers.TryGetValue("key", out var _key))
                    return AuthLevel.Guest;

                sid = int.Parse(_sid[0]);
                key = _key[0];
            }
            else
            {
                if (!Request.Cookies.TryGetValue("sid", out var _sid) || !Request.Cookies.TryGetValue("key", out var _key))
                    return AuthLevel.Guest;

                sid = int.Parse(_sid);
                key = _key;
            }

            if (!DataEngineMangment.sessionEngine.Get(sid, out var s))
                return AuthLevel.Guest;

            if (!Hashing.Match(key, s.HashedKey))
                return AuthLevel.Guest;

            DataEngineMangment.userEngine.Get(s.UserId, out u);

            return u.authLevel;
        }

        public static async Task CheckAuth(HttpContext context, RequestDelegate next)
        {
            var end = context.GetEndpoint();

            if (end != null)
            {
                var reqAuthAttr = end.Metadata.GetMetadata<RequireAuthAttr>();

                if (reqAuthAttr != null)
                {
                    var userLevel = GetAuthLevel(context.Request, out var u);

                    if (userLevel >= reqAuthAttr.AuthLevel)
                    {
                        context.Items.Add("user", u);
                        await next.Invoke(context);
                        return;
                    }
                    else
                    {
                        context.Response.StatusCode = 401;
                        await context.Response.WriteAsJsonAsync(new { message = "No Permission" });
                        return;
                    }
                }
            }

            await next.Invoke(context);
        }
    }
}
