namespace QLHoDan.Models.AccountApi
{
    public class SpecialAccountResponseModel
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int Scope { get; set; }
        public int Role { get; set; }
        public string? Note { get; set; }
    }
}
