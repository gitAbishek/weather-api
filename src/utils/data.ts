import moment from "moment";

export const formatDate = ({
  date,
  format = "YYYY-MM-DD",
}: {
  date: string;
  format?: string;
}) => {
    return moment(date).format(format)
};

export const isSameDate = ({date1, date2}:{date1:string, date2:string}) => moment(date1).isSame(date2)