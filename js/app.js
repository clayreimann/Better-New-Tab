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


var textArea = document.getElementById('note');
var editor = CodeMirror.fromTextArea(textArea, {
  mode: 'markdown',
  theme: 'paraiso-light',

  tabSize: 2,
  indentUnit: 2,
  cursorScrollMargin: 3,

  dragDrop: false,
  lineNumbers: true,
  lineWiseCopyCut: true,

  matchBrackets: true,
  autoCloseBrackets: true,
  extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
});

editor.on('changes', function(event) {
  doc = editor.getDoc();
  var mode = doc.getMode();
  var text = doc.getValue();
  document.getElementById('print').innerHTML = editor.getDoc().getValue();

  sessions[sessionKey] = {
    mode: mode,
    text: text
  };
  localStorage.setItem('sessions', JSON.stringify(sessions, null, 2));
});
