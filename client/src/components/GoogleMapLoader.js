import React, { useEffect } from "react";

const GoogleMapLoader = () => {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;
    if (!apiKey) {
      console.error("Google Maps API key is missing.");
      return;
    }

    // Check if the script already exists
    if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Define the initMap function globally
    window.initMap = function () {
      // Your map initialization logic here
      console.log("Google Maps script loaded successfully.");
    };
  }, []);

  return null; // This component does not render anything
};

export default GoogleMapLoader;