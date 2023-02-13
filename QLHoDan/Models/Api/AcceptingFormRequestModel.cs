namespace QLHoDan.Models.Api
{
    public class AcceptingFormRequestModel
    {
        public bool Accept { get; set; } //Có chấp nhận không hay là từ chối
        public string? NotAcceptReason { get; set; } //Lý do từ chối, bắt buộc phải có nếu như từ chối
    }
}
