// Simple list
var playerList = new Sortable.create(
    document.getElementById("player-list"),
    { 
      swapThreshold: 0.50,
      invertSwap: true,
      animation: 150,
    }
);

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
  return false;
}

function addColorPickerToElement( parent ) {
  // create input color picker
  const input = document.createElement("INPUT");
  input.className = "cpick";
  input.type = "color";
  input.value = "#"+randomColor();
  // create input color picker wrapper
  const wrapper = document.createElement("DIV");
  wrapper.className = "color-picker-wrapper";
  wrapper.style.backgroundColor = input.value;
  // append color picker to wrapper and then wrapper to parent element
  wrapper.appendChild(input);
  parent.appendChild(wrapper);
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

playerList.onEnd = function (evt) {
  state.player = 0;
  //updatePlayerList()
}
