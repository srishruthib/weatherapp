import React, { useState } from 'react';

function App() {
  // State for the city input by the user
  const [city, setCity] = useState('');
  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to manage error messages
  const [error, setError] = useState(null);

  // IMPORTANT: Replace "YOUR_API_KEY" with your actual API key from weatherapi.com
  const API_KEY = "94ce6cc8e59e4f35bd6192002251507";

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    if (!city.trim()) {
      alert('Please enter a city name.');
      return;
    }

    setLoading(true); // Set loading to true when fetching starts
    setError(null); // Clear any previous errors
    setWeatherData(null); // Clear previous weather data

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        // Handle HTTP errors (e.g., 400 for invalid city, 401 for invalid key)
        const errorData = await response.json();
        throw new Error(errorData.error ? errorData.error.message : 'Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data); // Set the fetched weather data
    } catch (err) {
      console.error("Error fetching weather data:", err);
      alert('Failed to fetch weather data');
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false when fetching completes
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Weather Application</h1>

        {/* Search Bar and Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-lg"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeatherData}
            className="w-full sm:w-1/3 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-lg"
          >
            Search
          </button>
        </div>

        {/* Loading Message - THIS LINE IS THE KEY. ENSURE THE ELLIPSIS IS CORRECT. */}
        {loading && (
          <p className="loading-message text-3xl font-bold text-blue-700 mb-4">Loading data...</p>
        )}

        {/* Weather Data Display */}
        {weatherData && (
          <div className="weather-cards grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* Temperature Card */}
            <div className="weather-card bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-gray-700">Temperature</h3>
              <p className="text-3xl font-bold text-blue-700">{weatherData.current.temp_c}°C</p>
            </div>

            {/* Humidity Card */}
            <div className="weather-card bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-gray-700">Humidity</h3>
              <p className="text-3xl font-bold text-blue-700">{weatherData.current.humidity}%</p>
            </div>

            {/* Condition Card */}
            <div className="weather-card bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-gray-700">Condition</h3>
              <p className="text-xl font-bold text-blue-700 text-center">{weatherData.current.condition.text}</p>
            </div>

            {/* Wind Speed Card */}
            <div className="weather-card bg-blue-50 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-gray-700">Wind Speed</h3>
              <p className="text-3xl font-bold text-blue-700">{weatherData.current.wind_kph} kph</p>
            </div>
          </div>
        )}

        {/* Optional: Display API error message if available (for debugging) */}
        {error && !loading && (
          <p className="text-red-500 mt-4 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
