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
    }
}
