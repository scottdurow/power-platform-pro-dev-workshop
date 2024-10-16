using Swashbuckle.AspNetCore.Annotations;

namespace WeatherForecast
{
    public class ForecastResponse
    {
        [SwaggerSchema(Description = "The weather forecast")]
        public WeatherForecast[] WeatherForecast { get; set; }
    }

    public class WeatherForecast
    {
        [SwaggerSchema(Format = "date", Description = "The date of the forecast")]
        public DateTime Date { get; set; }

        [SwaggerSchema(Description = "The temperature in Celsius")]
        public int TemperatureC { get; set; }

        //public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        [SwaggerSchema(Description = "A summary of the weather conditions")]
        public string? Summary { get; set; }
    }
}
