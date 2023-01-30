namespace QLHoDan.Models.HouseholdApi
{
    public class UpdateHouseholdRequestModel
    {
        public string HouseholdId { set; get; } // số hộ khẩu
        public QLHoDan.Models.ResidentApi.ResidentInfo[]? NonExistMembers { set; get; } // Danh sách nhân khẩu của hộ khẩu mà họ chưa từng tồn tại trong CSDL
        //public string[] ExistMemberIds { set; get; } // Danh sách nhân khẩu của hộ khẩu mà họ đã có trong CSDL
        public string? Address { set; get; } //Địa chỉ thường trú
        public int? Scope { set; get; } //Số tổ phụ trách
        public string? MoveOutPlace { set; get; } // Nơi chuyển đi
        public DateTime? MoveOutDate { set; get; } //  ngày chuyển đi
        public string? MoveOutReason { set; get; } // lý do chuyển đi
    }
}
