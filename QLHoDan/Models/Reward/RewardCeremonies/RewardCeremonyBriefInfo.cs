namespace QLHoDan.Models.Reward.RewardCeremonies
{
    public class RewardCeremonyBriefInfo
    {
        public int Id { get; set; }
        //Tên đợt thưởng
        public string Title { get; set; }
        //Ngày giờ phút giây chủ tịch đề xuất kế hoạch phát thưởng
        public DateTime Time { get; set; }
        //(TTHT – phát thưởng cho thành tích học tập, TT – phát thưởng trung thu)
        public string Type { get; set; }
        //Tổng tiền cho việc phát thưởng
        public double TotalValue { set; get; }
        //Chủ tịch phường đã duyệt danh sách phát thưởng chưa
        public bool IsAccepted { set; get; }
        //Đã phát thưởng chưa
        public bool IsDone { set; get; }
        //-	Ngày đóng nhận form minh chứng
        public DateTime ClosingFormDate { set; get; }
        //-	Thời gian nhận thưởng
        public DateTime RewardDate { set; get; }
    }
}
