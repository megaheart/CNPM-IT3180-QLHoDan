namespace QLHoDan.Models
{

    public class ChangingHouseholdForm
    {
        public int Id { set; get; }
        public Resident Resident { set; get; }

        public Household NewHousehold { set; get; }
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public bool NotAcceptedReason { set; get; } // Đã duyệt chưa
        public string Account { set; get; } // Username tài khoản hộ dân gửi 
    }

}
