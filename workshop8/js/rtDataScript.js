// Set your API key here
const API_TOKEN_Mapbox = 'pk.eyJ1IjoidWNmbm16MCIsImEiOiJja3ZhdG56Z2IwMmE2Mm9uNm9nbnZvZG5wIn0.YD41mSWi6vImdUjKc47PVA';
    mapboxgl.accessToken = API_TOKEN_Mapbox;

    const API_KEY_HERE = "85M6KrKVnx45I2-wfD5KWuMB8egtwIW_IKDZd4XNv_s";
    let isHovering = false;
    const INITIAL_VIEW_STATE = {
  longitude: -0.01132798084514334,
  latitude: 51.54256346290661,
  zoom: 15,
  bearing: 30,
  pitch: 45,
};

const map = new mapboxgl.Map({
  container: "map",
  style:
    "https://assets.vector.hereapi.com/styles/berlin/night/mapbox/tilezen?apikey=" +
    API_KEY_HERE,
  center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
  zoom: INITIAL_VIEW_STATE.zoom,
  bearing: INITIAL_VIEW_STATE.bearing,
  pitch: INITIAL_VIEW_STATE.pitch,
});



map.on("load", () => {
  const BikeTFL = new deck.MapboxLayer({
    id: "bike-tfl",
    data: "https://api.tfl.gov.uk/BikePoint",
    type: deck.ScatterplotLayer,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 50,
    radiusMinPixels: 10,
    radiusMaxPixels: 150,
    lineWidthMinPixels: 1,
    getPosition: (d) => [d.lon, d.lat],
    getRadius: (d) => d.additionalProperties[6].value,
    getFillColor: (d) => [255, 140, 0],
    getLineColor: (d) => [0, 0, 30],

onHover: ({ object }, info) => {
      (isHovering = Boolean(object));
      if (isHovering == true) {
        console.log(object.additionalProperties[6].value);
        map.getCanvas().style.cursor = 'pointer';
        showTooltip(info, object);
        }
        else { hideTooltip(); }
      },
    });

  map.addLayer(BikeTFL);
  const timer = setInterval(() => {
    BikeTFL.setProps({ data: "https://api.tfl.gov.uk/BikePoint" });
  }, 300000); //API called every 5 min => 300000 ms




});

function hideTooltip() {
  d3.select("#tooltip").style("visibility", "hidden");
}

function showTooltip(info, object) {
  d3
    .select("#tooltip")
    .style("top", info.center.y + 3)
    .style("left", info.center.x)
    .style("visibility", "visible")
    .style("pointer-events", "none")
    .html(`<img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Cyclist_Icon_Germany_A1.svg" class='icon'/>
             <p class='title'> ${object.commonName}</p>
             <p class='item-a'> Free Bikes: ${object.additionalProperties[6].value}</p>
             <p class='item-b'> Empty Docks: ${object.additionalProperties[7].value}</p>`);
}
