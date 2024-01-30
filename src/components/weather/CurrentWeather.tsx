import { FaHeart } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";
import { kelvinToCelsius } from "../../helper/kelvinToCelsius";

export interface ExtendedWeatherDataProps {
  currentWeatherData: {
    name: string;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    weather: {
      description: string;
    }[];
    wind: {
      speed: number;
    };
  };
}

const CurrentWeather = ({ currentWeatherData }: ExtendedWeatherDataProps) => {
  const temperature = currentWeatherData
    ? kelvinToCelsius(currentWeatherData?.main?.temp)
    : null;


  return (
    <div className="current-weather-wrapper">
      <div className="current-weather-header">
        <div className="title">Current Weather</div>
        <div className="icon">
          <FaHeart />
        </div>
      </div>

      {currentWeatherData && (
        <div className="current-weather-wrapper-inside">
          <div className="current-weather-main-details">
            <div className="city">{currentWeatherData?.name}</div>

            <div className="weather-icon-details">
              <div className="weather">
                <div className="weather-main-icon">
                  <WiHumidity />
                </div>
                <div className="degree">{temperature?.toFixed(2)}&deg;</div>
              </div>

              <div className="weather-condition">
                {currentWeatherData && currentWeatherData?.weather && currentWeatherData?.weather[0]?.description}
              </div>
            </div>
          </div>
          <div className="current-weather-small-details">
            <div className="weather-details">
              <WiHumidity className="icon-small" />
              <div className="title">Humidity</div>
              <div className="subtitle">
                {currentWeatherData && currentWeatherData?.main?.humidity}%
              </div>
            </div>
            <div className="weather-details">
              <WiStrongWind className="icon-small" />
              <div className="title">Wind</div>
              <div className="subtitle">
                {currentWeatherData && currentWeatherData?.wind?.speed}kph
              </div>
            </div>
            <div className="weather-details">
              <WiBarometer className="icon-small" />
              <div className="title">Pressure</div>
              <div className="subtitle">
                {currentWeatherData && currentWeatherData?.main?.pressure}hPa
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
