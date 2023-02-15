﻿namespace QLHoDan.Models.AccountApi
{
    public class ProfileResponseModel
    {
        /// <summary>
        /// Is your account exist in application?
        /// </summary>
        public string? FullName { get; set; }
        public int? Scope { get; set; }
        public string? AvatarLink { get; set; }
        public string? WallpaperLink { get; set; }
    }
}
