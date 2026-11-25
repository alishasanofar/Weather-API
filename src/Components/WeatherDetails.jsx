function WeatherDetails({ weather }) {
  if (!weather) {
    return null;
  }
  return (
    <div className="weather-details">
      <div className="detail-card">
        <h3>Humidity</h3>
        <p>{weather.main.humidity}%</p>
      </div>
      <div className="detail-card">
        <h3>Wind Speed</h3>
        <p>{weather.wind.speed} m/s</p>
      </div>
      <div className="detail-card">
        <h3>Pressure</h3>
        <p>{weather.main.pressure} hPa</p>
      </div>
      <div className="detail-card">
        <h3>Feels Like</h3>
        <p>{weather.main.feels_like} °C</p>
      </div>
    </div>
  );
}
export default WeatherDetails;
