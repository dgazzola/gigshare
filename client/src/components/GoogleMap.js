import React from "react"


const GoogleMap = ({ gig, dropDown }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API || '';
  
  if (!apiKey) {
    console.error("Google Maps API key is not defined.");
  }
  
  let mapData
  if (gig.address){
    mapData=`${gig.address}, ${gig.city}, ${gig.state}`
  }
  let coordinates

  if (mapData){
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${mapData}&key=${apiKey}`)
    .then((response) => {
      return response.json();
    }).then(jsonData => {
      console.log('map response:', jsonData)
      coordinates={lat:jsonData.results[0].geometry.location.lat, lng:jsonData.results[0].geometry.location.lng}
      const map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: 11,
      })
      new google.maps.Marker({
        position: new google.maps.LatLng(coordinates),
        map: map,
      })

    })
    .catch(error => {
        console.log(error);
    })
  }
  return (
    <div id="map" className={`map ${dropDown}`}>
    </div>
  )
}

export default GoogleMap