"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Coordinates, WeatherApiResponse, LocationDetails, CurrentWeather, AirQuality } from '@/types/weatherapi';
import { getWeatherAndAqi } from '@/lib/weatherapi';
import { WEATHERAPI_COM_API_KEY } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';

import { WeatherDisplay } from '@/components/breeze-view/WeatherDisplay';
import { LoadingState } from '@/components/breeze-view/LoadingState';

export default function HomePage() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  // AirQuality might be optional from API, handle it.
  const [airQuality, setAirQuality] = useState<AirQuality | undefined | null>(null); 
  const [loadingMessage, setLoadingMessage] = useState<string>("Initializing BreezeView...");
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
    if (!WEATHERAPI_COM_API_KEY) {
      const apiKeyErrorMsg = "WeatherAPI.com API key is not set. Please configure it to use the app.";
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
          setError(null);

          const weatherApiResponse: WeatherApiResponse = await getWeatherAndAqi(coords);
          
          setLocationDetails({
            name: weatherApiResponse.location.name,
            country: weatherApiResponse.location.country,
          });
          setCurrentWeather(weatherApiResponse.current);
          setAirQuality(weatherApiResponse.current.air_quality); // This can be undefined if API doesn't return it
          setLoadingMessage("");

        } catch (err: any) {
          console.error("Error fetching data:", err);
          const fetchErrorMsg = `Failed to fetch data: ${err.message}. Ensure your API key is valid and your account is active.`;
          setLoadingMessage(fetchErrorMsg);
          showErrorMessage("Data Fetch Error", fetchErrorMsg);
        }
      };
      fetchData();
    }
  }, [coords, showErrorMessage]);

  if (loadingMessage && !currentWeather && !error) {
    return <LoadingState message={loadingMessage} />;
  }
  
  if (error && !currentWeather) {
     return <LoadingState message={error} showSpinner={false} />;
  }

  if (locationDetails && currentWeather) { // AQI is optional, so don't gate on it for main display
    return <WeatherDisplay locationDetails={locationDetails} currentWeatherData={currentWeather} airQualityData={airQuality} />;
  }
  
  return <LoadingState message={loadingMessage || "Initializing..."} />;
}
