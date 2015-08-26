var timeElmt = document.getElementById('time');
var dateElmt = document.getElementById('date');
var locElmt = document.getElementById('location');

var sessions = JSON.parse(localStorage.getItem('sessions')) || {};
var sessionKey = (new Date()).getTime();

function updateDateTime() {
  var now = moment();
  timeElmt.innerHTML = now.format('LT').toLowerCase();
  dateElmt.innerHTML = now.format('ll');
}

updateDateTime();
setInterval(updateDateTime, 150);

function clickSessionItem(e) {
  var session = e.target.dataset['session'];

  editor.getDoc().setValue(sessions[session].text);
}

function removeSessionItem(e) {
  var parent = e.target.parentElement;
  var session = parent.dataset['session'];

  delete sessions[session];
  parent.remove();
  saveSessions();

  e.stopPropagation();
}

function buildTabItem(session) {
  var tabItem = document.createElement('li');
  tabItem.dataset['session'] = session;
  tabItem.addEventListener('click', clickSessionItem);
  tabItem.innerHTML = moment(session).format('M/DD h:mma');

  var deleteIcon = document.createElement('span');
  deleteIcon.classList.add('icon', 'icon-delete');
  deleteIcon.innerHTML = 'x';
  deleteIcon.addEventListener('click', removeSessionItem);
  tabItem.appendChild(deleteIcon);

  return tabItem;
}

function buildHistoryTabs() {
  var histElmt = document.getElementById('history');
  while (histElmt.children.length > 0) {
    histElmt.children[0].remove();
  }
  Object.keys(sessions).forEach(function(sess) {
    histElmt.appendChild(buildTabItem(parseInt(sess, 10)));
  })
}

buildHistoryTabs();

function saveSessions() {
  localStorage.setItem('sessions', JSON.stringify(sessions, null, 2));
  buildHistoryTabs();
}

// load data from background page
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
  mode: 'javascript',
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

  if (text.length > 0) {
    sessions[sessionKey] = {
      mode: mode,
      text: text
    };
  } else {
    delete sessions[sessionKey];
  }

  saveSessions();
});
