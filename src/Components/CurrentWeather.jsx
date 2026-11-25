function CurrentWeather({ weather }) {
  if (!weather) {
    return <p>Search for a city to see weather.</p>;
  }
  return (
    <div className="current-weather">
      <h2>{weather.name}</h2>
      <h1>{weather.main.temp} °C</h1>
      <p>{weather.weather[0].description}</p>
    </div>
  );
}
export default CurrentWeather;
