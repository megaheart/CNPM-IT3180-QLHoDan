namespace QLHoDan.Models.HouseholdForms
{
    public class AddingMovingOutFormRequestModel
    {
        public string ResidentIdCode {set; get; }
        public string MoveOutPlace { set; get; } // Nơi chuyển đi
        public DateTime MoveOutDate { set; get; } //  ngày chuyển đi
        public string MoveOutReason { set; get; } // lý do chuyển đi
    }
}