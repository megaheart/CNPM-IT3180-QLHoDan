using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/forms")]
    [ApiController]
    public class FormsController : ControllerBase
    {
        // GET: api/<FormController>
        [HttpGet("form2")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value3", "value4" };
        }

    }
}
