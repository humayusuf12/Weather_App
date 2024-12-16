const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL =  import.meta.env.VITE_WEATHER_API_URL;

export const fetchWeather = async (city, unit) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  const data = await response.json();
  return {
    city: data.name,
    description: data.weather[0].main,
    temperature: Math.round(data.main.temp),
  };
};

export const fetchForecast = async (city, unit) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  const data = await response.json();
  const daysMap = {};
  data.list.forEach((day) => {
    const date = new Date(day.dt * 1000);
    const options = { weekday: "long" };
    const dayName = date.toLocaleDateString(undefined, options);

    if (!daysMap[dayName]) {
      daysMap[dayName] = Math.round(day.main.temp);
    }
  });

  return Object.keys(daysMap)
    .slice(0, 5)
    .map((day) => ({
      day,
      temp: daysMap[day],
    }));
};
