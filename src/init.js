const logs = [ ];
const state = { player: 0, timer: 0, turn: 1, list: [] };

function randomColor() {
  return Math.floor(Math.random()*16777215).toString(16);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function logStart( playerID ) {
  logs.push( { player: playerID, turn: state.turn, start: moment() } )
}

function logStop() {
  let id = logs.length - 1;
  logs[id].stop = moment();
  logs[id].duration = logs[id].stop.diff( logs[id].start, 'seconds', true)
  return logs[id].duration;
}

function logFuse() {
  // returns true if fused
  let id = logs.length - 1;
  if (id != 0 && logs[id-1].player === logs[id].player) {
    var fused = logs[id-1].duration;
    logs[id-1].stop = logs[id].stop;
    logs[id-1].duration += logs[id].duration;
    return fused;
  } else {
    return logs[id].duration;
  }
}

function nextPlayer() {
  state.player++
  let N = document.getElementById("player-list").children.length;
  if (state.player >= N) {
    state.player = 0;
    state.turn++;
  }
  return false;
}
