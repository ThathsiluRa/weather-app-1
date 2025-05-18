import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaTemperatureHigh, FaWind, FaTint } from 'react-icons/fa'
import { weatherService } from '../services/weatherService'

const ForecastContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`

const ForecastTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const ForecastCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const ForecastDate = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ForecastWeather = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ForecastIcon = styled.img`
  width: 48px;
  height: 48px;
`

const ForecastDescription = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  text-transform: capitalize;
`

const ForecastDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`

const ForecastDetail = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const Forecast = ({ data, unit }) => {
  return (
    <ForecastContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ForecastTitle>5-Day Forecast</ForecastTitle>
      <ForecastGrid>
        {data.map((forecast, index) => (
          <ForecastCard
            key={forecast.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ForecastDate>
              {weatherService.formatDate(forecast.dt)}
            </ForecastDate>
            
            <ForecastWeather>
              <ForecastIcon
                src={weatherService.getWeatherIcon(forecast.weather.icon)}
                alt={forecast.weather.description}
              />
              <ForecastDescription>
                {forecast.weather.description}
              </ForecastDescription>
            </ForecastWeather>

            <ForecastDetails>
              <ForecastDetail>
                <FaTemperatureHigh />
                {weatherService.formatTemperature(forecast.temp, unit)}
              </ForecastDetail>
              <ForecastDetail>
                <FaWind />
                {weatherService.formatWindSpeed(forecast.wind_speed, unit)}
              </ForecastDetail>
              <ForecastDetail>
                <FaTint />
                {forecast.humidity}%
              </ForecastDetail>
            </ForecastDetails>
          </ForecastCard>
        ))}
      </ForecastGrid>
    </ForecastContainer>
  )
}

export default Forecast 