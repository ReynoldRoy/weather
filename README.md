# My Weather - Forecasts & AQI

My Weather is a Next.js application that provides real-time weather forecasts and Air Quality Index (AQI) data for your current location. It leverages the WeatherAPI.com service to fetch up-to-date meteorological information.

## Features

- **Current Weather:** Displays current temperature, "feels like" temperature, weather condition (e.g., Sunny, Cloudy), humidity, wind speed, pressure, visibility, and UV index.
- **Air Quality Index (AQI):** Shows the US EPA AQI, including a descriptive level (e.g., Good, Moderate, Unhealthy), a summary, and detailed pollutant levels (PM2.5, PM10, O₃, NO₂, SO₂, CO).
- **Hourly Forecast:** Provides an hourly breakdown of temperature and chance of rain for the current day.
- **3-Day Forecast:** Shows a summary for the next three days, including max/min temperatures, weather condition, chance of rain, sunrise/sunset times, and UV index.
- **Automatic Location Detection:** Uses the browser's geolocation API to fetch weather data for the user's current position.
- **Responsive Design:** Adapts to different screen sizes for a seamless experience on desktop and mobile devices.
- **User-Friendly Interface:** Clean and modern UI built with ShadCN UI components and Tailwind CSS.
- **Error Handling:** Provides informative messages for issues like API key misconfiguration, location permission denial, or data fetch failures.

## Technologies Used

- **Next.js (App Router):** React framework for server-side rendering and static site generation.
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static typing.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **ShadCN UI:** Collection of beautifully designed, accessible, and customizable UI components.
- **Lucide React:** Library of beautiful and consistent icons.
- **WeatherAPI.com:** Source for weather and AQI data.
- **Genkit (Google AI):** (Planned/Setup) For potential future AI-driven features.

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Setup

1.  **Clone the repository (if applicable) or ensure you have the project files.**

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure API Keys:**

    *   **WeatherAPI.com API Key:**
        This application requires an API key from [WeatherAPI.com](https://www.weatherapi.com/).
        1.  Sign up for a free account at [WeatherAPI.com](https://www.weatherapi.com/signup.aspx).
        2.  Once you have your API key, open the file `src/lib/config.ts`.
        3.  Replace the placeholder value for `WEATHERAPI_COM_API_KEY` with your actual API key:
            ```typescript
            // src/lib/config.ts
            export const WEATHERAPI_COM_API_KEY = "YOUR_ACTUAL_WEATHERAPI_KEY_HERE";
            ```
            **Important:** The application has a check for placeholder keys. If your key happens to match one of the common placeholder strings, you might still see a warning in the console, but the app should function if the key is valid.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:9002` (as configured in `package.json`).

### Building for Production

To create a production build:

```bash
npm run build
```

And to start the production server:

```bash
npm run start
```

## Project Structure

-   `src/app/`: Main application code, using Next.js App Router.
    -   `page.tsx`: The main page component for displaying weather information.
    -   `layout.tsx`: The root layout for the application.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
-   `src/components/`: Reusable React components.
    -   `my-weather/`: Components specific to the weather display functionality (e.g., `WeatherCard.tsx`, `AqiCard.tsx`).
    -   `ui/`: ShadCN UI components.
-   `src/lib/`: Utility functions, API service integrations, and configuration.
    -   `config.ts`: API key configuration.
    -   `weatherapi.ts`: Functions for interacting with WeatherAPI.com.
    -   `utils.ts`: General utility functions (like `cn` for classnames).
-   `src/types/`: TypeScript type definitions, especially `weatherapi.d.ts` for API response structures.
-   `src/utils/`: Helper functions for specific tasks.
    -   `aqiHelper.ts`: Logic for interpreting AQI values.
    -   `weatherIconMap.ts`: Mapping WeatherAPI condition codes to Lucide icons.
-   `src/hooks/`: Custom React hooks (e.g., `useToast.ts`, `use-mobile.ts`).
-   `src/ai/`: (Planned/Setup) Genkit related files for AI features.
    -   `genkit.ts`: Genkit initialization.
    -   `dev.ts`: For Genkit development server.
-   `public/`: Static assets.
-   `tailwind.config.ts`: Tailwind CSS configuration.
-   `next.config.ts`: Next.js configuration.

## Known Issues & Future Enhancements

-   **API Key Exposure:** The `WEATHERAPI_COM_API_KEY` is currently hardcoded in `src/lib/config.ts`. For a production application deployed publicly, this key should be moved to environment variables (e.g., `.env.local` and accessed via `process.env.NEXT_PUBLIC_WEATHERAPI_COM_API_KEY`) to prevent exposure.
-   **Limited Error Scenarios:** While basic error handling for API key and location is present, more granular error states could be implemented.
-   **Location Search:** Currently, weather is only shown for the auto-detected location. Adding a search feature for other cities would be a valuable enhancement.
-   **Unit/Integration Tests:** Adding tests would improve code quality and reliability.
-   **Advanced AI Features:** Utilize Genkit for features like personalized weather summaries, activity recommendations based on weather, etc.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

This README provides a comprehensive overview of the My Weather application. Remember to replace placeholder API keys with your actual keys to run the application successfully.
