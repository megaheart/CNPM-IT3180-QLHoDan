namespace QLHoDan.Models.HouseholdsAndResidents.HouseholdApi
{
    public class HouseholdBriefInfo
    {
        public string HouseholdId { set; get; } // Số hộ khẩu
        public int Scope { set; get; } //Số tổ phụ trách
        public string OwnerFullName { set; get; } // Họ và tên chủ hộ
        public string OwnerIDCode { set; get; } // cmnd của chủ hộ
    }
}
