import React from "react";
import { Lightbulb, Sprout, AlertTriangle, CheckCircle } from "lucide-react";

const iconMap = {
  info: Lightbulb,
  warning: AlertTriangle,
  success: CheckCircle,
  planting: Sprout,
};

const styleMap = {
  info: "bg-accent/10 border-accent/20 text-accent",
  warning: "bg-sun/10 border-sun/20 text-sun",
  success: "bg-vegetation/10 border-vegetation/20 text-vegetation",
  planting: "bg-secondary border-secondary text-secondary-foreground",
};

export const FarmingTip = ({ type, title, description }) => {
  const Icon = iconMap[type];

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border border-border ${styleMap[type]}`}
    >
      <div className="shrink-0">
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};
