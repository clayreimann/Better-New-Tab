/*
 *  Time related functions
 *
 */
function setHoursOf(date, intoElement) {
  intoElement.innerHTML = forTimeDisplay(date.getHours() % 12);
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
    document.getElementsByTagName('html')[0].classList.add(backgroundColor);
    document.querySelectorAll('option[value='+backgroundColor+']')[0].setAttribute('selected', 'selected');
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

// DOM Ready
document.addEventListener('DOMContentLoaded', function(){
  var hoursElmt, minutesElmt, secondsElmt, dateElmt, date
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

  document.getElementById('background-color').addEventListener('change', function(e) {
    var html = document.getElementsByTagName('html')[0];
    localStorage.setItem('backgroundColor', this.value);
    if (html.classList.length) {
      html.classList.remove(html.classList[0]);
    }
    html.classList.add(this.value);
  });

  document.getElementById('settings-done').addEventListener('click', toggleSettings);
  document.getElementById('settings-open').addEventListener('click', toggleSettings);
});