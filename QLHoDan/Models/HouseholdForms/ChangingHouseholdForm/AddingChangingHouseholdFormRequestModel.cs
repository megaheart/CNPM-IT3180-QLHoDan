using QLHoDan.Models.HouseholdsAndResidents.HouseholdApi;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;

namespace QLHoDan.Models.HouseholdForms.ChangingHouseholdForm
{
    public class AddingChangingHouseholdFormRequestModel
    {
        public string ResidentIdCode { set; get; }
        public string NewHouseholdId { set; get; } // Số hộ khẩu
    }
}
