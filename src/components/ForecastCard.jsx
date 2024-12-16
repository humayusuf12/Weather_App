import ReactAnimatedWeather from "react-animated-weather";

const ForecastCard = ({ forecast, unit, weather }) => {
  const unitLabel = unit === "metric" ? "C" : "F";

  // Weather icon mapping
  const weatherIcons = {
    clear: { icon: "CLEAR_DAY", color: "#FFD700" },
    clouds: { icon: "CLOUDY", color: "#fff" },
    rain: { icon: "RAIN", color: "#00BFFF" },
    snow: { icon: "SNOW", color: "#ADD8E6" },
    thunderstorm: { icon: "RAIN", color: "#800080" },
  };

  // Get icon or use default
  const { icon, color } = weatherIcons[weather.description.toLowerCase()] || {
    icon: "CLOUDY",
    color: "#fff",
  };

  const { day, temp } = forecast;

  return (
    <div className="card md:p-3 p-2 rounded-lg shadow-md text-center grid xl:w-2/12 justify-center">
      <p className="text-sm font-semibold">{day}</p>
      <div className="flex my-2 justify-evenly items-center gap-1">
        <ReactAnimatedWeather
          icon={icon}
          color={color}
          size={25}
          animate={true}
        />
        <p className="text-base">
          {temp}
          <span className="text-sm align-top">°{unitLabel}</span>
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;
