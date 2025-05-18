import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import UnitToggle from './components/UnitToggle'
import { useWeather } from './context/WeatherContext'

const AppContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const Main = styled.main`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: 1fr;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`

const ErrorMessage = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.error};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const App = () => {
  const { loading, error, currentWeather, forecast, fetchWeatherData, toggleUnit, unit } = useWeather()

  return (
    <AppContainer>
      <AnimatePresence>
        {loading && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              Loading...
            </motion.div>
          </LoadingOverlay>
        )}
      </AnimatePresence>

      <Header>
        <SearchBar onSearch={fetchWeatherData} />
        <UnitToggle unit={unit} onToggle={toggleUnit} />
      </Header>

      <AnimatePresence mode="wait">
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {error}
          </ErrorMessage>
        )}
      </AnimatePresence>

      <Main>
        <AnimatePresence mode="wait">
          {currentWeather && (
            <motion.div
              key="current-weather"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentWeather data={currentWeather} unit={unit} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {forecast.length > 0 && (
            <motion.div
              key="forecast"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Forecast data={forecast} unit={unit} />
            </motion.div>
          )}
        </AnimatePresence>
      </Main>
    </AppContainer>
  )
}

export default App 