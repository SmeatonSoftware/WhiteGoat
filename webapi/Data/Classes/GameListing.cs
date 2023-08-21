namespace webapi.Data.Classes
{
    public enum ListingState
    {
        Idea,
        Design,
        Testing,
        PrintRelease,
        QualityRelease
    }

    public enum GameType
    {
        BoardGame,
        VideoGame
    }

    public class PrintRelease : DataClass
    {
        public string DownloadURL { get; set; }
        public int PrintPages { get; set; }
        public int MainRevision { get; set; }
        public int SubRevision { get; set; }
        public int GameListingId { get; set; }
    }

    public class QualityRelease : DataClass
    {
        public int GameListingId { get; set; }
    }

    public class GameListing : DataClass
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public string ImageURLs { get; set; }
        public string Developers { get; set; }
        public string Tags { get; set; }
        public ListingState State { get; set; }
        public GameType GameType { get; set;}
        public bool Visible { get; set; }
        public int CreatorUserId { get; set; }

        public void SetDefaults(User u)
        {
            Id = 0;
            CreatorUserId = u.Id;
        }
    }

    public class GameVote : DataClass
    {
        public int GameListingId { get; set; }
        public int UserId { get; set; }
        public bool Positive { get; set; }
    }
}
