import React, { useEffect, useRef } from "react";

// Ensure you have @types/google.maps installed for proper typings
// npm install @types/google.maps

const Heatmap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const heatmap = useRef<google.maps.visualization.HeatmapLayer | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Initialize the map
      map.current = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 12.8408, lng: 80.1534 }, // Centered on VIT Chennai
        mapTypeId: "roadmap",
      });

      // Load the CSV data and create the heatmap
      loadCSV();
    }
  }, []);

  const loadCSV = async () => {
    try {
      const response = await fetch("/nearbyvit1.csv");
      const data = await response.text();
      const heatmapData = parseCSV(data);
      createHeatmap(heatmapData);
    } catch (error) {
      console.error("Error loading the CSV file:", error);
      alert("Error loading nearbyvit1.csv. Please make sure the file is in the same directory as the HTML file.");
    }
  };

  const parseCSV = (csvText: string): google.maps.LatLng[] => {
    const lines = csvText.split("\n");
    const heatmapData: google.maps.LatLng[] = [];

    // Get headers and find column indices (case-insensitive)
    const headers = lines[0].trim().split(",");
    const latIndex = headers.findIndex((header) => header.toLowerCase() === "latitude");
    const lngIndex = headers.findIndex((header) => header.toLowerCase() === "longitude");

    if (latIndex === -1 || lngIndex === -1) {
      alert('Error: CSV file must contain "latitude" and "longitude" columns');
      return [];
    }

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const columns = line.split(",");
        const lat = parseFloat(columns[latIndex]);
        const lng = parseFloat(columns[lngIndex]);

        if (!isNaN(lat) && !isNaN(lng)) {
          heatmapData.push(new google.maps.LatLng(lat, lng));
        }
      }
    }

    return heatmapData;
  };

  const createHeatmap = (data: google.maps.LatLng[]) => {
    if (!map.current) return;

    // Remove existing heatmap if any
    if (heatmap.current) {
      heatmap.current.setMap(null);
    }

    // Create new heatmap layer
    heatmap.current = new google.maps.visualization.HeatmapLayer({
      data: data,
      radius: 20,
      opacity: 0.8,
    });

    // Add the heatmap layer to the map
    heatmap.current.setMap(map.current);

    // Adjust map center and zoom to fit all points
    if (data.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      data.forEach((point) => bounds.extend(point));
      map.current.fitBounds(bounds);
    }
  };

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
};

export default Heatmap;
