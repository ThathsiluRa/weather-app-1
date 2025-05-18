import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`

const ToggleButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text.secondary};
  background-color: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ active, theme }) => active ? 'white' : theme.colors.text.primary};
  }
`

const UnitToggle = ({ unit, onToggle }) => {
  return (
    <ToggleContainer>
      <ToggleButton
        active={unit === 'metric'}
        onClick={() => onToggle()}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle to Celsius"
      >
        °C
      </ToggleButton>
      <ToggleButton
        active={unit === 'imperial'}
        onClick={() => onToggle()}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle to Fahrenheit"
      >
        °F
      </ToggleButton>
    </ToggleContainer>
  )
}

export default UnitToggle 