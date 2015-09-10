var Geo = navigator.geolocation;
var lat = null;
var lon = null;

var key = setInterval(function () {
  if (lat !== null && lon !== null) {
    clearInterval(key);
    return;
  }
  
  // geo stuff for weather
  Geo.getCurrentPosition(function(position) {
    lat = position.coords.latitude.toFixed(2);
    lon = position.coords.longitude.toFixed(2);
  });
}, 500);

function getLocation() {
  return (lat === null || lon === null) ? null : {
    lat: lat,
    lon: lon
  };
};
