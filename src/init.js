const logs = [ ];
const state = { player: 0, timer: 0, turn: 1 };

function randomColor() {
  return Math.floor(Math.random()*16777215).toString(16);
}

function logStart( playerID ) {
  logs.push( { player: playerID, turn: state.turn, start: moment() } )
  return false
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

function logsToCSV( objArray ) {
    // create a csv table with "Player name", turn nr., start time,
    // stop time, and duration columns.
    var str = '';
    str += "Player name, turn number, start time, stop time, duration\r\n"
    for (var i = 0; i < logs.length; i++) {
        var line = '"' + objArray[i].player + '", ';
        line += objArray[i].turn + ", ";
        line += objArray[i].start.toISOString() + ", ";
        line += objArray[i].stop.toISOString() + ", ";
        line += objArray[i].duration;
        str += line + '\r\n';
    }
    return str
}

function exportToCSV( ) {
    var csv = logsToCSV( logs );

    //var exportedFileName = fileTitle + '.csv' || 'export.csv';
    var exportedFileName = 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
