var timeElmt = document.getElementById('time');
var dateElmt = document.getElementById('date');
var locElmt = document.getElementById('location');

function updateDateTime() {
  var now = moment();
  timeElmt.innerHTML = now.format('LT').toLowerCase();
  dateElmt.innerHTML = now.format('ll');
}

updateDateTime();
setInterval(updateDateTime, 150);

setTimeout(function() {
  var location = chrome.extension.getBackgroundPage().getLocation();

  if (location) {
    locElmt.innerHTML = location.lat + ', ' + location.lon;
  } else {
    locElmt.innerHTML = '?, ?';
  }
}, 0);

document.getElementById('note').addEventListener('keyup', function(e) {
  document.getElementById('print').innerHTML = this.value;
});


// TODO:
// * add panel.js to change syntax
// * add settings to change theme
// * add beautify buttons for js/html/css/JSON
var textArea = document.getElementById('note');
var editor = CodeMirror.fromTextArea(textArea, {
  mode: 'markdown',
  theme: 'paraiso-light',

  tabSize: 2,
  indentUnit: 2,

  dragDrop: false,
  lineNumbers: true,
  lineWiseCopyCut: true,

  matchBrackets: true,
  autoCloseBrackets: true,
  extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
});
