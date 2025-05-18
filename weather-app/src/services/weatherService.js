import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY
  }
})

export const weatherService = {
  async getCurrentWeather(city, unit = 'metric') {
    try {
      const response = await api.get('/weather', {
        params: {
          q: city,
          units: unit
        }
      })
      return response.data
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.')
      }
      throw error
    }
  },

  async getForecast(city, unit = 'metric') {
    try {
      const response = await api.get('/forecast', {
        params: {
          q: city,
          units: unit
        }
      })
      
      // Process the forecast data to get daily forecasts
      const dailyForecasts = response.data.list.reduce((acc, forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString()
        
        if (!acc[date]) {
          acc[date] = {
            date,
            temp: forecast.main.temp,
            feels_like: forecast.main.feels_like,
            humidity: forecast.main.humidity,
            wind_speed: forecast.wind.speed,
            weather: forecast.weather[0],
            dt: forecast.dt
          }
        }
        
        return acc
      }, {})

      // Convert to array and take only 5 days
      return Object.values(dailyForecasts).slice(0, 5)
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.')
      }
      throw error
    }
  },

  getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  },

  formatTemperature(temp, unit) {
    return `${Math.round(temp)}°${unit === 'metric' ? 'C' : 'F'}`
  },

  formatWindSpeed(speed, unit) {
    return `${Math.round(speed)} ${unit === 'metric' ? 'm/s' : 'mph'}`
  },

  formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }
} 