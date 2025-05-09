"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Coordinates, WeatherData, AqiData, LocationInfo as LocationDetails } from '@/types/openweather';
import { getWeather, getAqi, getLocationName } from '@/lib/openweather';
import { OPENWEATHERMAP_API_KEY } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';

import { WeatherDisplay } from '@/components/breeze-view/WeatherDisplay';
import { LoadingState } from '@/components/breeze-view/LoadingState';

export default function HomePage() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [locationName, setLocationName] = useState<LocationDetails | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [aqi, setAqi] = useState<AqiData | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>("Initializing BreezeView...");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const showErrorMessage = useCallback((title: string, description: string) => {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
    setError(description); // also set local error state for potentially different UI rendering
  }, [toast]);


  useEffect(() => {
    if (!OPENWEATHERMAP_API_KEY) {
      setLoadingMessage("API Key is missing. Please configure it to use the app.");
      showErrorMessage("Configuration Error", "OpenWeatherMap API key is not set. Please refer to console or lib/config.ts for instructions.");
      return;
    }

    setLoadingMessage("Detecting your location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Geolocation error:", err);
          let userMessage = "Could not get your location. Please ensure location services are enabled and permissions are granted.";
          if (err.code === err.PERMISSION_DENIED) {
            userMessage = "Location permission denied. Please enable it in your browser settings to see local weather.";
          }
          setLoadingMessage(userMessage);
          showErrorMessage("Location Error", userMessage);
        }
      );
    } else {
      const noGeoMessage = "Geolocation is not supported by your browser.";
      setLoadingMessage(noGeoMessage);
      showErrorMessage("Compatibility Error", noGeoMessage);
    }
  }, [showErrorMessage]);

  useEffect(() => {
    if (coords) {
      const fetchData = async () => {
        try {
          setLoadingMessage("Fetching weather and air quality data...");
          setError(null); // Clear previous errors

          const [locName, weatherData, aqiData] = await Promise.all([
            getLocationName(coords),
            getWeather(coords),
            getAqi(coords),
          ]);
          
          setLocationName(locName);
          setWeather(weatherData);
          setAqi(aqiData);
          setLoadingMessage(""); // Clear loading message means data is loaded

        } catch (err: any) {
          console.error("Error fetching data:", err);
          const fetchErrorMsg = `Failed to fetch data: ${err.message}. Ensure your API key is valid and has relevant subscriptions.`;
          setLoadingMessage(fetchErrorMsg);
          showErrorMessage("Data Fetch Error", fetchErrorMsg);
        }
      };
      fetchData();
    }
  }, [coords, showErrorMessage]);

  if (loadingMessage && !weather && !error) { // Show loading state if message exists, no data yet, and no critical error displayed by toast already
    return <LoadingState message={loadingMessage} />;
  }
  
  if (error && !weather) { // Show error / prompt if there was an error and no weather data loaded
     return <LoadingState message={error} showSpinner={false} />;
  }

  if (locationName && weather && aqi) {
    return <WeatherDisplay locationName={locationName} weatherData={weather} aqiData={aqi} />;
  }
  
  // Fallback for initial state or unhandled intermediate states, though LoadingState should cover most.
  // This usually means geolocation is pending or an early error occurred.
  return <LoadingState message={loadingMessage || "Initializing..."} />;
}
