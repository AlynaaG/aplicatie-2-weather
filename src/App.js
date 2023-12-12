import React, { useRef, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const ref = useRef();
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}${ref.current}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here
    }
  };

  const handleClick = async () => {
    getData();
  };

  const convertTime = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  };

  return (
    <div className="app">
      <div className="search">
        <div className="input">
          <input
            type="search"
            placeholder="Type city...."
            onChange={(e) => (ref.current = e.target.value)}
          />
        </div>

        <button className="button" onClick={handleClick}>
          Search
        </button>
      </div>

      {data ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <h2> {data?.name}</h2>
            </div>

            <div className="temp">
              <h1> Temp: {data?.main?.temp} &deg;C </h1>
            </div>

            <div className="description">
              <img
                src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt={data?.weather[0].description}
              />
              <span>{data?.weather[0].description}</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {data && (
        <div>
          <div className="bottom">
            <div className="feels">
              <p>Feels Like </p>
              <p className="bold">{data?.main?.feels_like}</p>
            </div>
            <div className="humidity">
              <p>Humidity</p>
              <p className="bold">{data?.main?.humidity}</p>
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              <p className="bold">{data?.wind?.speed}</p>
            </div>
          </div>
          <div className="time">
            <div className="Sunrise">
              <span>
                <Moon />
                Sunrise:{" "}
              </span>
              <span>{convertTime(data?.sys?.sunrise)}</span>
            </div>
            <div className="Sunset">
              <span>
                <Sun />
                Sunset:{" "}
              </span>
              <span>{convertTime(data?.sys?.sunset)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
