import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import WeatherNow from "../components/WeatherNow";
import TodayWeather from "../components/TodayWeather";

function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = "116807a890f87138bfdc8f35ff14fe18";

  async function getWeatherByCity(cityName) {
    try {
      setLoading(true);

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`,
      );

      const weatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=es`,
      );

      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData.list);
    } catch (error) {
      console.log("Error al buscar ciudad:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getWeatherByCoords(lat, lon) {
    try {
      setLoading(true);

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`,
      );

      const weatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`,
      );

      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData.list);
    } catch (error) {
      console.log("Error con ubicación:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCitySearch(cityName) {
    getWeatherByCity(cityName);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      () => {
        getWeatherByCity("Perugia");
      },
    );
  }, []);

  return (
    <>
      <NavBar onCitySearch={handleCitySearch} />

      <main className="page-bg">
        <div className="container py-3">
          {loading && <p>Cargando clima...</p>}

          {!loading && weather && (
            <>
              <WeatherNow weather={weather} />
              <TodayWeather forecast={forecast} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
