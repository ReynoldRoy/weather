// IMPORTANT: The API key is set here directly as requested.
// For production, consider moving this to a .env.local file:
// NEXT_PUBLIC_WEATHERAPI_COM_API_KEY=your_actual_api_key_here
// You can get a free API key from https://www.weatherapi.com/signup.aspx

export const WEATHERAPI_COM_API_KEY = "843630211a7d4bea9e774738250905"; // Replace with your actual key if this is just an example
const PLACEHOLDER_API_KEY = "YOUR_API_KEY"; // A common placeholder
const EXAMPLE_PLACEHOLDER_API_KEY = "843630211a7d4bea9e774738250905_IS_A_PLACEHOLDER_REPLACE_IT"; // A more specific placeholder for instruction.

if (
  !WEATHERAPI_COM_API_KEY ||
  WEATHERAPI_COM_API_KEY === PLACEHOLDER_API_KEY ||
  WEATHERAPI_COM_API_KEY === EXAMPLE_PLACEHOLDER_API_KEY
) {
  console.warn(
    `WeatherAPI.com API key is not set or is a placeholder ("${WEATHERAPI_COM_API_KEY}"). Please ensure it is correctly configured in src/lib/config.ts with your actual key. If you have an API key, replace the current value. If the current value *is* your key, you can remove or adjust the placeholder check in this file.`
  );
  // To make the app usable with a potentially valid key that matches the example, 
  // we won't throw an error here, but the warning will persist.
  // For a real production app, you'd want a more robust placeholder detection or rely purely on .env variables.
}
