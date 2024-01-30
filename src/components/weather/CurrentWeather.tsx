import { FaHeart } from "react-icons/fa";
// import { WiDayCloudy } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";

const CurrentWeather = () => {
  return (
    <div className="current-weather-wrapper">
      <div className="current-weather-header">
        <div className="title">Current Weather</div>
        <div className="icon">
          <FaHeart />
        </div>
      </div>

      <div className="current-weather-wrapper-inside">
        <div className="current-weather-main-details">
          <div className="city">Paris</div>

          <div className="weather-icon-details">
            <div className="weather">
              <div className="weather-main-icon">
                <WiHumidity  />
              </div>
              <div className="degree">36&deg;</div>
            </div>

            <div className="weather-condition">Clear Sky</div>
          </div>
        </div>
        <div className="current-weather-small-details">
          <div className="weather-details">
            <WiHumidity className="icon-small" />
            <div className="title">Humidity</div>
            <div className="subtitle">23%</div>
          </div>
          <div className="weather-details">
            <WiStrongWind className="icon-small" />
            <div className="title">Wind</div>
            <div className="subtitle">9kph</div>
          </div>
          <div className="weather-details">
            <WiBarometer className="icon-small" />
            <div className="title">Pressure</div>
            <div className="subtitle">1017hPa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
