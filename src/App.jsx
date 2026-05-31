import { useState } from "react";
import "./App.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import image from "./image/image.png";
import Hourlyforcast from "./components/Hourlyforcast";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const api_key = "be52f8c4e25748bcb1652724262905";
  const api_url = "http://api.weatherapi.com/v1/forecast.json";

  // 🎯 FIX 1: Search query ko flexible banaya taake coordinates aur city name dono handle hon
  const fetchData = async (searchQuery) => {
    // Agar na query mili aur na hi input field mein kuch hai, tab return karo
    if (!searchQuery || !searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `${api_url}?key=${api_key}&q=${searchQuery}&days=1`,
      );
      console.log(response.data.forecast.forecastday[0].hour);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("There is an error or the City is not found.");
      setWeatherData(null);
    }
  };

  const handelKeyPress = (event) => {
    if (event.key === "Enter") fetchData(city);
  };

  // 🎯 FIX 2: Geolocation se data fetch karne ke liye function call add ki
  const getCurrentLocation = () => {
    setError(""); // Click par purana error clear karein
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = `${latitude},${longitude}`;

          // API call trigger kar di coordinates ke sath
          fetchData(query);
        },
        (error) => {
          setError(error.message);
        },
      );
    } else {
      setError("Geolocation is not supported on this browser");
    }
  };

  return (
    <div className="bg-green-100 min-h-screen flex justify-center items-center">
      {/* card container */}
      <div className="bg-white shadow-lg mt-10 p-4 rounded w-full max-w-sm">
        <div className="flex">
          {/* input field and search button */}
          <div className="flex border rounded items-center px-2 py-2 w-full">
            {/* 🎯 BONUS PRACTICE: Is icon ko click-able banaya taake icon daba kar bhi search ho sake */}
            <button
              onClick={() => fetchData(city)}
              className="focus:outline-none cursor-pointer"
            >
              <FaSearch className="h-5 w-5 text-gray-500 hover:text-green-500 transition" />
            </button>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handelKeyPress}
              type="text"
              placeholder="Enter City Name"
              className="pl-2 border-none focus:outline-none w-full"
            />
          </div>
          {/* current location button */}
          <button
            onClick={getCurrentLocation}
            className="px-4 py-2 ml-2 rounded text-white bg-green-500 hover:bg-green-600 cursor-pointer"
          >
            <FaMapMarkerAlt className="h-5 w-5" />
          </button>
        </div>

        {/* display error */}
        {error && (
          <p className="text-red-500 text-center mt-4 text-sm font-medium">
            {error}
          </p>
        )}

        {/* weather data display */}
        {weatherData && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold ">
              {weatherData.location.name}
            </h2>
            <img
              alt="weather icon"
              className="mx-auto"
              src={`https:${weatherData.current.condition.icon}`}
            />
            <p className="text-lg font-semibold">
              {weatherData.current.temp_c}°C
            </p>
            <p className="text-sm font-semibold capitalize">
              {weatherData.current.condition.text}
            </p>
            {/* hourly forecast */}
            <Hourlyforcast
              hourlyData={weatherData.forecast.forecastday[0].hour}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
