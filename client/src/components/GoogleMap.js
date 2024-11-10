import React, { useEffect } from "react";

const GoogleMap = ({ gig, dropDown }) => {
  useEffect(() => {
    if (gig.address) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;
      if (!apiKey) {
        console.error("Google Maps API key is missing.");
        return;
      }

      const mapData = `${gig.address}, ${gig.city}, ${gig.state}`;
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${mapData}&key=${apiKey}`)
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData.results.length > 0) {
            const coordinates = {
              lat: jsonData.results[0].geometry.location.lat,
              lng: jsonData.results[0].geometry.location.lng,
            };
            const map = new google.maps.Map(document.getElementById("map"), {
              center: coordinates,
              zoom: 11,
            });
            new google.maps.Marker({
              position: coordinates,
              map: map,
            });
          } else {
            console.error("No results found for the provided address.");
          }
        })
        .catch((error) => {
          console.error("Error fetching Google Maps data:", error);
        });
    }
  }, [gig]);

  return <div id="map" className={`map ${dropDown}`}></div>;
};

export default GoogleMap;