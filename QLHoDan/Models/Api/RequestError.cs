using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace QLHoDan.Models.Api
{
    public class RequestError
    {
        public RequestError() { }
        public RequestError(string msg) {
            Code = "Unknown";
            Description = msg;
        }
        public RequestError(string code, string msg)
        {
            Code = code;
            Description = msg;
        }
        public string Code { get; set; }
        public string Description { get; set; }
        public static RequestError[]? FromModelState(ModelStateDictionary ModelState)
        {
            IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);

            return allErrors
                .Select(v => new RequestError { 
                    Code = "ModelSate_", 
                    Description = v.ErrorMessage 
                })
                .ToArray();
        }
        public static RequestError[]? FromIdentityError(IEnumerable<IdentityError> identityErrors)
        {
            return identityErrors
                .Select(v => new RequestError
                {
                    Code = "IdS_" + v.Code,
                    Description = v.Description
                })
                .ToArray();
        }
        public static RequestError[]? FromMsg(params string[] msgs)
        {
            return msgs
                .Select(v => new RequestError(v))
                .ToArray();
        }
    }
}
