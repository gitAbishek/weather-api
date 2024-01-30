import "./App.scss";
import Header from "./components/header/Header";
import WeatherSearch from "./components/weather/WeatherSearch";

function App() {
  return (
    <div>
      <div className="main-body">
        <Header />
        <WeatherSearch />
      </div>
    </div>
  );
}

export default App;
