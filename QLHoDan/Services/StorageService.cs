﻿using Microsoft.Extensions.FileProviders;
using System.Diagnostics.CodeAnalysis;

namespace QLHoDan.Services
{
    /// <summary>
    /// Nội dung tệp tin
    /// </summary>
    public class FileContent
    {
        public Stream Stream { get; set; }
        public string ContentType { get; set; }
    }
    /// <summary>
    /// Service phụ trách lưu trữ tài nguyên dạng tệp tin
    /// </summary>
    public class StorageService
    {
        static readonly string imgFolder = "static/img/";
        /// <summary>
        /// Lưu ảnh vào trong ổ cứng, trả về id để sau này có thể truy cập và lấy bức ảnh về
        /// </summary>
        /// <param name="file">IFormFile chứa nội dung bức hình</param>
        /// <returns>
        /// Nếu file <b>không phải ảnh</b> thì trả về null. <br/>
        /// Nếu file là file ảnh thì sẽ trả về id để sau này có thể truy cập và lấy bức ảnh về.
        /// </returns>
        public async Task<string?> SaveImage([NotNull]IFormFile file, string fileNameWithoutExtension = null)
        {
            if(fileNameWithoutExtension == null)
            {
                fileNameWithoutExtension = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
            }
            var ext = file.ContentType.Substring(file.ContentType.LastIndexOf('/') + 1);
            if (ext != "png" && ext != "jpeg") return null;
            fileNameWithoutExtension += "." + ext;
            using (Stream fileStream = File.Open(imgFolder + fileNameWithoutExtension, FileMode.OpenOrCreate))
            {
                Stream stream = file.OpenReadStream();
                stream.Seek(0, SeekOrigin.Begin);
                await stream.CopyToAsync(fileStream);
                stream.Close();
            }
            return fileNameWithoutExtension;
        }
        /// <summary>
        /// Lấy nội dung bức ảnh từ ổ cứng
        /// </summary>
        /// <param name="id">id của bức ảnh muốn lấy về</param>
        /// <returns>Stream chứa nội dung bức hình. Nhớ tự đóng stream sau khi sử dụng.</returns>
        public FileContent? GetImage(string id)
        {
            string path = Path.Combine(imgFolder, id);
            if (File.Exists(path))
            {
                return new FileContent()
                {
                    Stream = File.OpenRead(path),
                    ContentType = "image/" + id.Substring(id.LastIndexOf('.') + 1)
                };
            }
            return null;
        }
        /// <summary>
        /// Xoá ảnh trên ổ cứng
        /// </summary>
        /// <param name="id">id của bức ảnh muốn xoá</param>
        /// <returns>Thành công hay không.</returns>
        public bool RemoveImage(string id)
        {
            string path = Path.Combine(imgFolder, id);
            if (File.Exists(path))
            {
                File.Delete(path);
                return true;
            }
            return false;
        }
    }
}
