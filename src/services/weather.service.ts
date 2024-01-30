import { get } from "../api/client";
import { OPEN_WEATHER_API_KEY } from "../config/secret";

export const getCityLatitudeLongitude = async ({
  cityName,
}: {
  cityName: string;
}) => {
  const url = `geo/1.0/direct?q=${cityName}&appid=${OPEN_WEATHER_API_KEY}`;
  return get({ url });
};

export const getCityCurrentWeatherData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const url = `data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;
  return get({ url });
};

export const getCityWeatherForeCast = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const url = `data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;
  return get({ url });
};
