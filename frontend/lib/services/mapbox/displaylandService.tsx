import { LandCoordinates } from "@/lib/models/land";
import mapboxgl from "mapbox-gl";

let map: any;

const displayLandCoordinateswithMapbox = (
  inputCoordinates: LandCoordinates,
  index: number
) => {
  mapboxgl.accessToken = process.env.MAP_BOX_TOKEN ?? "";
  map = new mapboxgl.Map({
    container: `Map-${index}`,
    style: "mapbox://styles/mapbox/satellite-streets-v12", // set to satellite
    center: [
      inputCoordinates.coordinates[0][0],
      inputCoordinates.coordinates[0][1],
    ], // set to addis ababa
    zoom: 16,
  });

  

  map.on("load", () => {
    // Add a data source containing GeoJSON data.
    if (!map.getSource(`maine-${index}`))
      map.addSource(`maine-${index}`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            // These coordinates outline Maine.
            coordinates: [inputCoordinates.coordinates],
          },
          properties: {},
        },
      });
    

    // Add a new layer to visualize the polygon.
    map.addLayer({
      id: `maine-${index}`,
      type: "fill",
      source: `maine`, // reference the data source
      layout: {},
      paint: {
        "fill-color": "#0080ff", // blue color fill
        "fill-opacity": 0.5,
      },
    });

    // Add a black outline around the polygon.
    map.addLayer({
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
};

export { displayLandCoordinateswithMapbox };
