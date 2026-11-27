import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { LandCoordinates } from "@/lib/models/land";
import * as turf from "@turf/turf";

import mapboxgl from "mapbox-gl";

const DisplayLand: React.FC<{
  latandlongs: string;
  index: number;
}> = ({ latandlongs, index }) => {
  let map: mapboxgl.Map | null = null;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (Boolean(latandlongs)) {
        const locationLatandLongs: LandCoordinates = {
          coordinates: JSON.parse(latandlongs ?? "")[0],
        };
        mapboxgl.accessToken = process.env.MAP_BOX_TOKEN ?? "";
        map = new mapboxgl.Map({
          container: `Map-${index}`,
          style: "mapbox://styles/mapbox/satellite-streets-v12", // set to satellite
          center: [
            locationLatandLongs.coordinates[0][0],
            locationLatandLongs.coordinates[0][1],
          ], // set to addis ababa
          zoom: 16,
        });

        map.on("load", () => {
          // Add a data source containing GeoJSON data.
          if (!map?.getSource(`maine`))
            map?.addSource(`maine`, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  // These coordinates outline Maine.
                  coordinates: [locationLatandLongs.coordinates],
                },
                properties: {},
              },
            });

          // Add a new layer to visualize the polygon.

          map?.addLayer({
            id: `maine-${index}`,
            type: "fill",
            source: `maine`, // reference the data source
            layout: {},
            paint: {
              "fill-color": "#0080ff", // blue color fill
              "fill-opacity": 0.5,
            },
          });

          // // Add a black outline around the polygon.
          map?.addLayer({
            id: `outline-${index}`,
            type: "line",
            source: `maine`,
            layout: {},
            paint: {
              "line-color": "#000",
              "line-width": 3,
            },
          });
        });

        let customCoordinates: number[][] =
          locationLatandLongs.coordinates as unknown as number[][];
        for (var i = 0; i < customCoordinates.length - 1; i++) {
          var [startLat, startLng] = customCoordinates[i];
          var [endLat, endLng] = customCoordinates[i + 1];

          var segment = turf.lineString([
            [startLng, startLat],
            [endLng, endLat],
          ]);

          var length = turf.length(segment, { units: "meters" });

          var point1 = turf.point([startLat, startLng]);
          var point2 = turf.point([endLat, endLng]);

          var midpoint = turf.midpoint(point1, point2);

          var popupContent = document.createElement("div");
          popupContent.innerHTML = length.toFixed(2) + "m";
          popupContent.style.background = "#FFFFFF";
          popupContent.style.color = "#000000";
          popupContent.style.width = "70px";
          popupContent.style.textAlign = "center";

          var marker = new mapboxgl.Marker(popupContent)
            .setLngLat({
              lng: midpoint.geometry.coordinates[0],
              lat: midpoint.geometry.coordinates[1],
            })
            .addTo(map);
        }
      }
    }
  }, [isMounted]);

  return (
    <div>
      <div
        id={`Map-${index}`}
        className="rounded-[15px] object-contain h-[350px] w-[400px] "
      ></div>
    </div>
  );
};

export default DisplayLand;
