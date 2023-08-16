using System.Text.Json.Serialization;
using webapi.Services;
using static webapi.Services.Authorization;

namespace webapi.Data.Classes
{

    public class User : DataClass
    {
        public string Email { get; set; }
        [JsonIgnore]
        public string HashedPassword { get; set; }
        [JsonIgnore]
        public string PwordSalt { get; set; }

        public AuthLevel authLevel { get; set; }

        public User() { }

        public User(string email, string password)
        {
            Email = email;
            PwordSalt = Salt.GenerateSalt();
            HashedPassword = Hashing.Hash(password + PwordSalt);
            authLevel = AuthLevel.User;
        }
    }
}
