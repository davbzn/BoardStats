// Simple list
var playerList = new Sortable.create(
    document.getElementById("player-list"),
    { 
      swapThreshold: 0.50,
      invertSwap: true,
      animation: 150,
      onEnd: function (evt) {
        state.player = 0;
      }
    }
);

/*
function removeListElement( button ) {
    const elem = button.parentElement;
    elem.parentNode.removeChild( elem );
    return false;
}
*/

function addCloseButtonToElement( element ) {
  // create button
  const btn = document.createElement("Button");
  btn.className = "close";
  // add cross icon
  const cross = document.createElement("i");
  cross.className = "fa fa-close";
  btn.appendChild( cross );
  // append button
  element.appendChild( btn );
  /*
  btn.onclick = removeListElement( btn );
  btn.onclick = function() {
    const elem = this.parentElement;
    elem.parentNode.removeChild( elem )
    return false;
  }
  */
  return false;
}

function addColorPickerToElement( element ) {
  // create input color picker and append to element
  const input = document.createElement("INPUT");
  input.className = "cpick";
  input.type = "color";
  input.value = "#"+randomColor();
  element.appendChild(input);
  return false;
}

function addListElement( text ) {
  // create element containing a color picker, a text, and a close button
  const li = document.createElement("li");
  // create text
  li.classList.add( "player" )
  li.title = text;
  const t = document.createTextNode( text )
  // append children
  addColorPickerToElement( li )
  li.appendChild( t )
  addCloseButtonToElement( li )
  // append element to player list
  playerList.el.appendChild(li);
  return li;
}
