import React, { createContext, useContext, useReducer, useCallback } from 'react'
import { toast } from 'react-toastify'
import { weatherService } from '../services/weatherService'

const WeatherContext = createContext()

const initialState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  unit: 'metric', // 'metric' for Celsius, 'imperial' for Fahrenheit
  lastSearchedCity: null
}

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_CURRENT_WEATHER':
      return { ...state, currentWeather: action.payload, loading: false, error: null }
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload, loading: false, error: null }
    case 'SET_UNIT':
      return { ...state, unit: action.payload }
    case 'SET_LAST_SEARCHED_CITY':
      return { ...state, lastSearchedCity: action.payload }
    case 'RESET_STATE':
      return { ...initialState, unit: state.unit }
    default:
      return state
  }
}

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  const fetchWeatherData = useCallback(async (city) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_LAST_SEARCHED_CITY', payload: city })

      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city, state.unit),
        weatherService.getForecast(city, state.unit)
      ])

      dispatch({ type: 'SET_CURRENT_WEATHER', payload: currentWeather })
      dispatch({ type: 'SET_FORECAST', payload: forecast })
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch weather data'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      toast.error(errorMessage)
    }
  }, [state.unit])

  const toggleUnit = useCallback(() => {
    const newUnit = state.unit === 'metric' ? 'imperial' : 'metric'
    dispatch({ type: 'SET_UNIT', payload: newUnit })
    
    if (state.lastSearchedCity) {
      fetchWeatherData(state.lastSearchedCity)
    }
  }, [state.unit, state.lastSearchedCity, fetchWeatherData])

  const value = {
    ...state,
    fetchWeatherData,
    toggleUnit
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
} 