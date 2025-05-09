// IMPORTANT: The API key is set here directly as requested.
// For production, consider moving this to a .env.local file:
// NEXT_PUBLIC_WEATHERAPI_COM_API_KEY=your_actual_api_key_here
// You can get a free API key from https://www.weatherapi.com/signup.aspx

export const WEATHERAPI_COM_API_KEY = "843630211a7d4bea9e774738250905";

if (!WEATHERAPI_COM_API_KEY) {
  console.warn(
    "WeatherAPI.com API key is not set. Please ensure it is correctly configured in src/lib/config.ts or an environment variable."
  );
}
