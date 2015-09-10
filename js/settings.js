/*
 *  Settings functions
 *
 */
var START_TIME = new Date();
var body = document.getElementsByTagName('body')[0];
var tags = document.getElementsByTagName('span');
var settingsElem = document.getElementById('settings');

var settings = {
  backgroundColor: ''
};

function loadSettings() {
  var settings = JSON.parse(localStorage.getItem('settings')) || {};

  changeTheme(settings.backgroundColor);
}

function saveSettings() {
  localStorage.setItem('settings', JSON.stringify(settings, null, 2));
}

function toggleSettings(e) {
  var val = getComputedStyle(settingsElem).display;

  if (val === 'none') {
    settingsElem.style.display = 'block';
  } else {
    settingsElem.style.display = 'none';
  }
}

function changeTheme(toTheme) {
  if (body.classList.length) {
    body.classList.remove(body.classList[0]);
  }

  body.classList.add(toTheme);
  settings.backgroundColor = toTheme;

  saveSettings();
}

for(i = 0; i < tags.length; i++) {
  tag = tags[i];
  tag.addEventListener('click', function(e) {
    changeTheme(this.dataset.theme);
  });
}


// settings stuff
loadSettings();
document.getElementById('settings-done').addEventListener('click', toggleSettings);
document.getElementById('settings-open').addEventListener('click', toggleSettings);
