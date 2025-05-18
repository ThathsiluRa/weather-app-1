# Weather Forecast App

A modern, responsive weather forecasting application built with React and the OpenWeatherMap API. This application provides real-time weather information, 5-day forecasts, and a beautiful user interface with smooth animations.

## Features

- Real-time weather data for any location
- 5-day weather forecast
- Temperature unit toggle (Celsius/Fahrenheit)
- Responsive design for all screen sizes
- Beautiful animations and transitions
- Error handling and user notifications
- Search by city name
- Detailed weather information including:
  - Temperature
  - Humidity
  - Wind speed
  - Weather conditions
  - Sunrise/Sunset times

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- OpenWeatherMap API key

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
weather-app/
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API and utility services
│   ├── styles/           # Global styles and theme
│   ├── context/          # React context providers
│   └── assets/           # Static assets
├── public/               # Public static files
└── index.html           # Entry HTML file
```

## Technologies Used

- React 18
- Vite
- Styled Components
- Axios
- React Icons
- Framer Motion
- React Toastify

## API Reference

This project uses the OpenWeatherMap API. You can find the API documentation at [https://openweathermap.org/api](https://openweathermap.org/api).

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License. 
