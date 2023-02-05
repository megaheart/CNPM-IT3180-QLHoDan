namespace QLHoDan.Models.HouseholdsAndResidents.ResidentApi
{
    public class ResidentBriefInfo
    {
        public string IdentityCode { set; get; } // CMND/CCCD, ko có thì là mã khai sinh
        public string FullName { set; get; } // Họ và tên (fullName)
        public DateTime DateOfBirth { set; get; } // Ngày tháng năm sinh (dateOfBirth)
        public bool IsMale { set; get; }//Giới tính

        public string? HouseholdId { set; get; }
        public string RelationShip { set; get; } // Quan hệ với chủ hộ (Nếu là chủ hộ thì quan hệ với chủ hộ đặt là Chủ hộ)

        public int Scope { set; get; }//Tổ phụ trách

    }
}
