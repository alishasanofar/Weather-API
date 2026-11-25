import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import CurrentWeather from "./Components/CurrentWeather";
import WeatherDetails from "./Components/WeatherDetails";
import WeatherHistory from "./Components/WeatherHistory";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  function getWeather() {
    if (city.trim() === "") {
      setError("Enter a city name");
      return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        if (data.cod !== 200) {
          setError("City not found");
          setWeather(null);
          setHistory([]);
          return;
        }
        setWeather(data);
        setError("");
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&past_days=5&forecast_days=1&timezone=auto`)
          .then(response => response.json())
          .then(result => {
            const days = [];
            const today = new Date().toLocaleDateString("en-CA");
            for (let i = 0; i < result.daily.time.length; i++) {
              if (result.daily.time[i] < today) {
                days.push({
                  date: result.daily.time[i],
                  temperature: result.daily.temperature_2m_max[i]
                });
              }
            }
            setHistory(days.slice(-5));
          });
      })
      .catch(() => {
        setError("Something went wrong");
        setWeather(null);
        setHistory([]);
      });
  }
  return (
    <div className="app">
      <Navbar />
      <SearchBar
        city={city}
        setCity={setCity}
        getWeather={getWeather}
      />
      <p>{error}</p>
      <CurrentWeather weather={weather} />
      <WeatherDetails weather={weather} />
      <WeatherHistory history={history} />
    </div>
  );
}
export default App;
