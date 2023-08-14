namespace webapi.Services
{
    public class Salt
    {
        private static readonly Random rnd = new Random((int)DateTime.Now.Ticks % int.MaxValue);

        private static readonly char[] saltChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv0123456789".ToCharArray();


        public static string GenerateSalt(int length = 32)
        {
            string s = "";
            for (int i = 0; i < length; i++) s += saltChars[rnd.Next(0, saltChars.Length)];
            return s;
        }

    }
}
