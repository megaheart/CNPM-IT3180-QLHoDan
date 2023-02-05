namespace QLHoDan.Models.HouseholdsAndResidents.ResidentApi
{
    public class ResidentDetail
    {
        public string FullName { set; get; } // Họ và tên (fullName)


        public string Alias { set; get; } // Bí danh (alias)

        public DateTime DateOfBirth { set; get; } // Ngày tháng năm sinh (dateOfBirth)
        public bool IsMale { set; get; }//Giới tính
        public string BirthPlace { set; get; } // Nơi sinh
        public string NativeLand { set; get; } // Nguyên quán
        public string Ethnic { set; get; } // Dân tộc
        public string Nation { set; get; } // Quốc tịch
        public string Job { set; get; } // Nghề nghiệp
        public string Workplace { set; get; } // Nơi làm việc
                                              //public List<string> arrayOfPlaceHistory{set;get;} // Lịch sử địa chỉ thường trú
                                              //public List<DateTime> arrayOfTimeHistory{set;get;} // Lịch sử ngày bắt đầu thường trú tại đấy

        public string IdentityCode { set; get; } // CMND/CCCD, ko có thì là mã khai sinh
        public DateTime? IDCardDate { set; get; } // cmnd ngày cấp,
        public string? IDCardPlace { set; get; } // cmnd nơi cấp
        public string RelationShip { set; get; } // Quan hệ với chủ hộ (Nếu là chủ hộ thì quan hệ với chủ hộ đặt là Chủ hộ)
        public bool IsManaged { set; get; } // Có còn quản lý nữa hay không (Nếu đã chết, hay chuyển đi nơi khác thì không cần quản lý nữa -> thuộc tính đặt về false)
        public bool IsDead { set; get; } // Đã đăng xuất hay chưa
        public string? MoveOutPlace { set; get; } // Nơi chuyển đi
        public DateTime? MoveOutDate { set; get; } //  ngày chuyển đi
        public string? MoveOutReason { set; get; } // lý do chuyển đi
        public string AcademicLevel { set; get; } // trình độ học vấn
        public string CriminalRecord { set; get; } //Tiền án
        public DateTime MoveInDate { set; get; } //  ngày chuyển đến
        public string MoveInReason { set; get; } // lý do chuyển đến
        public int Scope { set; get; } // tổ quản lý
        public string? HouseholdId
        {
            set; get;
        }
    }
}
