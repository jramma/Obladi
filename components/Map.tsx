"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const DEFAULT_CENTER: [number, number] = [2.1686, 41.3874]; // Barcelona

const MapboxMap2 = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);

  // Usa tu token real aquí
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  useEffect(() => {
    // Obtener ubicación del usuario
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setCenter([coords.longitude, coords.latitude]);
        },
        (error) => {
          console.warn(
            "No se pudo obtener la ubicación, usando Barcelona",
            error
          );
        }
      );
    }

    // Una vez se tenga el centro (sea por defecto o ubicación)
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/light-v11",
      center: center,
      zoom: 16,
      pitch: 60,
      bearing: 0,
      antialias: true,
    });

    mapRef.current = map;

    // Rotación infinita
    function rotateCamera(timestamp: number) {
      if (!mapRef.current) return;
      mapRef.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
      requestAnimationFrame(rotateCamera);
    }

    map.on("load", () => {
      rotateCamera(0);

      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      });
    });

    return () => {
      map.remove();
    };
  }, [center]);

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
  );
};
const MapboxMap = () => {
  return <div className="w-full h-full bg-black dark:bg-white"></div>;
};
export default MapboxMap;


