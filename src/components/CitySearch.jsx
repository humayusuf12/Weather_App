import { useState, useEffect } from "react";
import axios from "axios";

const CityInput = ({ city, setCity }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "No Api Key";
  const API_URL = import.meta.env.VITE_WEATHER_API_URL || "No Api Key";
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions based on user query
  const fetchSuggestions = async (query) => {
    if (query.length < 3) return; // Skip fetching for short queries

    try {
      const response = await axios.get(`${API_URL}/${query}.json`, {
        params: {
          access_token: API_KEY,
          types: "place,region,country",
          autocomplete: true,
          limit: 5,
        },
      });
      const results = response.data.features.map((feature) => ({
        name: feature.place_name,
        city: feature.text,
      }));
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle user input change
  const handleInputChange = (value) => {
    setCity(value);
    if (value.length >= 3) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="city-search relative">
      <h5 className="text-base mb-2">Enter City Below</h5>
      <input
        type="text"
        value={city}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Enter city name"
        className="py-3 md:w-[70%] w-10/12 px-4 input bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 outline-none border border-white border-opacity-65 text-white"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions absolute right-0 left-0 m-auto md:w-[70%] w-10/12 px-4 my-2 text-start bg-gray-900 rounded-md bg-clip-padding backdrop-filter bg-opacity-40 py-2 border border-gray-100 border-opacity-25">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion.city)}
              className="cursor-pointer hover:bg-gray-700 px-2 py-1 rounded-md"
            >
              {suggestion.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityInput;
