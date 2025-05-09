// IMPORTANT: Create a .env.local file in the root of your project and add your OpenWeatherMap API key:
// NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_actual_api_key_here
// You can get a free API key from https://openweathermap.org/appid

export const OPENWEATHERMAP_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

if (!OPENWEATHERMAP_API_KEY) {
  console.warn(
    "OpenWeatherMap API key is not set. Please set NEXT_PUBLIC_OPENWEATHERMAP_API_KEY in your .env.local file."
  );
}
