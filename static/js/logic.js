// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
  center: [45.52, -122.67],
  zoom: 3
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



// load the GeoJSON data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Get the data with d3
d3.json(geoData).then(function (data) {

  //
function getValue(x) {
	return x > 90 ? "#ea2c2c" :
	       x > 70 ? "#ea822c" :
	       x > 50 ? "#ee9c00" :
	       x > 30 ? "#eecc00" :
	       x > 10 ? "#d4ee00" :
		       "#98ee00";
}

function style(feature) {
	return {
		"color": getValue(feature.geometry.coordinates[2]),
		"stroke": false,
    "fillOpacity": 0.95,
    "radius": feature.properties.mag * 3
	};
}

function pointToLayer(feature, latlng) {
  return L.circleMarker(latlng, style(feature));

}

function onEachFeature(feature, layer) {
  return layer.bindPopup(`<h3>Where: ${feature.properties.place}</h3><hr><p>Time: ${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Number of "Felt" Reports: ${feature.properties.felt}`);
};


L.geoJson(data, {
	pointToLayer: pointToLayer,
  onEachFeature: onEachFeature
}).addTo(myMap);



  // Set up the legend.
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [-10, 10, 30, 50, 70, 90]
    var colors = ["#98ee00","#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"]
    
    for (var i = 0; i < limits.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
      }
    
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);



});









// create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
// Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. 
//Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
// Hint: The depth of the earth can be found as the third coordinate for each earthquake.
// Include popups that provide additional information about the earthquake when its associated marker is clicked.
// Create a legend that will provide context for your map data.
// Your visualization should look something like the preceding map.


// Define array to hold the created earthquake markers.
// var earthquakeMarkers = [];


