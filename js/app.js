/*
 *  Time related functions
 *
 */
function setHoursOf(date, intoElement) {
  intoElement.innerHTML = forTimeDisplay(date.getHours() > 12 ? date.getHours() % 12 : date.getHours());
}
function setMinutesOf(date, intoElement) {
  intoElement.innerHTML = forTimeDisplay(date.getMinutes());
}
function setSecondsOf(date, intoElement) {
  intoElement.innerHTML = forTimeDisplay(date.getSeconds());
}
function forTimeDisplay(value) {
  value = "" + value;

  if (value.length === 1) {
    value = "0" + value;
  }

  return value;
}

/*
 *  Settings functions
 *
 */
function loadSettings() {
  var backgroundColor = localStorage.getItem('backgroundColor');

  if (backgroundColor) {
    document.getElementsByTagName('body')[0].classList.add(backgroundColor);
  }
}
function toggleSettings(e) {
  var settingsElem = document.getElementById('settings');
  var val = getComputedStyle(settingsElem).display;

  if (val === "none") {
    settingsElem.style.display = "block";
  } else {
    settingsElem.style.display = 'none';
  }
}
function changeTheme(toTheme) {
  var body = document.getElementsByTagName('body')[0];
  localStorage.setItem('backgroundColor', toTheme);
  if (body.classList.length) {
    body.classList.remove(body.classList[0]);
  }
  body.classList.add(toTheme);
}

var hoursElmt, minutesElmt, secondsElmt, dateElmt, date, tags
  , Geo = navigator.geolocation
  , settingsElem = document.getElementById('settings')
  ;

date = new Date();

dateElmt = document.getElementById('date');
dateElmt.innerHTML = (new Intl.DateTimeFormat('en-US', {
  "weekday": "long",
  "month": "long",
  "day": "numeric"
})).format(date);

hoursElmt = document.getElementById('hours');
minutesElmt = document.getElementById('minutes');
secondsElmt = document.getElementById('seconds');

setHoursOf(date, hoursElmt);
setMinutesOf(date, minutesElmt);
// setSecondsOf(date, secondsElmt);

setInterval(function() {
  var now = new Date();

  setHoursOf(now, hoursElmt);
  setMinutesOf(now, minutesElmt);
  // setSecondsOf(now, secondsElmt);
}, 150);

// geo stuff for weather
Geo.getCurrentPosition(function(position) {
  var locationElmt = document.getElementById('location');
  var lat, lon;

  lat = position.coords.latitude.toFixed(2);
  lon = position.coords.longitude.toFixed(2);

  locationElmt.innerHTML = "" + lat + ", " + lon;
})

// settings stuff
loadSettings();
tags = document.getElementsByTagName('span');
for(i = 0; i < tags.length; i++) {
  tag = tags[i];
  tag.addEventListener('click', function(e) {
    changeTheme(this.dataset.theme);
  });
}

document.getElementById('settings-done').addEventListener('click', toggleSettings);
document.getElementById('settings-open').addEventListener('click', toggleSettings);
document.getElementById('note').addEventListener('keyup', function(e) {
  document.getElementById('print').innerHTML = this.value;
});