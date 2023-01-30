namespace QLHoDan.Models.HouseholdApi
{
    public class HouseholdDetail
    {
        public string HouseholdId { set; get; } // Số hộ khẩu
        public string Address { set; get; } //Địa chỉ thường trú
        public int Scope { set; get; } //Số tổ phụ trách
        public string[] MemberIdCodes { set; get; } // Danh sách nhân khẩu của hộ khẩu
        public DateTime CreatedTime { set; get; }
        public string? MoveOutPlace { set; get; } // Nơi chuyển đi
        public DateTime? MoveOutDate { set; get; } //  ngày chuyển đi
        public string? MoveOutReason { set; get; } // lý do chuyển đi
    }
}
