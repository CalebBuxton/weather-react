import './App.css';
import {useState} from 'react'

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(rest => rest.json())
      .then(result => {
        setWeather(result)
        setQuery('')
      })
    }
  }

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} - ${month} ${date}, ${year}`
  }

  const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 60) ? 'app-warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" 
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">
            {Math.round(weather.main.temp)}°F
            </div>
            <div className="weather">
            {capitalize(weather.weather[0].description)}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
