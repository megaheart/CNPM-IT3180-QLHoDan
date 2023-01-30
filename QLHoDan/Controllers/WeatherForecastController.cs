using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace QLHoDan.Controllers;


[Route("api/weatherforecast")]
[ApiController]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }
    //GET api/weatherforecast/forAnonymous
    [AllowAnonymous]
    //[EnableCors("DevOnly_AllowSpecificOrigins")]
    [HttpGet("forAnonymous")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
    //GET api/weatherforecast/forEveryAccount
    [Authorize]
    [HttpGet("forEveryAccount")]
    public IEnumerable<WeatherForecast> GetForEveryAccount()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
    //GET api/weatherforecast/forCommitteeChairman
    [Authorize(Roles = "CommitteeChairman")]
    [HttpGet("forCommitteeChairman")]
    public IEnumerable<WeatherForecast> GetCommitteeChairman()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
    //GET api/weatherforecast/forAccountant
    [Authorize(Roles = "Accountant")]
    [HttpGet("forAccountant")]
    public IEnumerable<WeatherForecast> GetAccountant()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
    //GET api/weatherforecast/forScopeLeader
    [Authorize(Roles = "ScopeLeader")]
    [HttpGet("forScopeLeader")]
    public IEnumerable<WeatherForecast> GetScopeLeader()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
    //GET api/weatherforecast/forCommitteeChairmanAccountant
    [Authorize(Roles = "CommitteeChairman, Accountant")]
    [HttpGet("forCommitteeChairmanAccountant")]
    public IEnumerable<WeatherForecast> GetCommitteeChairmanAccountant()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
