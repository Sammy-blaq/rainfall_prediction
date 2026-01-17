import React from "react";
import { Droplets } from "lucide-react";

export const RainfallChart = ({ data }) => {
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.expected, d.average))
  );

  return (
    <div className="bg-card rounded-2xl shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg">Rainfall Outlook</h3>
            <p className="text-sm text-muted-foreground">
              Next 4 weeks prediction
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Expected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
            <span className="text-muted-foreground">Average</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.week}</span>
              <span className="text-accent font-semibold">
                {item.expected}mm
              </span>
            </div>

            <div className="relative h-6 bg-muted rounded-full overflow-hidden">
              {/* Average bar */}
              <div
                className="absolute inset-y-0 left-0 bg-muted-foreground/20 rounded-full transition-all duration-500"
                style={{
                  width: `${(item.average / maxValue) * 100}%`,
                }}
              />

              {/* Expected bar */}
              <div
                className="absolute inset-y-0 left-0 bg-accent rounded-full transition-all duration-500"
                style={{
                  width: `${(item.expected / maxValue) * 100}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
