using Humanizer;
using QLHoDan.Models;

namespace QLHoDan.Utilities
{
    /// <summary>
    /// Tiện ích sử dụng để thao tác với form dễ dàng hơn
    /// </summary>
    public class FormHelper
    {
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(AchievementEvidenceForm f)
        {
            return $"Minh chứng thành tích {f.AchievementName} của cháu {f.Resident.FullName} cho sự kiện {f.RewardCeremony.Title}";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(ChoosingPresentsForm f)
        {
            return $"Cháu {f.Resident.FullName} gửi lựa chọn quà cho sự kiện {f.RewardCeremony.Title}";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
       public static string GetFormTitle(MovingOutForm f)
        {
            return $"Công dân {f.Resident.FullName} (CCCD: {f.Resident.IdentityCode}) gửi đơn xin chuyển đi.";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(DeadForm f)
        {
            return $"Đơn xin chứng tử cho công dân {f.Resident.FullName} (CCCD: {f.Resident.IdentityCode}).";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(ChangingResidentInfoForm f)
        {
            return $"Công dân {f.Resident.FullName} (CCCD: {f.Resident.IdentityCode}) gửi đơn xin thay đổi thông tin nhân khẩu.";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(AddingResidentForm f)
        {
            return $"Đơn xin thêm nhân khẩu cho công dân {f.NewResident.FullName} (CCCD: {f.NewResident.IdentityCode}).";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(ChangingHouseholdForm f)
        {
            return $"Đơn xin chuyển hộ khẩu cho công dân {f.Resident.FullName} (CCCD: {f.Resident.IdentityCode}).";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(ChangingHouseholdInfoForm f)
        {
            return $"Đơn xin thay đổi thông tin hộ khẩu tại {f.Household.Address} (SHK: {f.Household.HouseholdId}).";
        }
        /// <summary>
        /// Lấy tiêu đề cho form
        /// </summary>
        /// <param name="f">Form</param>
        /// <returns>tiêu đề của form</returns>
        public static string GetFormTitle(SplitingHouseholdForm f)
        {
            return $"Đơn xin tách hộ khẩu cho chủ hộ {f.Owner.FullName} (CCCD: {f.Owner.IdentityCode}).";
        }
    }
}
