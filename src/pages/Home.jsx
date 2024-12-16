import { useEffect, useState } from "react";
import CityInput from "../components/CitySearch";
import TemperatureToggle from "../components/TempUnit";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import { fetchWeather, fetchForecast } from "../services/weatherApi";
import { ThreeDots } from "react-loader-spinner";

const Home = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedCity = localStorage.getItem("favoriteCity");
    if (savedCity) {
      // setCity(savedCity);
      handleSubmit(savedCity);
      setIsFavorite(true);
    }
  }, []);

  const handleSubmit = async (submittedCity = city) => {
    setIsFavorite(false);
    setLoading(true);
    try {
      const weatherData = await fetchWeather(submittedCity, unit);
      const forecastData = await fetchForecast(submittedCity, unit);
      setWeather(weatherData);
      setForecast(forecastData);
      localStorage.setItem("city", submittedCity);
      setCity("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const savedCity = localStorage.getItem("city");
    setIsFavorite(e.target.checked);
    if (e.target.checked) {
      console.log(savedCity);
      localStorage.setItem("favoriteCity", savedCity);
    } else {
      localStorage.removeItem("favoriteCity");
    }
  };

  return (
    <>
      <div className="container px-8 py-4 mx-auto flex flex-col justify-center items-center text-center lg:h-[100vh]">
        <div className="grid lg:grid-cols-2 gap-4 items-center w-full">
          <div
            className=" grid md:py-8 py-4 md:px-10 px-6  
            bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-65 min-h-[30rem]"
          >
            <div className="grid min-h-[20rem] py-10 rounded-lg shadow-lg">
              <h3 className="text-2xl">Anytime Weather</h3>
              <CityInput city={city} setCity={setCity} />
              <TemperatureToggle
                unit={unit}
                setUnit={setUnit}
                loading={loading}
                setLoading={setLoading}
                setWeather={setWeather}
                setForecast={setForecast}
                submittedCity={localStorage.getItem("city")}
              />
            </div>

            <button
              onClick={() => handleSubmit()}
              className="mt-4 w-[40%] m-auto bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 py-2 border border-gray-100 border-opacity-25 hover:bg-opacity-65 transition-all"
            >
              Enter
            </button>
          </div>
          <div
            className=" grid py-10 px-10  
            min-h-[30rem] bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-65"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ThreeDots
                  height={80}
                  width={80}
                  color="#FFF"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              <>
                {weather ? (
                  <>
                    <WeatherCard weather={weather} unit={unit} />
                    <div className="flex items-center mt-4 justify-center">
                      <label className="text-base text-white">
                        <input
                          type="checkbox"
                          checked={isFavorite}
                          onChange={handleCheckboxChange}
                          className="mr-2"
                        />
                        Save as Favorite
                      </label>
                    </div>
                    <div>
                      <h6 className="text-base mb-3 font-medium">
                        Five Days Forecast
                      </h6>
                      <div className="   gap-2 flex md:justify-between justify-center flex-wrap">
                        {forecast.map((day, index) => (
                          <ForecastCard
                            key={index}
                            forecast={day}
                            unit={unit}
                            weather={weather}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center items-center text-white">
                    <p className="text-base">
                      Please enter a city to see the weather.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
