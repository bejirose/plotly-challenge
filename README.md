# Belly Button Biodiversity Dahsboard

## Test Subjext ID
The Subject ID dropdown will be populated with all the available OTU Ids when the html file is loaded. Demographic Info, Horizontal Bar chart, Bubble chart, and the Gauge Chart for the first ID (940) will be displayed when the page is first loaded. The user can choose individual IDs to get the correspodning charts for that ID.

## Demographic Info
Displays demographic information for the selected Id from the dropdown menu.

## Horizontal Bar Chart
Created the horizontal bar chart to display the top 10 OTUs for the selected ID from the drop down menu. The chart uses sample_values as the values, Otu_ids as the labels, and Otu_labels as the hovertext for the chart.

## OTU Bubble Chart
Created a bubble chart to display the top 20 OTUs for the selected ID from the drop down menu. It uses otu_ids for the x values, sample_values for the y values, sample_values for the marker size, otu_ids for the marker colors, and otu_labels for the text values.

## Gauge Chart
Created a guage chart to plot the weekly washing frequency of the individual ID.

### Final Note:
All charts and demographic info will be updated whenever a new sample is selected.

