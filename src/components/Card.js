import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
const weather = require("openweather-apis");

const Card = () => {
  const [location, setLocation] = useState("");
  const [weatherObj, setWeatherObj] = useState({});
  const [weatherDescription, setWeatherDescription] = useState("");

  var unit = "metric";

  // OpenWeather API config
  weather.setLang("en");
  // set city by name
  weather.setCity(location);
  // 'metric'  'internal'  'imperial'
  weather.setUnits(unit);
  // check http://openweathermap.org/appid#get for get the APPID
  weather.setAPPID(process.env.REACT_APP_TOKEN);

  function search() {
    weather.getSmartJSON(function (err, smartJSON) {
      if (err) console.log(err);
      setWeatherObj(smartJSON);
    });

    weather.getAllWeather(async function (err, JSONObj) {
      if (err) console.log(err);
      if (JSONObj === null) return;
      setWeatherDescription(JSONObj.weather[0].description);
    });
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      search();
    } else return;
  }

  return (
    <div className="h-screen flex flex-col shadow justify-center items-center">
      <div className="max-w-xs  sm:max-w-sm md:max-w-screen-sm rounded overflow-hidden shadow-2xl backdrop-filter backdrop-blur-2xl bg-gradient-to-tr from-gray-500 to-gray-700 opacity-90">
        <div className="px-6 py-4">
          <div className="font-bold text-3xl mb-2 select-none text-white">
            Weather
          </div>
          <p className="text-xs select-none text-white">
            Easily find the weather of a location with a single search. Created
            by Drac.
          </p>
          <br />
          <div className="relative flex w-full flex-wrap items-stretch mb-3">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              onKeyPress={handleEnter}
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow-lg outline-none focus:outline-none focus:ring w-full pr-10"
            />
            <span
              className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3"
              onClick={search}
            >
              <BsSearch />
            </span>
          </div>
          {weatherObj ? (
            <div>
              <div className="font-bold text-lg mb-2 text-white">
                Temperature:{" "}
                {weatherObj.temp === undefined ? "" : weatherObj.temp}
                {weatherObj.temp === undefined
                  ? ""
                  : unit === "metric"
                  ? "°C"
                  : "°F"}
              </div>
              <div className="font-bold text-lg mb-2 text-white">
                Humidity: {weatherObj.humidity}
                {weatherObj.humidity === undefined ? "" : "%"}
              </div>
              <div className="font-bold text-lg mb-2 text-white">
                Pressure: {weatherObj.pressure}
                {weatherObj.pressure === undefined ? "" : "Pa"}
              </div>
              <div className="font-bold text-lg mb-2 text-white">
                Weather condition: {weatherDescription}
              </div>
            </div>
          ) : (
            <p className="text-sm select-none text-red-400">
              An error occured. Did you write the name of the place correctly?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
