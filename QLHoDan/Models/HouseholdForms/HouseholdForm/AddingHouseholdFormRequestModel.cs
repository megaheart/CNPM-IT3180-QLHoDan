namespace QLHoDan.Models.HouseholdForms.HouseholdForm
{
    public class AddingHouseholdFormRequestModel
    {
        public string HouseholdId { set; get; } // Số hộ khẩu
        public string Address { set; get; } // địa chỉ thường trú
        public string Members { set; get; }// Danh sách ResidentForm của tất cả các thành viên
        public int Scope { set; get; } // Tổ Phụ Trách
        public IFormFileCollection Images { set; get; }// danh sách Ảnh minh chứng
    }
    public class AddingResidentFormRequestModel
    {
        public string FullName { set; get; } // Họ và tên (fullName)
        public string Alias { set; get; } // Bí danh (alias)
        public DateTime DateOfBirth { set; get; } // Ngày tháng năm sinh (dateOfBirth)
        public bool IsMale { set; get; } //Giới tính
        public string BirthPlace { set; get; } // Nơi sinh
        public string NativeLand { set; get; } // Nguyên quán
        public string Ethnic { set; get; } // Dân tộc
        public string Nation { set; get; } // Quốc tịch
        public string Job { set; get; } // Nghề nghiệp
        public string Workplace { set; get; } // Nơi làm việc
        public string IdentityCode { set; get; } // CMND/CCCD, số giấy khai sinh
        public string RelationShip { set; get; } // Quan hệ với chủ hộ
        public string AcademicLevel { set; get; } // trình độ học vấn
        public string CriminalRecord { set; get; } //Tiền án
        public DateTime MoveInDate { set; get; } //  ngày chuyển đến
        public string MoveInReason { set; get; } // lý do chuyển đến

    }
}
