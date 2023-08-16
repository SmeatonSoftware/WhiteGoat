using webapi.Services;

namespace webapi.Data.Classes
{
    public class User : DataClass
    {
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string PwordSalt { get; set; }

        public User() { }

        public User(string email, string password)
        {
            Email = email;
            PwordSalt = Salt.GenerateSalt();
            HashedPassword = Hashing.Hash(password + PwordSalt);
        }
    }
}
