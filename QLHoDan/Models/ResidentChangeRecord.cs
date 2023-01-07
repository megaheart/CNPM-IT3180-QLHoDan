using System;

namespace QLHoDan.Models
{
	public class ResidentChangeRecord
	{
		public int Id{set;get;}
		public DateTime CreatedTime{set;get;} // Ngày, giờ xảy ra
		public enum ResidentChangeType
        {
			Chuyendi,
			Doichuho,
			Doinhankhau,
			Tamvang,
			Tamtru
		}
        // Dạng thay đổi (ChangeType): Chuyển đi, Đổi chủ hộ, Đổi hộ khẩu, Tạm vắng, Tạm trú, …
		// (sau này có thể bổ sung thêm những loại thay đổi khác)
        public ResidentChangeType ChangeType {set;get;}
        // CMND/CCCD của đối tượng thay đổi
        public Resident Resident { set;get;} 
        // Nội dung thay đổi
        public string Content{set;get;}
        // ID của cái form được hộ dân gửi lên để yêu cầu thay đổi
        // và đã được duyệt (mình chỉ cần lưu thông tin ID thôi vì loại
        // form đã có trường khác lưu trữ)                                               
        public string FormId{set;get;} 

	}

}
