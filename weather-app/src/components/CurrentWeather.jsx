import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaTemperatureHigh, FaWind, FaTint, FaSun, FaMoon } from 'react-icons/fa'
import { weatherService } from '../services/weatherService'

const WeatherCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`

const CityName = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const WeatherDetail = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`

const WeatherIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
`

const WeatherText = styled.div`
  display: flex;
  flex-direction: column;
`

const WeatherLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const WeatherValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const CurrentWeather = ({ data, unit }) => {
  const {
    name,
    main: { temp, feels_like, humidity },
    weather: [weather],
    wind: { speed },
    sys: { sunrise, sunset }
  } = data

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <WeatherCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CityName>{name}</CityName>
      <DateText>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</DateText>

      <WeatherInfo>
        <WeatherDetail>
          <WeatherIcon>
            <FaTemperatureHigh />
          </WeatherIcon>
          <WeatherText>
            <WeatherLabel>Temperature</WeatherLabel>
            <WeatherValue>{weatherService.formatTemperature(temp, unit)}</WeatherValue>
          </WeatherText>
        </WeatherDetail>

        <WeatherDetail>
          <WeatherIcon>
            <FaTemperatureHigh />
          </WeatherIcon>
          <WeatherText>
            <WeatherLabel>Feels Like</WeatherLabel>
            <WeatherValue>{weatherService.formatTemperature(feels_like, unit)}</WeatherValue>
          </WeatherText>
        </WeatherDetail>

        <WeatherDetail>
          <WeatherIcon>
            <FaWind />
          </WeatherIcon>
          <WeatherText>
            <WeatherLabel>Wind Speed</WeatherLabel>
            <WeatherValue>{weatherService.formatWindSpeed(speed, unit)}</WeatherValue>
          </WeatherText>
        </WeatherDetail>

        <WeatherDetail>
          <WeatherIcon>
            <FaTint />
          </WeatherIcon>
          <WeatherText>
            <WeatherLabel>Humidity</WeatherLabel>
            <WeatherValue>{humidity}%</WeatherValue>
          </WeatherText>
        </WeatherDetail>

        <WeatherDetail>
          <WeatherIcon>
            <FaSun />
          </WeatherIcon>
          <WeatherText>
            <WeatherLabel>Sunrise</WeatherLabel>
            <WeatherValue>{formatTime(sunrise)}</WeatherValue>
          </WeatherText>
        </WeatherDetail>

        <WeatherDetail>
          <WeatherIcon>
            <FaMoon />
          </WeatherIcon>
          <WeatherText>
            <WeatherLabel>Sunset</WeatherLabel>
            <WeatherValue>{formatTime(sunset)}</WeatherValue>
          </WeatherText>
        </WeatherDetail>
      </WeatherInfo>

      <WeatherDetail>
        <img
          src={weatherService.getWeatherIcon(weather.icon)}
          alt={weather.description}
          style={{ width: '64px', height: '64px' }}
        />
        <WeatherText>
          <WeatherLabel>Weather</WeatherLabel>
          <WeatherValue style={{ textTransform: 'capitalize' }}>{weather.description}</WeatherValue>
        </WeatherText>
      </WeatherDetail>
    </WeatherCard>
  )
}

export default CurrentWeather 