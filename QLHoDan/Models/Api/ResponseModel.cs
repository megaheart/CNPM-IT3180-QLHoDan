namespace QLHoDan.Models.Api
{
    public class ResponseModel
    {
        /// <summary>
        /// May be null or length = 0
        /// </summary>
        public RequestError[]? Errors { get; set; }
    }
    public class ResponseModel<T>: ResponseModel
    {
        public T? Content { get; set; }
    }
}
