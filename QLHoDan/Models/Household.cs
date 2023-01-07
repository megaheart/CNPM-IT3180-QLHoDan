namespace QLHoDan.Models
{
	public class Household
	{
		public string HouseholdId{ set; get; } // Số hộ khẩu
		public string Address { set; get; } //Địa chỉ thường trú
		public int Scope{ set; get; } //Số tổ phụ trách
		public List<Resident> Members{ set; get; } // Danh sách nhân khẩu của hộ khẩu
		public DateTime CreatedTime{ set; get; }
        public string? MoveOutPlace { set; get; } // Nơi chuyển đi
        public DateTime? MoveOutDate { set; get; } //  ngày chuyển đi
        public string? MoveOutReason { set; get; } // lý do chuyển đi
        public bool IsManaged { set; get; } // Có còn quản lý nữa hay không

    }
}
