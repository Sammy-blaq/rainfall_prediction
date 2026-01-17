import React from "react";
import { WeatherIcon } from "./WeatherIcons";

import { Droplets, Wind, Thermometer } from "lucide-react";

export const CurrentWeather = ({
  location,
  temperature,
  humidity,
  windSpeed,
  condition,
  rainChance,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card shadow-card p-6 md:p-8">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Temperature and condition */}
          <div className="flex items-center gap-6">
            <WeatherIcon type={condition} size="xl" animated />
            <div>
              <p className="text-5xl md:text-6xl font-display font-bold text-foreground">
                {temperature}°C
              </p>
              <p className="text-lg text-muted-foreground capitalize mt-1">
                {condition.replace("-", " ")}
              </p>
            </div>
          </div>

          {/* Right: Rain probability */}
          <div className="flex flex-col items-center justify-center bg-accent/10 rounded-xl p-4 md:p-6">
            <Droplets className="w-8 h-8 text-accent mb-2" />
            <p className="text-3xl font-display font-bold text-accent">
              {rainChance}%
            </p>
            <p className="text-sm text-muted-foreground">Rain Chance</p>
          </div>
        </div>

        {/* Weather details */}
        <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Thermometer className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-semibold">{temperature + 2}°C</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Droplets className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Wind className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold">{windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
