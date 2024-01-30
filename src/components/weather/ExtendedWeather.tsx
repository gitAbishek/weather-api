import { WiStrongWind } from "react-icons/wi";

const ExtendedWeatherForecast = () => {
  return (
    <div className="favorites">
      <div className="title">Favorite Cities</div>

      <div className="city-wrapper-main">
        <div className="city-wrapper">
          <div className="city">Paris</div>
          <div className="city-weather-icon">
            <WiStrongWind />
          </div>
          <div className="city-weather-condition">Clear</div>
          <div className="degree">36&deg; / 37&deg;</div>
        </div>
      </div>
    </div>
  );
};

export default ExtendedWeatherForecast;
