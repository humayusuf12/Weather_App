import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const getWeatherIcon = (description) => {
  switch (description.toLowerCase()) {
    case "clear":
      return { icon: "CLEAR_DAY", color: "#FFD700" };
    case "clouds":
      return { icon: "CLOUDY", color: "#fff" };
    case "rain":
      return { icon: "RAIN", color: "#00BFFF" };
    case "snow":
      return { icon: "SNOW", color: "#ADD8E6" };
    case "thunderstorm":
      return { icon: "RAIN", color: "#800080" };
    default:
      return { icon: "CLOUDY", color: "#fff" };
  }
};

const WeatherCard = ({ weather, unit }) => {
  const { icon, color } = getWeatherIcon(weather.description);
  const unitLabel = unit === "metric" ? "C" : "F";

  return (
    <div className="card flex flex-row justify-evenly items-center mt-4 p-4 rounded-lg shadow-lg md:w-9/12 w-full m-auto">
      <div className="weather-icon">
        <ReactAnimatedWeather
          icon={icon}
          color={color}
          size={64}
          animate={true}
        />
        <p className="text-lg capitalize mt-2">{weather.description}</p>
      </div>
      <div className="weather-details">
        <p className="text-4xl font-bold mt-2">
          {weather.temperature}
          <span className="text-base align-top">°{unitLabel}</span>
        </p>
        <h2 className="text-xl font-semibold">{weather.city}</h2>
      </div>
    </div>
  );
};

export default WeatherCard;
