namespace QLHoDan.Models.AccountApi
{
    public class HouseholdAccountResponseModel
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int Scope { get; set; }
        public string? Note { get; set; }
    }
}
