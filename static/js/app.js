var dataSet = {};

function dispIDemography(id){
  console.log(id);

  var panel = d3.select("#sample-metadata");
  panel.html("");

  var panelValue = "";
  var thisData = dataSet.metadata.filter(function(item) {
       return item.id == id;
  });
 
  console.log(thisData);  // log the metadata for the chosen ID
  //iterate through the object entry to display the key/value pair in the Demographic Info from the first array
  Object.entries(thisData[0]).forEach(([key, value]) => {
        // One idea is to append header elements (h5 or h6) of the key: value
        panelValue = `${key}: ${value}` 
        panel.append("h5").text(panelValue);
        console.log(panelValue);
    });
    
  return thisData[0].wfreq;
}

function buildCharts(id) {

  var wFrequency = dispIDemography(id); // display demographic info first
  
  // Filter data to get the sample values for the selected ID
  var chartData = dataSet.samples.filter(function(item) {
    return item.id == id;
  });

  console.log(chartData);
  
  var sampleValues = chartData[0].sample_values.slice(0,10); // .sort(function(a,b) {//   return (a-b);// });
  var otuLabels = chartData[0].otu_labels.slice(0,10); // // get otu_labels for the top 10 OTU's to hovertext for the chart.
  var otuIds = chartData[0].otu_ids.slice(0,10).map(x => 'otu '+x); //get otu_ids for the top 10 OTU's to labels for the bar chart.
  console.log(sampleValues); // dispaly first 10 sample values for the ID
  console.log(otuLabels);
  console.log(otuIds);
 
  // Trace Data to draw horizontal barchart
  var data = [{
    x: sampleValues.reverse(),
    y: otuIds.reverse(),
    text: otuLabels.reverse(),
    name: "OTU Chart",
    type: "bar",
    orientation: "h"
  }];
  
  // Apply the group bar mode to the layout
  var layout = {
    title: "<b>OTU Chart</b>",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", data, layout);
  
  // Trace Data to draw bubble chart
  maxiMarkerSize = 40;
  size = [];
  console.log(chartData[0].sample_values.slice(0,20));
 
  var data = [{
    x: chartData[0].otu_ids,
    y: chartData[0].sample_values,
    text: chartData[0].otu_labels,
    name: "OTU Chart",
    mode: 'markers',
    marker: {
      size: chartData[0].sample_values,
      sizeref: (2.0 * Math.max(...size) / (maxiMarkerSize**2)),
      sizemode: 'area',
      color: chartData[0].otu_ids
    }

  }];

  var layout = {
    title: "<b>OTU Bubble Chart</b>"
  };

  Plotly.newPlot("bubble", data, layout);
 
  // Gauge plot - Bonus
  console.log(`Weekly Frequency for ${id} = ${wFrequency}`);
  
  var data = [{
    type: "indicator",
    mode: "gauge+number",
    value: wFrequency,
    gauge: {
      axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "purple" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "gray",
      steps: [
        { range: [9,10], color: 'rgba(0, 105, 11, .5)' },
        { range: [8,9], color: 'rgba(10, 120, 22, .5)' },
        { range: [7,8], color: 'rgba(14, 127, 0, .5)'},
        { range: [6,7], color: 'rgba(110, 154, 22, .5)'},
        { range: [5,6], color: 'rgba(170, 202, 42, .5)'},
        { range: [4,5], color: 'rgba(202, 209, 95, .5)'},
        { range: [3,4], color: 'rgba(210, 206, 145, .5)'},
        { range: [2,3], color: 'rgba(232, 226, 202, .5)'},
        { range: [1,2], color: 'rgba(240, 230, 215, .5)'},
        { range: [0, 1], color: 'rgba(255, 255, 255, 0)'}
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 490
      }
    }
  }];
  
  var layout = {
    title: "<b>Washing Frequency</b><br>[Scrubs per Week]",
    margin: { r: 25, l: 25, b: 25 },
    font: { color: "black", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data, layout);
}


function init() {

  // Fill dropdown with IDs
  // Get firstOne id and call buildPage with that id
  
  d3.json("samples.json").then((data) => {

    var selector = d3.select("#selDataset");

    dataSet = data;

    console.log(data);

    data.names.forEach((ids) => {
      selector
        .append("option")
        .text(ids)
        .property("value", ids)
    })

    firstId = data.names[0];

    buildCharts(firstId);

  })
}

function optionChanged(selection) {

  buildCharts(selection);
}


init();