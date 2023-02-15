using QLHoDan.Models.HouseholdsAndResidents.ResidentApi;

namespace QLHoDan.Models.HouseholdForms.ChangingResidentInfoForm
{
    public class AddingChangingResidentInfoFormRequestModel
    {
        public string? FullName { set; get; } // Họ và tên (fullName)
        public string? Alias { set; get; } // Bí danh (alias)
        public DateTime? DateOfBirth { set; get; } // Ngày tháng năm sinh (dateOfBirth)
        public bool? IsMale { set; get; } //Giới tính
        public string? BirthPlace { set; get; } // Nơi sinh
        public string? NativeLand { set; get; } // Nguyên quán
        public string? Ethnic { set; get; } // Dân tộc
        public string? Nation { set; get; } // Quốc tịch
        public string? Job { set; get; } // Nghề nghiệp
        public string? Workplace { set; get; } // Nơi làm việc
        public string ResidentIdCode { set; get; } // CMND/CCCD, số giấy khai sinh
        public string? AcademicLevel { set; get; } // trình độ học vấn
        public string? CriminalRecord { set; get; } //Tiền án
        public string Reason { set; get; } //Lý do thay đổi
    }
}
