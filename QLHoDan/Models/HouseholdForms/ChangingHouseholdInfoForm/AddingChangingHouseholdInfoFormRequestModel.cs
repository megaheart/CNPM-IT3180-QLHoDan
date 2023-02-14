using QLHoDan.Models.HouseholdsAndResidents.HouseholdApi;
using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;

namespace QLHoDan.Models.HouseholdForms.ChangingHouseholdInfoForm
{
    public class AddingChangingHouseholdInfoFormRequestModel
    {
        public string HouseholdIdCode { set; get; } // Số hộ khẩu
        public string? Address { set; get; } // địa chỉ Thường trú mới
        public string OwnerIdCode { set; get; }//Chủ hộ mới
        public int? Scope { set; get; } // Tổ Phụ Trách mới
        public string Reason { set; get; } //Lý do thay đổi
    }
}
