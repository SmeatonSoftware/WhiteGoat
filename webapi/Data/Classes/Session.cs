using webapi.Services;

namespace webapi.Data.Classes
{
    public class Session : DataClass
    {
        public int UserId { get; set; }
        public string HashedKey { get; set; }

        public Session() { }

        public Session(int userId, string key)
        {
            UserId = userId;
            HashedKey = Hashing.Hash(key);
        }
    }
}
