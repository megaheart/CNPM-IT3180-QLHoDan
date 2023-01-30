using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHoDan.Controllers.HouseholdsAndResidents
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResidentsController : ControllerBase
    {
        // GET: api/<ResidentsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ResidentsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ResidentsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ResidentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ResidentsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
