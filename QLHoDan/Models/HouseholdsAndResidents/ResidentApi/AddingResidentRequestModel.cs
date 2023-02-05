namespace QLHoDan.Models.HouseholdsAndResidents.ResidentApi
{
    public class AddingResidentRequestModel : ResidentInfo
    {
        public int? Scope { set; get; } // tổ quản lý
        public string? HouseholdId
        {
            set; get;
        }
    }
}
