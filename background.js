function makeEditable() {
  var el = document.documentElement
  var editable = el.hasAttribute('contentEditable')
  if(editable) {
    el.removeAttribute('contentEditable')
  } else {
    el.setAttribute('contentEditable', true)
  }
  return el.hasAttribute('contentEditable')
}

function code(func) {
  return {code: '(' + func + '())'}
}

function addSaveButton() {
  window.addEventListener('keydown', function(event) {
    if(!((event.ctrlKey || event.metaKey) && event.which === 83)) return
    if(!document.documentElement.hasAttribute('contentEditable')) return
    event.preventDefault()
    var file = new Blob([document.documentElement.innerHTML], {
      type: 'text/html'
    })
    var link = document.createElement('a')
    link.setAttribute('download', location.pathname.split('/').pop())
    link.href = URL.createObjectURL(file)
    var event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    })
    link.dispatchEvent(event)
  })
}


function toggleBadge(results) {
  if(results[0]) chrome.browserAction.setBadgeText({ text: '!!' })
  else chrome.browserAction.setBadgeText({ text: '' })
}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, code(addSaveButton))
  chrome.tabs.executeScript(null, code(makeEditable), toggleBadge)
});

