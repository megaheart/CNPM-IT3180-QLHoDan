using System;
using System.Collections.Generic;

namespace QLHoDan.Models
{
	public class SplitingHouseholdForm
	{
		public int Id{set;get;} // id
		//public List<Resident> Residents { set;get;} // CMND/CCCD của những thành viên xin tách ra
		public string Address {set;get;} 
		public Resident Owner {set;get;} // CMND/CCCD của người sẽ trở thành chủ hộ
        public int Scope {set;get;} // Tổ phụ trách

		public string Account{set;get;} // Username tài khoản người gửi (chính là số CMND luôn)
        public DateTime CreatedTime { set; get; }
        public bool IsAccepted { set; get; } // Đã duyệt chưa
        public bool NotAcceptedReason { set; get; } // Đã duyệt chưa



    }

}
