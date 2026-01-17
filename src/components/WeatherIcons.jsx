import React from "react";
import { Cloud, CloudRain, Sun, CloudSun } from "lucide-react";

const sizeMap = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

export const WeatherIcon = ({ type, size = "md", animated = false }) => {
  const sizeClass = sizeMap[size];
  const animationClass = animated ? "animate-bounce" : "";

  switch (type) {
    case "rain":
      return (
        <div className={`relative ${sizeClass} ${animationClass}`}>
          <CloudRain className="w-full h-full text-accent" />
          {animated && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-0.5 h-2 bg-accent rounded-full animate-rain"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          )}
        </div>
      );
    case "light-rain":
      return (
        <div className={`relative ${sizeClass} ${animationClass}`}>
          <CloudRain className="w-full h-full text-accent/70" />
        </div>
      );
    case "cloudy":
      return <Cloud className={`${sizeClass} text-cloud ${animationClass}`} />;
    case "sunny":
      return <Sun className={`${sizeClass} text-sun ${animationClass}`} />;
    case "partly-cloudy":
      return (
        <CloudSun
          className={`${sizeClass} text-sun ${animationClass}  [animation-duration:3s]`}
        />
      );
    default:
      return <Sun className={`${sizeClass} text-sun ${animationClass}`} />;
  }
};
