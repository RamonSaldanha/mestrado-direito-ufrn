function saveAsk () {
  var askInput = document.getElementById('askInput').value;

  // save ask in localstorage
  localStorage.setItem('ask', askInput);
  
  setAsk();
}

function setAsk () {
  var ask = document.getElementsByClassName('ask');

  for (var i = 0; i < ask.length; i++) {
    ask[i].innerHTML = localStorage.getItem('ask');
  }
  
}

setAsk();

