import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { ChevronDown, Check } from "lucide-react";

const northernNigeriaStates = [
  { id: "kano", name: "Kano", region: "North-West" },
  { id: "kaduna", name: "Kaduna", region: "North-West" },
  { id: "katsina", name: "Katsina", region: "North-West" },
  { id: "sokoto", name: "Sokoto", region: "North-West" },
  { id: "zamfara", name: "Zamfara", region: "North-West" },
  { id: "kebbi", name: "Kebbi", region: "North-West" },
  { id: "jigawa", name: "Jigawa", region: "North-West" },
  { id: "borno", name: "Borno", region: "North-East" },
  { id: "yobe", name: "Yobe", region: "North-East" },
  { id: "adamawa", name: "Adamawa", region: "North-East" },
  { id: "bauchi", name: "Bauchi", region: "North-East" },
  { id: "gombe", name: "Gombe", region: "North-East" },
  { id: "taraba", name: "Taraba", region: "North-East" },
  { id: "plateau", name: "Plateau", region: "North-Central" },
  { id: "niger", name: "Niger", region: "North-Central" },
  { id: "benue", name: "Benue", region: "North-Central" },
  { id: "nasarawa", name: "Nasarawa", region: "North-Central" },
  { id: "kogi", name: "Kogi", region: "North-Central" },
  { id: "kwara", name: "Kwara", region: "North-Central" },
];

export const LocationSelector = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const selectedState = northernNigeriaStates.find((s) => s.id === value);

  return (
    <div className="relative flex items-center gap-2 w-60">
      <MapPin className="w-5 h-5 text-primary" />

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 bg-white shadow-md text-sm"
      >
        <span>{selectedState ? selectedState.name : "Select location"}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 top-full w-full max-h-60 overflow-auto rounded-md border border-border bg-white shadow-xl">
          {["North-West", "North-East", "North-Central"].map((region) => (
            <div key={region}>
              <div className="px-2 py-3 text-xs font-semibold text-text bg-background">
                {region}
              </div>
              {northernNigeriaStates
                .filter((s) => s.region === region)
                .map((state) => (
                  <div
                    key={state.id}
                    onClick={() => {
                      onChange(state.id);
                      setOpen(false);
                    }}
                    className={`flex items-center px-3 py-2 cursor-pointer text-sm hover:bg-blue-100 ${
                      value === state.id ? "bg-blue-200 font-medium" : ""
                    }`}
                  >
                    {value === state.id && <Check className="h-4 w-4 mr-2" />}
                    {state.name}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
