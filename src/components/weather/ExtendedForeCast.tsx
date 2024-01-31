/* eslint-disable @typescript-eslint/no-explicit-any */
import { WiCloud, WiDaySunny } from "react-icons/wi";
import {  kelvinToCelsius } from "../../helper/kelvinToCelsius";
interface ExtendedForeCastProps {
  weatherForeCastData: never[];
}

const ExtendedForeCast = ({ weatherForeCastData }: ExtendedForeCastProps) => {

  const allData: any = [];

  weatherForeCastData &&
    weatherForeCastData.map((data: any) => {
      const dateString = data?.dt_txt;
      const dateObject = new Date(dateString);
      const dayOfWeek = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(dateObject);
      const tempMinkelvin = data?.main?.temp_min;
      const tempMaxKelvin = data?.main?.temp_max;
      if (data) {
        allData.push({
          day: dayOfWeek,
          weather: data?.weather[0]?.main,
          tempMinCelsius: tempMinkelvin
            ? kelvinToCelsius(tempMinkelvin)
            : null,
          tempMaxCelsius: tempMaxKelvin
            ? kelvinToCelsius(tempMaxKelvin)
            : null,
        });
      }
    });

  return (
    <div className="favorites">
      <div className="title">Extended Forecast</div>

      <div className="city-wrapper-main">
        {allData &&
          allData.map((data: any) => (
            <div className="city-wrapper" key={data?.day}>
              <div className="city">{data?.day}</div>
              <div className="city-weather-icon">
                {data?.weather === "Clouds" ? <WiCloud /> : <WiDaySunny />}
              </div>
              <div className="city-weather-condition">{data?.weather}</div>
              <div className="degree">{data?.tempMinCelsius.toFixed(2)}&deg; / {data?.tempMaxCelsius.toFixed(2)}&deg;</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExtendedForeCast;
