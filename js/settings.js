/*
 *  Settings functions
 *
 */
var settingsElem = document.getElementById('settings');
var tags = document.getElementsByTagName('span');
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
