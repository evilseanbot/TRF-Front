var map = new OpenLayers.Map("map");

var ol_wms = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0",
    {layers: "basic"}
);

var dm_wms = new OpenLayers.Layer.WMS(
    "Canadian Data",
    "http://www2.dmsolutions.ca/cgi-bin/mswms_gmap",
    {
        layers: "bathymetry,land_fn,park,drain_fn,drainage," +
                "prov_bound,fedlimit,rail,road,popplace",
        transparent: "true",
        format: "image/png"
    },
    {isBaseLayer: false, visibility: false}
);

map.addLayers([ol_wms, dm_wms]);
map.addControl(new OpenLayers.Control.LayerSwitcher());
//map.zoomToMaxExtent();

var position = new OpenLayers.LonLat(-122, 37);

var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));
 
map.setCenter(position, 18);

console.log("WHATUP");

$.ajax({
  url: "testJson.json"
}).done(function(data) {
    jsonData = $.parseJSON(data);
	
	for (key in jsonData) {
        console.log(jsonData[key].lat)

        var position = new OpenLayers.LonLat(jsonData[key].lon, jsonData[key].lat);
		
		var markers = new OpenLayers.Layer.Markers( "Markers" );
			map.addLayer(markers);
			markers.addMarker(new OpenLayers.Marker(position));
		
    }	
});