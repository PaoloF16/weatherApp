import { useState } from "react";
import { Card } from "react-bootstrap";

function TodayWeather({ forecast }) {
  const [selectedDate, setSelectedDate] = useState(
    forecast[0]?.dt_txt.split(" ")[0],
  );

  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  const selectedDayForecast = forecast.filter((item) =>
    item.dt_txt.startsWith(selectedDate),
  );

  return (
    <>
      <div className="days-row">
        {dailyForecast.map((item, index) => {
          const dateKey = item.dt_txt.split(" ")[0];
          const date = new Date(item.dt_txt);

          const dayName =
            index === 0
              ? "Today"
              : date.toLocaleDateString("en-EN", { weekday: "long" });

          const dayNumber = date.toLocaleDateString("en-EN", {
            day: "numeric",
            month: "short",
          });

          const icon = item.weather[0].icon;
          const description = item.weather[0].description;
          const tempMax = Math.round(item.main.temp_max);
          const tempMin = Math.round(item.main.temp_min);
          const wind = item.wind.speed;

          return (
            <button
              className={`day-card ${selectedDate === dateKey ? "active" : ""}`}
              key={item.dt}
              onClick={() => setSelectedDate(dateKey)}
            >
              <strong>{dayName}</strong>
              <span>{dayNumber}</span>

              <img
                src={`https://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />

              <p>
                <span className="max">{tempMax}°</span> /{" "}
                <span className="min">{tempMin}°</span>
              </p>

              <small>↗</small>
              <span>{wind} km/h</span>
            </button>
          );
        })}
      </div>

      <Card className="today-card">
        <Card.Body>
          <h2>Today Weather</h2>

          {selectedDayForecast.map((item) => {
            const hour = item.dt_txt.split(" ")[1].slice(0, 5);
            const temp = Math.round(item.main.temp);
            const description = item.weather[0].description;
            const icon = item.weather[0].icon;
            const wind = item.wind.speed;

            return (
              <div className="hour-row" key={item.dt}>
                <strong>{hour}</strong>

                <img
                  src={`https://openweathermap.org/img/wn/${icon}.png`}
                  alt={description}
                />

                <strong>{temp}°</strong>

                <div>
                  <p>{description}</p>
                  <small>
                    Sensación T. {Math.round(item.main.feels_like)}°
                  </small>
                </div>

                <div>
                  <strong>Wind</strong>
                  <p>{wind} km/h</p>
                </div>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </>
  );
}

export default TodayWeather;
