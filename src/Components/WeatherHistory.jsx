
function WeatherHistory({ history }) {
  return (
    <div className="weather-history">
      <h2>Previous 5 Days Weather</h2>
      {history.map((day) => (
        <div className="history-card" key={day.date}>
          <p>Date: {day.date}</p>
          <p>Temperature: {day.temperature} °C</p>
        </div>
      ))}
    </div>
  );
}
export default WeatherHistory;
