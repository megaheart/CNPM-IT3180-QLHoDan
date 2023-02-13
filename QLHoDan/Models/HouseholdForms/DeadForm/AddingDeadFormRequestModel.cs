namespace QLHoDan.Models.HouseholdForms
{
    public class AddingDeadFormRequestModel
    {
        public string ResidentIdCode {set; get; }
        public IFormFileCollection Images { set; get; }// danh sách Ảnh minh chứng
    }
}