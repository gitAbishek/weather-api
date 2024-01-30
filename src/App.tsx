import "./App.scss";
import Header from "./components/header/Header";
import WeatherSearch from "./components/weather/WeatherSearch";

function App() {
  return (
    <div>
      <div className="main-body">
        <Header />
        <div className="wrapper-main">
          <WeatherSearch />
        </div>
      </div>
    </div>
  );
}

export default App;
