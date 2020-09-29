// Plan

// init function 
function init() {
  // 1) Fill out dropdown with all of the ids
  
}

// 2) Calls a buildPage function that draws the chart and the panel for the first one

// buildPage function 
// 1) That takes one parameter, which is the subject ID
// 2) Draws our plotly charts and fills the panel

// Need an event listener for the dropdown
// optionChanged function
// - That takes as a parameter the user selection

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
  
  // sort the dataset to get the top10 OTUs for the selected ID : choose the fist array
  // chartData = chartData[0].sort(function(a,b) {
  //     return (a-b);
  // });

  // console.log(chartData);
  // var sampleValues = sortedData.slice(0,10); // .sort(function(a,b) {//   return (a-b);// });
  // var otuLabels = chartData[0].otu_labels.slice(0,10); // // get otu_labels for the top 10 OTU's to hovertext for the chart.
  // var otuIds = chartData[0].otu_ids.slice(0,10).map(x => 'otu '+x); //get otu_ids for the top 10 OTU's to labels for the bar chart.

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
    title: "OTU Chart",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", data, layout);
  desired_maximum_marker_size = 40;
  // Trace Data to draw bubble chart
  size = [];
  console.log(chartData[0].sample_values.slice(0,20));
  //for (i = 0; i < chartData[0].sample_values.length; i++) {
  // Add the size of the bubles for the top  20 items
  for (i = 0; i < 20; i++) {
     if ( chartData[0].sample_values[i] > 20) {
      size[i] = 1+ chartData[0].sample_values[i] ;
    }
    else {
      size[i] = 1+ 20 ;
    }
  }

  var data = [{
    x: chartData[0].otu_ids.slice(0,20),
    y: chartData[0].sample_values.slice(0,20),
    text: chartData[0].otu_labels.slice(0,20),
    name: "OTU Chart",
    mode: 'markers',
    marker: {
      size: size,
      //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
      sizeref: (2.0 * Math.max(...size) / (desired_maximum_marker_size**2)),
      sizemode: 'area'
    }

  }];


  // Apply the group bar mode to the layout
  var layout = {
    title: "OTU bubble Chart"
  };

    // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bubble", data, layout);

  // Gauge plot - Bonus
  console.log(`Weekly Frequency for ${id} = ${wFrequency}`);
  
  data = [{
      domain: { x: [0, 9], y: [0, 9] },
      value: wFrequency,
      title: { text: "Speed" },
      type: "indicator",
      mode: "gauge+number",
      //values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      //values: [wFrequency/9,wFrequency/9, wFrequency/9,wFrequency/9, wFrequency/9,wFrequency/9, wFrequency/9,wFrequency/9, wFrequency/9,wFrequency/9],
        //rotation: 90,
        // text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        // textinfo: 'text',
        // textposition:'inside',
        // marker: {colors:['rgba(0, 105, 11, .5)', 'rgba(10, 120, 22, .5)',
        //                 'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
        //                  'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
        //                  'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
        //                  'rgba(240, 230, 215, .5)', 'rgba(255, 255, 255, 0)']},
        //labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1',''],
        //hoverinfo: 'label',
        // hole: .5,
        // type: 'pie',
        // showlegend: false
  
  }];
  
  layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
  // sortedData.sort(function(a,b) {
  //    return (a-b);
  //  });
  //   // Fill up the Panel
  
  
    // Filter data.samples based on subject
    // The array that you get back you are interested in [0]

    // Use dot notation to get at .otu_ids, .otu_labels, .otu_sample_values
    // Use slice for the horizontal bar chart

    // Plotly charts
    // Horizonatal bar chart- orientation: "h"


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