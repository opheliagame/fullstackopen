import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const DisplayCountry = ({country, api_key}) => {
  const weather_query = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  const [ weather, setWeather ] = useState({})
                      
  const getWeather = () => {
    axios.get(weather_query)
        .then(response => {
          setWeather(response.data.current)
        })
  }

  useEffect(getWeather, [])

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
      {country.languages.map((language, id) => 
        <li key={id}>{language.name}</li>  
      )}
      </ul>
      <img height='200px' width='200px' alt='flag' src={country.flag}></img>
      <h3>Weather in {country.capital}</h3>
      <p><strong>temperature:</strong>
      {weather.temperature} Celsius
      </p>
      <img height='100px' width='100px' alt='weather_icon' src={weather.weather_icons}></img>
      <p><strong>wind:</strong>
      {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  )
}

const DisplaySearchResults = ({countries, query, showCountry, api_key}) => {
  const results = countries.filter(country => 
    country.name.toLowerCase().includes(query.toLowerCase())
  )

  if(results.length === 1) {
    return (
      <DisplayCountry country={results[0]} api_key={api_key} />
    )
  }
  else if(results.length > 1 && results.length <= 10) {
    return (
      <>
      {results.map((result, id) => 
        <div key={id}>
        {result.name}
        <button onClick={() => showCountry(result.name)}>show</button> 
        </div>
      )}
      </>
    )
  }

  return (
    <>
    <p>Too many matches, specify another query</p>
    </>
  )
  
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  const showCountry = (name) => {
    setQuery(name)
  }

  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  return (
    <div>
      find countries 
      <input value={query} onChange={handleQuery} />
      <DisplaySearchResults 
        countries={countries} 
        query={query} 
        showCountry={showCountry}
        api_key={api_key}/>
    </div>
  )
}

export default App;
