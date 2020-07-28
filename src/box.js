var boxChart = new Chart( 
  document.getElementById("box-chart").getContext('2d'),
  {
    type: 'boxplot',
    data: {
        datasets: [ ],
    },
    options: {
      /* options */
      responsive: false,
      title: {
        display: true,
        text: 'Play time per player.'
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Player"
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Seconds [s]"
          }
        }]
      }
    }
  }
);

function addBoxDataset( labelStr, values, color ) {
  var newDataset = {
    label: labelStr,
    data: values,
    borderColor: color+"BF",
    backgroundColor: color+"7F"
  }
  boxChart.data.datasets.push( newDataset );
  return false;
}

function removeBoxDataset( labelStr ) {
  boxChart.data.datasets = boxChart.data.datasets
    .filter( item => item.label != labelStr )
  return false;
}

function resetBoxChart() {
  while (boxChart.data.datasets.length) {
    boxChart.data.datasets.pop();
  }
  return false;
}

function setBoxColor( labelStr, color ) {
  let ds = boxChart.data.datasets.findIndex( it => it.label === labelStr);
  boxChart.data.datasets[ds].borderColor = color+"BF";
  boxChart.data.datasets[ds].pointBorderColor = color+"7F";
  return false;
}

// data collection
function updateBoxChartData( overwrite, labelStr, time ) {
  let ds = boxChart.data.datasets.findIndex( it => it.label === labelStr);
  if (overwrite) {
    let id = boxChart.data.datasets[ds].data.length - 1;
    boxChart.data.datasets[ds].data[id] += time;
  } else {
    boxChart.data.datasets[ds].data.push( time );
  }
  boxChart.update( )
}
