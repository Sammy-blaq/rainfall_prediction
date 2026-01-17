import React from "react";

import { Bell, RefreshCw } from "lucide-react";
import Button from "../components/ui/Button.jsx";
import Header from "../components/Header.jsx";
import { LocationSelector } from "../components/LocationSelector.jsx";
import { CurrentWeather } from "../components/CurrentWeather.jsx";
import { ForecastCard } from "../components/ForecastCard.jsx";
import { RainfallChart } from "../components/RainFallChart.jsx";
import { FarmingTip } from "../components/FarmingTip.jsx";
import { ChatBot } from "../components/ChatBot.jsx";

import { useState } from "react";

// Mock data - in production this would come from an API
const forecastData = [
  {
    day: "Mon",
    date: "Jan 15",
    condition: "partly-cloudy",
    rainChance: 20,
    highTemp: 32,
    lowTemp: 22,
  },
  {
    day: "Tue",
    date: "Jan 16",
    condition: "cloudy",
    rainChance: 45,
    highTemp: 30,
    lowTemp: 21,
  },
  {
    day: "Wed",
    date: "Jan 17",
    condition: "rain",
    rainChance: 85,
    highTemp: 28,
    lowTemp: 20,
  },
  {
    day: "Thu",
    date: "Jan 18",
    condition: "rain",
    rainChance: 90,
    highTemp: 27,
    lowTemp: 19,
  },
  {
    day: "Fri",
    date: "Jan 19",
    condition: "light-rain",
    rainChance: 60,
    highTemp: 29,
    lowTemp: 20,
  },
  {
    day: "Sat",
    date: "Jan 20",
    condition: "cloudy",
    rainChance: 30,
    highTemp: 31,
    lowTemp: 21,
  },
  {
    day: "Sun",
    date: "Jan 21",
    condition: "sunny",
    rainChance: 10,
    highTemp: 33,
    lowTemp: 22,
  },
];

const rainfallData = [
  { week: "This Week", expected: 45, average: 35 },
  { week: "Week 2", expected: 60, average: 40 },
  { week: "Week 3", expected: 30, average: 45 },
  { week: "Week 4", expected: 25, average: 38 },
];

const farmingTips = [
  {
    type: "warning",
    title: "Heavy Rain Expected Wednesday-Thursday",
    description:
      "Delay any fertilizer application. Consider harvesting mature crops before the rain arrives to prevent damage.",
  },
  {
    type: "planting",
    title: "Ideal Planting Window",
    description:
      "After Thursday's rain, soil moisture will be optimal for planting millet, sorghum, or groundnuts.",
  },
  {
    type: "success",
    title: "Good Irrigation Savings",
    description:
      "Expected rainfall this week may reduce irrigation needs by 40%. Monitor soil moisture levels.",
  },
];

const Index = () => {
  const [state, setState] = useState("");
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main content goes here */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <LocationSelector value={state} onChange={setState} />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 hover:cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Alerts</span>
            </Button>
          </div>
        </div>

        {/* Current Weather */}
        <section
          className="mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <CurrentWeather
            location="Kano"
            temperature={32}
            humidity={45}
            windSpeed={12}
            condition="partly-cloudy"
            rainChance={20}
          />
        </section>

        {/* 7-Day Forecast */}
        <section
          className="mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="font-display font-bold text-xl mb-4">
            7-Day Rainfall Forecast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {forecastData.map((day, index) => (
              <ForecastCard key={index} {...day} isToday={index === 0} />
            ))}
          </div>
        </section>

        {/* Two column layout for chart and tips */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Rainfall Chart */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <RainfallChart data={rainfallData} />
          </section>

          {/* Farming Tips */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="font-display font-bold text-xl mb-4">
              Farming Recommendations
            </h2>
            <div className="space-y-3">
              {farmingTips.map((tip, index) => (
                <FarmingTip key={index} {...tip} />
              ))}
            </div>
          </section>
        </div>

        {/* Rainfall Predictions */}
        <section
          className="mb-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="font-display font-bold text-xl mb-4">
            Monthly Rainfall Predictions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {rainfallData.map((data, index) => (
              <div key={index} className="p-4 rounded-xl bg-card shadow-soft">
                <h3 className="font-semibold mb-2">{data.week}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Expected: {data.expected}mm</span>
                  <span className="text-sm">Average: {data.average}mm</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <footer className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Predictions are based on meteorological models and historical data.
            Last updated: January 15, 2026 at 08:00 AM
          </p>
        </footer>

        {/* AI Chatbot */}
        <ChatBot />
      </main>
    </div>
  );
};

export default Index;
