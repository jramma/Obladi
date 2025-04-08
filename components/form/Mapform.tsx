import React, { RefObject } from "react";

interface MapFormProps {
  label?: string;
  mapContainerRef: RefObject<HTMLDivElement>;
  onLocationClick: () => void;
}

const MapForm: React.FC<MapFormProps> = ({
  label = "Localización",
  mapContainerRef,
  onLocationClick,
}) => {
    
  return (
    <div className="flex flex-grow flex-col flex-1">
      <label className="block font-bold">{label}</label>
      <div className="relative flex aspect-square rounded-xl overflow-hidden card-style2">
        <div ref={mapContainerRef} className="w-full h-full" />
        <button
          type="button"
          onClick={onLocationClick}
          className="absolute font-bold top-2 right-2 bg-primary text-black p-2 rounded-md shadow-md"
        >
          Usar ubicación actual
        </button>
      </div>
    </div>
  );
};

export default MapForm;
