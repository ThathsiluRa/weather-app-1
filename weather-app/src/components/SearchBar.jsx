import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
`

const SearchForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: box-shadow ${({ theme }) => theme.transitions.default};

  &:focus-within {
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  background: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }

  &:focus {
    outline: none;
  }
`

const SearchButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.text.light};
    cursor: not-allowed;
  }
`

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search city"
        />
        <SearchButton
          type="submit"
          disabled={!query.trim()}
          whileTap={{ scale: 0.95 }}
          aria-label="Search"
        >
          <FaSearch />
        </SearchButton>
      </SearchForm>
    </SearchContainer>
  )
}

export default SearchBar 