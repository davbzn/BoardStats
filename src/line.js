var lineChart = new Chart( 
  document.getElementById("line-chart").getContext('2d'),
  {
    type: 'line',
    defaults: {
      line: {
        spanGaps: true
      }
    },
    data: {
      datasets: [ ],
      labels: [],
    },
    options: {
      /* options */
      responsive: false,
      title: {
        display: true,
        text: 'Play time per turn.'
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Turns [#]"
          }
        }],
        yAxes: [{
          display: true,
					type: 'linear', //'logarithmic',
          scaleLabel: {
            display: true,
            labelString: "Seconds [s]"
          }
        }]
      }
    }
  }
);

function addLineDataset( labelStr, values, color ) {
  var newDataset = {
    label: labelStr,
    fill: false,
    data: values,
    borderColor: color+"7F",
    pointBorderColor: color+"BF"
  }
  lineChart.data.datasets.push( newDataset );
  return false;
}

function removeLineDataset( labelStr ) {
  lineChart.data.datasets = lineChart.data.datasets
    .filter( item => item.label != labelStr )
  return false;
}

function resetLineChart() {
  while (lineChart.data.datasets.length) {
    lineChart.data.datasets.pop();
  }
  return false;
}

function setLineColor( labelStr, color ) {
  let ds = lineChart.data.datasets.findIndex( it => it.label === labelStr);
  lineChart.data.datasets[ds].borderColor = color+"7F";
  lineChart.data.datasets[ds].pointBorderColor = color+"BF";
  return false;
}

// data collection
function updateLineChartData( overwrite, labelStr, time ) {
  let ds = lineChart.data.datasets.findIndex( it => it.label === labelStr);
  if (overwrite) {
    lineChart.data.datasets[ds].data[state.turn-1] += time;
  } else {
    lineChart.data.datasets[ds].data[state.turn-1] = time;
  }
  if ( lineChart.data.labels.length < state.turn ) {
    lineChart.data.labels.push( state.turn );
  }
  lineChart.update( )
}
