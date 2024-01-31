export interface FavCity {
  lon: number;
  lat: number;
}

const FAV_CITY = "favorite-city";
const MAX_FAV_CITY = 3;

const formatDataToJson = (data: FavCity[]) => JSON.stringify([...data]);

const saveDataToLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const addCityToFavorite = (data: FavCity) => {
  const getAlreadySavedFavCities = localStorage.getItem(FAV_CITY);

  if (!getAlreadySavedFavCities) {
    const citiesData = formatDataToJson([data]);
    saveDataToLocalStorage(FAV_CITY, citiesData);
    return { msg: "Added to favorite" };
  }

  //   parse the fav cities to JS object
  const cities = JSON.parse(getAlreadySavedFavCities);

  //   check if the city with same lat and lon already exist in favorite list or not
  const isSameCityAlreadyExist = cities.find(
    (fav: FavCity) => fav.lat === data.lat && fav.lon === data.lon
  );

  // early return is city already exist in the favorite list
  if (isSameCityAlreadyExist) {
    return { msg: "city already exist in favorite city list" };
  }

  if (cities && cities.length >= MAX_FAV_CITY) {
    return { msg: "You have reach the limit to add new city to favorite" };
  }

  const newCitiesData = formatDataToJson([...cities, data]);
  saveDataToLocalStorage(FAV_CITY, newCitiesData);
  return { msg: "Added to favorite" };
};

export const removeCityFromFavorite = (data: FavCity) => {
  const alreadySavedFavCities = localStorage.getItem(FAV_CITY);
  if (!alreadySavedFavCities) {
    return;
  }

  // parse the fav cities to JS object
  const cities = JSON.parse(alreadySavedFavCities);

  const isSameCityAlreadyExist = cities.find(
    (fav: FavCity) => fav.lat === data.lat && fav.lon === data.lon
  );

  if (isSameCityAlreadyExist) {
    const filteredCities =
      cities?.filter(
        (city: FavCity) => city.lat !== data.lat && city.lon !== data.lon
      ) || [];
    const newCitiesData = formatDataToJson(filteredCities);
    saveDataToLocalStorage(FAV_CITY, newCitiesData);
    return { msg: "Remove from favorite" };
  }
};

export const getFavoriteCitiesDataFromStorage = ()=> {
    const favCities = localStorage.getItem(FAV_CITY);
    if (!favCities) return [];

    return JSON.parse(favCities);
}
