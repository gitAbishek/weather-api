/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "../utils/data";

export const formatForeCastData = (dataArray: [any]) => {
  const uniqueWeatherDates = [] as any;

  for (let i = 0; i < dataArray.length - 1; i++) {
    const date1 = formatDate({date: dataArray[i].dt_txt});
    const date2 = formatDate({date: dataArray[i + 1].dt_txt});
    if (date1 === date2) continue;
    uniqueWeatherDates.push(dataArray[i]);
  }
  
  return uniqueWeatherDates;
};
