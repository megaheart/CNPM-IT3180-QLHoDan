using System;
using System.Collections.Generic;
namespace QLHoDan.Models
{


	public class RewardCeremony
	{

		public int Id { get; set; }
        //Tên đợt thưởng
        public string Title { get; set; }
        //Ngày giờ phút giây chủ tịch đề xuất kế hoạch phát thưởng
        public DateTime Time { get; set; }
        //(TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu)
        public string Type { get; set; }
        //Tổng tiền cho việc phát thưởng
        public double TotalValue{set;get;}
        //Bảng chuyển đổi loại thành tích thành giá trị phần thưởng
        //Lưu ý: Nếu như đợt phát thưởng là phát thưởng trung thu, ta có thể
        //dụng thủ thuật để tái sử dụng bảng chuyển đổi thành tích bằng cách
        //cho tất cả những đứa trẻ đều có thành tích là 0, bảng chuyển đổi
        //thành tích sẽ chuyển đổi từ 0 sang giá trị phần quà mà các em được
        //nhận trong dịp đó
        public List<AchievementRewardPair> AchievementRewardPairs { set; get; } = new List<AchievementRewardPair>();
        //Chủ tịch phường đã duyệt danh sách phát thưởng chưa
        public bool IsAccepted { set;get;}
        //Đã phát thưởng chưa
        public bool IsDone { set;get;}
        //-	Ngày đóng nhận form minh chứng
        public DateTime ClosingFormDate{set;get; }
        //-	Thời gian nhận thưởng
        public DateTime RewardDate { set; get; }
    }
}
