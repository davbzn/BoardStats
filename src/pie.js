var pieChart = new Chart(
  document.getElementById("pie-chart").getContext('2d'),
  {
    type: 'doughnut',
    data: {
        datasets: [{
          data: [],
          borderColor: [],
          backgroundColor: []
        }],
        labels: [ ]
    },
    options: {
      /* options */
      responsive: false,
      title: {
        display: true,
        text: 'Total play time per player.'
      }
    }
  }
);

function addPieEntry( label, value, color ) {
  pieChart.data.datasets[0].data.push( value );
  pieChart.data.datasets[0].borderColor.push( color+'BF' );
  pieChart.data.datasets[0].backgroundColor.push( color+'7F' );
  pieChart.data.labels.push( label );
  return false;
}

function removePieEntry( labelStr ) {
  var id = pieChart.data.labels.indexOf( labelStr );
  console.log( labelStr, id )
  pieChart.data.labels.splice( id, 1);
  pieChart.data.datasets[0].data.splice( id, 1);
  pieChart.data.datasets[0].borderColor.splice( id, 1);
  pieChart.data.datasets[0].backgroundColor.splice( id, 1);
  return false;
}

function resetPieChart() {
  while (pieChart.data.datasets[0].data.length) {
    pieChart.data.datasets[0].data.pop();
    pieChart.data.datasets[0].borderColor.pop();
    pieChart.data.datasets[0].backgroundColor.pop();
    pieChart.data.labels.pop();
  }
  return false;
}

function setPieColor( labelStr, color ) {
  var id = pieChart.data.labels.indexOf( labelStr );
  pieChart.data.datasets[0].borderColor[id] = color+"BF";
  pieChart.data.datasets[0].backgroundColor[id] = color+"7F";
  return false;
}

// data collection
function updatePieChartData( labelStr, time ) {
  var id = pieChart.data.labels.indexOf( labelStr );
  pieChart.data.datasets[0].data[id] += time;
  pieChart.update( )
}
