using Microsoft.Extensions.FileProviders;
using System.Diagnostics.CodeAnalysis;

namespace QLHoDan.Services
{
    public class FileContent
    {
        public Stream Stream { get; set; }
        public string ContentType { get; set; }
    }
    public class Storage
    {
        static readonly string imgFolder = "static/img/";
        /// <summary>
        /// Lưu ảnh vào trong ổ cứng, trả về id để sau này có thể truy cập và lấy bức ảnh về
        /// </summary>
        /// <param name="stream">Stream chứa nội dung bức hình</param>
        /// <returns>id để sau này có thể truy cập và lấy bức ảnh về</returns>
        public async Task<string> SaveImage([NotNull]IFormFile file, string fileNameWithoutExtension = null)
        {
            if(fileNameWithoutExtension == null)
            {
                fileNameWithoutExtension = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString();
            }
            fileNameWithoutExtension += "." + file.ContentType.Substring(file.ContentType.LastIndexOf('/') + 1);
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
    }
}
