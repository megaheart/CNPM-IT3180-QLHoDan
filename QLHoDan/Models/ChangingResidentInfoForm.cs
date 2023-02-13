
using System;

namespace QLHoDan.Models
{
	public class ChangingResidentInfoForm
	{
        public int Id { set; get; } // id
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
        public Resident Resident { set; get; } // CMND/CCCD, số giấy khai sinh
        public string? AcademicLevel { set; get; } // trình độ học vấn
        public string? CriminalRecord { set; get; } //Tiền án
        public string Reason { set; get; } //Lý do thay đổi
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public bool NotAcceptedReason { set; get; } // Đã duyệt chưa
        public string Account { set; get; } // Username tài khoản hộ dân gửi 
        public int AccountScope { set; get; } // scope của tài khoản người gửi
    }

}