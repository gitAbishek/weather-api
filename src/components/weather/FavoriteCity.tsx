import React, { useEffect, useState } from "react";
import { WiCloud, WiDaySunny } from "react-icons/wi";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  FavCity,
  getFavoriteCitiesDataFromStorage,
  removeCityFromFavorite,
} from "../../helper/storage";
import { getCityCurrentWeatherData } from "../../services/weather.service";
import { kelvinToCelsius } from "../../helper/kelvinToCelsius";
import { useContextStore } from "../../context/context.consumer";

interface FavDataCity {
  name: string;
  coord: FavCity;
  weather : {
    main: string;
  }[];
  main: {
    temp_min: number;
    temp_max: number;
  }
}

const FavoriteCity: React.FC = () => {
  const {isAdded} = useContextStore();
  const [favoriteData, setFavoriteData] = useState<FavDataCity[]>([]);
  const favoriteCitiesList = getFavoriteCitiesDataFromStorage() || [];
  const [update, setUpdate] = useState<boolean>(false);

  const fetchFavoriteCitiesData = async () => {
    try {
      const storeData: Promise<FavDataCity>[] = favoriteCitiesList.map((data: FavCity) =>
        getCityCurrentWeatherData({ lat: data.lat, lon: data.lon })
      );

      const favCitiesData = await Promise.all(storeData);
      setFavoriteData(favCitiesData);
    } catch (error) {
      console.error("Error fetching favorite cities data:", error);
    }
  };

  const handleRemove = (data: FavCity) => {
    const removedData = removeCityFromFavorite(data);
    toast.success(removedData?.msg);
    if (removedData) {
      setUpdate(true);
    }
  };

  console.log(favoriteData,"FavoriteData");

  useEffect(() => {
    fetchFavoriteCitiesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update,isAdded]);

  return (
    favoriteData && (
      <div className="favorites-cities">
        <div className="title">Favorite Cities</div>

        <div className="favorites-city-wrapper-outside">
          {favoriteData.map((data: FavDataCity) => (
            <div className="favorites-city-wrapper-main" key={data?.name}>
              <div className="favorites-city-wrapper">
                <div className="favorites-city">{data?.name}</div>
                <div
                  className="del-icon"
                  onClick={() => handleRemove(data?.coord)}
                >
                  <FaTrash />
                </div>
                <div className="favorites-city-weather-icon">
                   {data?.weather && data?.weather[0]?.main === "Clouds" ? <WiCloud /> : <WiDaySunny />} 
                </div>
                <div className="favorites-city-weather-condition">
                  {data?.weather[0]?.main}
                </div>
                <div className="favorites-city-degree">
                  {kelvinToCelsius(data?.main?.temp_min).toFixed(2)}&deg; /{" "}
                  {kelvinToCelsius(data?.main?.temp_max).toFixed(2)}&deg;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default FavoriteCity;
