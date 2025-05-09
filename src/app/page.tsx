"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Coordinates, WeatherApiResponse, LocationDetails, CurrentWeather, AirQuality, Forecast } from '@/types/weatherapi';
import { getWeatherData } from '@/lib/weatherapi';
import { WEATHERAPI_COM_API_KEY } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';

import { WeatherDisplay } from '@/components/my-weather/WeatherDisplay';
import { LoadingState } from '@/components/my-weather/LoadingState';

export default function HomePage() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>("Initializing My Weather...");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const showErrorMessage = useCallback((title: string, description: string) => {
    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
    setError(description);
  }, [toast]);


  useEffect(() => {
    if (!WEATHERAPI_COM_API_KEY || WEATHERAPI_COM_API_KEY === "YOUR_API_KEY" || WEATHERAPI_COM_API_KEY === "843630211a7d4bea9e774738250905_IS_A_PLACEHOLDER_REPLACE_IT") { 
      const apiKeyErrorMsg = "WeatherAPI.com API key is not set or is a placeholder. Please configure it to use the app.";
      setLoadingMessage(apiKeyErrorMsg);
      showErrorMessage("Configuration Error", apiKeyErrorMsg + " Refer to src/lib/config.ts or console for instructions.");
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
          let userMessage = "Could not get your location. Ensure location services are enabled and permissions are granted.";
          if (err.code === err.PERMISSION_DENIED) {
            userMessage = "Location permission denied. Enable it in your browser settings to see local weather.";
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
          setLoadingMessage("Fetching weather, forecast, and air quality data...");
          setError(null);

          const responseData: WeatherApiResponse = await getWeatherData(coords);
          setWeatherData(responseData);
          setLoadingMessage("");

        } catch (err: any) {
          console.error("Error fetching data:", err);
          const fetchErrorMsg = `Failed to fetch data: ${err.message}. Ensure API key is valid and account is active.`;
          setLoadingMessage(fetchErrorMsg);
          showErrorMessage("Data Fetch Error", fetchErrorMsg);
        }
      };
      fetchData();
    }
  }, [coords, showErrorMessage]);

  if (loadingMessage && !weatherData && !error) {
    return <LoadingState message={loadingMessage} />;
  }
  
  if (error && !weatherData) { 
     return <LoadingState message={error} showSpinner={false} />;
  }

  if (weatherData) {
    const locationDetails: LocationDetails = {
      name: weatherData.location.name,
      country: weatherData.location.country,
    };
    const currentWeatherData: CurrentWeather = weatherData.current;
    const airQualityData: AirQuality | undefined | null = weatherData.current.air_quality;
    const forecastData: Forecast = weatherData.forecast;

    return (
        <WeatherDisplay 
            locationDetails={locationDetails} 
            currentWeatherData={currentWeatherData} 
            airQualityData={airQualityData}
            forecastData={forecastData}
        />
    );
  }
  
  return <LoadingState message={loadingMessage || "Waiting for location..."} />;
}
