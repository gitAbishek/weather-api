import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
} from "react-hook-form";
import Search from "../form/Search";
import CurrentWeather from "./CurrentWeather";
import Favorites from "./Favorites";

const WeatherSearch = () => {
  const methods = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data");
  };
  return (
    <>
      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full "
          >
            <Search />
          </form>
        </FormProvider>
      </div>
      <CurrentWeather />
      <Favorites />
    </>
  );
};

export default WeatherSearch;
