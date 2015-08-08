var Geo = navigator.geolocation;
var lat = null;
var lon = null;

// geo stuff for weather
Geo.getCurrentPosition(function(position) {
  lat = position.coords.latitude.toFixed(2);
  lon = position.coords.longitude.toFixed(2);
});

function getLocation() {
  return (lat === null || lon === null) ? null : {
    lat: lat,
    lon: lon
  };
};
