import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
} from "react-hook-form";
import { toast } from "react-toastify";

import Search from "../form/Search";
import CurrentWeather, { ExtendedWeatherDataProps } from "./CurrentWeather";
import {
  getCityCurrentWeatherData,
  getCityLatitudeLongitude,
  getCityWeatherForeCast,
} from "../../services/weather.service";
import { useEffect, useState } from "react";
import { formatForeCastData } from "../../helper/transformer";
import ExtendedForeCast from "./ExtendedForeCast";
import FavoriteCity from "./FavoriteCity";

const WeatherSearch = () => {
  const methods = useForm();

  const [currentWeatherData, setCurrentWeatherData] = useState<
    ExtendedWeatherDataProps["currentWeatherData"]
  >({} as ExtendedWeatherDataProps["currentWeatherData"]);

  const [weatherForeCastData, setWeatherForeCastData] = useState([]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const cityLatLong = await getCityLatitudeLongitude({
        cityName: data.search || "kathmandu",
      });

      if (cityLatLong && cityLatLong.length < 1) {
        toast.error("No city with this name found");
        return;
      }

      if (cityLatLong) {
        methods.reset();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <FavoriteCity />
    </div>
  );
};

export default WeatherSearch;
