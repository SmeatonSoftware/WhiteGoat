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
        public string PrimaryImageURL { get; set; }
        public string Developers { get; set; }
        public string Tags { get; set; }
        public ListingState State { get; set; }
    }

    public class GameVote : DataClass
    {
        public int GameListingId { get; set; }
        public int UserId { get; set; }
    }
}
