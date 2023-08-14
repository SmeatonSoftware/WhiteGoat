using Scrypt;

namespace webapi.Services
{
    public class Hashing
    {
        private static readonly ScryptEncoder encoder = new ScryptEncoder();

        public static string Hash(string raw)
        {
            return encoder.Encode(raw);
        }

        public static bool Match(string raw, string hash)
        {
            return encoder.Compare(raw, hash);
        }
    }
}
