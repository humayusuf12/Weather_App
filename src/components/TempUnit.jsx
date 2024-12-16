import { fetchWeather, fetchForecast } from "../services/weatherApi";
const TemperatureToggle = ({
  unit,
  setUnit,
  setForecast,
  setWeather,
  setLoading,
  submittedCity,
}) => {
  const handleUnitChange = (e) => {
    console.log(e.target.value);
    setUnit(e.target.value);

    const handleSubmit = async () => {
      setLoading(true);
      try {
        const weatherData = await fetchWeather(submittedCity, e.target.value);
        const forecastData = await fetchForecast(submittedCity, e.target.value);
        setWeather(weatherData);
        setForecast(forecastData);
        localStorage.setItem("city", submittedCity);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    handleSubmit();
  };

  return (
    <div className="flex space-x-4 my-2 justify-evenly">
      <label className="flex items-center gap-4">
        <input
          type="radio"
          value="imperial"
          checked={unit === "imperial"}
          onChange={handleUnitChange}
        />
        Fahrenheit
      </label>
      <label className="flex items-center gap-4">
        <input
          type="radio"
          value="metric"
          checked={unit === "metric"}
          onChange={handleUnitChange}
        />
        Celsius
      </label>
    </div>
  );
};

export default TemperatureToggle;
