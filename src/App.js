import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('rainy');

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=istanbul&appid=a66e5f9beaa99bd54a38d30590741495&units=metric`
      )
      .then((response) => setWeatherData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (weatherData && weatherData.list[0].pop === 0) {
      setBackground('sunny');
    } else if (weatherData && weatherData.list[0].pop > 0) {
      setBackground('rainy');
    }
  }, [weatherData]);

  return (
    <div className="container" id={background}>
      <div className="App">
        <h2>Next 5 days:</h2>
        {weatherData && (
          <div className="cards">
            {weatherData.list
              .filter((item, index) => index % 8 === 0)
              .map((item) => (
                <div className="card" key={item.dt}>
                  <div className="card__contents">
                    <div className="card__header">
                      <p>{item.dt_txt}</p>
                    </div>
                    <div className="card__content">
                      <p>{item.main.temp} °C</p>
                    </div>
                    <div className="card__texts">
                      <p>{item.main.humidity}% Moisture</p>
                      <p>{(item.pop * 100).toFixed(0)}% Rain</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;