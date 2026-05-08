import { Card } from "react-bootstrap";

function WeatherNow({ weather }) {
  const city = weather.name;

  const temperature = Math.round(weather.main.temp);

  const feelsLike = Math.round(weather.main.feels_like);

  const description = weather.weather[0].description;

  const icon = weather.weather[0].icon;

  const windSpeed = weather.wind.speed;

  return (
    <Card className="weather-card">
      <Card.Body>
        <div className="breadcrumb-text">Start › Italia › {city}</div>

        <h1>The Weather in {city}</h1>

        <p className="time-text">
          {new Date().toLocaleTimeString("en-EN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <div className="weather-main">
          <div>
            <h5>{description}</h5>

            <div className="temp-row">
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weather icon"
              />

              <span className="temperature">{temperature}°</span>
            </div>

            <p>
              Sensatión <strong>{feelsLike}°</strong>
            </p>
          </div>

          <div className="wind-box">
            <span>↗</span>

            <strong>Wind</strong>

            <p>{windSpeed} km/h</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default WeatherNow;
