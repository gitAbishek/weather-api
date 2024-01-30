import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
} from "react-hook-form";

import Search from "../form/Search";
import CurrentWeather, { ExtendedWeatherDataProps } from "./CurrentWeather";
import ExtendedWeatherForecast from "./ExtendedWeather";
import {
  getCityCurrentWeatherData,
  getCityLatitudeLongitude,
  getCityWeatherForeCast,
} from "../../services/weather.service";
import { useEffect, useState } from "react";
import { formatForeCastData } from "../../helper/transformer";
import ExtendedForeCast from "./Favorites";

const WeatherSearch = () => {
  const methods = useForm();

  const [currentWeatherData, setCurrentWeatherData] = useState<
    ExtendedWeatherDataProps["currentWeatherData"]
  >({} as ExtendedWeatherDataProps["currentWeatherData"]);

  const [weatherForeCastData, setWeatherForeCastData] = useState([]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const cityLatLong = await getCityLatitudeLongitude({
        cityName: data.search  || "kathmandu",
      });

      if (cityLatLong && cityLatLong.length < 1) {
        console.log("No city with this name found");
        return;
      }

      const { lat, lon } = cityLatLong[0];
      const [currentWeatherData, foreCastData] = await Promise.all([
        getCityCurrentWeatherData({ lat, lon }),
        getCityWeatherForeCast({ lat, lon }),
      ]);
      setCurrentWeatherData(currentWeatherData);
      const fiveDayForeCastData = formatForeCastData(foreCastData?.list || []);
      setWeatherForeCastData(fiveDayForeCastData);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    onSubmit({ search: "kathmandu" }); 
  }, []);

  return (
    <div className="wrapper-outside">
      <div className="wrapper-inside">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full "
          >
            <Search />
          </form>
        </FormProvider>
        <CurrentWeather currentWeatherData={currentWeatherData} />
        <ExtendedForeCast weatherForeCastData={weatherForeCastData} />
      </div>
      <ExtendedWeatherForecast />
    </div>
  );
};

export default WeatherSearch;
