import { useEffect, useState } from "react";

import "./App.css";
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudsIcon from "./assets/clouds.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import mistIcon from "./assets/mist.png";
import rainIcon from "./assets/rain.png";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";
const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  lon,
  wind,
  humidity,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="dataContainer">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidityPercentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="windSpeed" className="icon" />
          <div className="data">
            <div className="windSpeed">{wind}Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};
function App() {
  let key = "6d7c52517658333ced86719adce4cc29";
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("IN");
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [text, setText] = useState("chennai");
  const [cityNotFound, setCityNotfound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const weatherIconMap = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudsIcon,
    "02n": cloudsIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if (data.cod == "404") {
        console.error("City Not found");
        setCityNotfound(true);
        loading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      console.log(weatherIconCode);
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      console.log(icon);
      setCityNotfound(false);
    } catch (error) {
      console.error("there is an error:", error.message);
      setError("Error");
    } finally {
      setLoading(false);
    }
  };
  const HandleCity = (e) => {
    setText(e.target.value);
  };
  const HandleKeyDown = (e) => {
    if (e.key == "Enter") {
      search();
    }
  };
  useEffect(function () {
    search();
  }, []);
  return (
    <>
      <div className="container">
        <div className="cityInput">
          <input
            type="text"
            placeholder="Enter the city"
            value={text}
            onChange={HandleCity}
            onKeyDown={HandleKeyDown}
          />
          <div className="searchImg" onClick={() => search()}>
            <img src={searchIcon} alt="image" />
          </div>
        </div>

        {loading && <div className="loadingMessage">Loading....</div>}
        {cityNotFound && <div className="cityError">City Not Found</div>}
        {!error && <div className="errorMessage">{error}</div>}
        {!loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            lon={lon}
            humidity={humidity}
            wind={wind}
          />
        )}
        <div className="copyright">
          <p>
            Designed By <span>Sujee</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
