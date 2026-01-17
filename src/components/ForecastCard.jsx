import React from "react";
import { WeatherIcon } from "./WeatherIcons";

export const ForecastCard = ({
  day,
  date,
  condition,
  rainChance,
  highTemp,
  lowTemp,
  isToday = false,
}) => {
  const hasRain = condition === "rain" || condition === "light-rain";

  const containerClass = `
    relative flex flex-col items-center p-4 rounded-xl
    transition-all duration-300 hover:shadow-card hover:-translate-y-1
    ${
      isToday
        ? "bg-primary text-primary-foreground shadow-card"
        : "bg-card shadow-soft"
    }
    ${hasRain && !isToday ? "ring-2 ring-accent/30" : ""}
  `;

  const dayClass = `
    text-sm font-medium
    ${isToday ? "text-primary-foreground/80" : "text-muted-foreground"}
  `;

  const dateClass = `
    text-xs mb-3
    ${isToday ? "text-primary-foreground/60" : "text-muted-foreground/70"}
  `;

  const rainBadgeClass = `
    flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs font-medium
    ${
      hasRain
        ? isToday
          ? "bg-primary-foreground/20 text-primary-foreground"
          : "bg-accent/10 text-accent"
        : isToday
        ? "bg-primary-foreground/10 text-primary-foreground/70"
        : "bg-muted text-muted-foreground"
    }
  `;

  const highTempClass = `
    font-bold
    ${isToday ? "text-primary-foreground" : "text-foreground"}
  `;

  const lowTempClass = `
    text-sm
    ${isToday ? "text-primary-foreground/60" : "text-muted-foreground"}
  `;

  return (
    <div className={containerClass}>
      {hasRain && !isToday && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse [animation-duration:3s]" />
      )}

      <p className={dayClass}>{isToday ? "Today" : day}</p>
      <p className={dateClass}>{date}</p>

      <WeatherIcon type={condition} size="lg" />

      <div className={rainBadgeClass}>{rainChance}%</div>

      <div className="flex items-center gap-2 mt-3">
        <span className={highTempClass}>{highTemp}°</span>
        <span className={lowTempClass}>{lowTemp}°</span>
      </div>
    </div>
  );
};
