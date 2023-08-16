namespace webapi.Data.Classes
{
    public enum ListingState
    {
        Idea,
        Design,
        Testing,
        Release
    }

    public class GameListing : DataClass
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public string PrimaryImageURL { get; set; }
        public string Tags { get; set; }
        public ListingState State { get; set; }
    }

    public class GameVote : DataClass
    {
        public int GameListingId { get; set; }
        public int UserId { get; set; }
    }
}
