    
    const API_TOKEN_Mapbox = 'pk.eyJ1IjoidWNmbm16MCIsImEiOiJja3ZhdG56Z2IwMmE2Mm9uNm9nbnZvZG5wIn0.YD41mSWi6vImdUjKc47PVA';
    mapboxgl.accessToken = API_TOKEN_Mapbox;

    const API_KEY_HERE = "85M6KrKVnx45I2-wfD5KWuMB8egtwIW_IKDZd4XNv_s";
    
    
    const INITIAL_VIEW_STATE = {
        longitude: 0.12,
        latitude: 51.5,
        zoom: 10,
        bearing: 0,
        pitch: 0
    };


      // MapBox Vector Tile
      const map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/mapbox/light-v10', //vector tiles require a Mapbox API to access them
        style: 'mapbox://styles/mapbox/navigation-night-v1', 
        
        // Note: deck.gl will be in charge of interaction and event handling
        interactive: true,
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        bearing: INITIAL_VIEW_STATE.bearing,
        pitch: INITIAL_VIEW_STATE.pitch
    });


    // Create a default Marker and add it to the map.
    //bigben：
    const marker1 = new mapboxgl.Marker()
    .setLngLat([-0.124603,51.500896])
    .addTo(map);

    //tate Morden:
    const marker2 = new mapboxgl.Marker()
    .setLngLat([ -0.09929038196690297,51.508676367797285])
    .addTo(map);

    //london eye：
    const marker3 = new mapboxgl.Marker()
    .setLngLat([ -0.11954297294079794,51.50343084692139])
    .addTo(map);

    //national gallery:
    const marker4 = new mapboxgl.Marker()
    .setLngLat([ -0.12827467479226445,51.50906276178127])
    .addTo(map);

    //British museum：
    const marker5 = new mapboxgl.Marker()
    .setLngLat([ -0.12701024595593177,51.5196135595575])
    .addTo(map);

    //Tower of London：
    const marker6 = new mapboxgl.Marker()
    .setLngLat([ -0.07584961469949537,51.50947490124])
    .addTo(map);

    //Victoria and Albert Museum: 
    const marker7 = new mapboxgl.Marker()
    .setLngLat([-0.17216927294105142,51.49675940777218])
    .addTo(map);
     
    // // Create a default Marker, colored black, rotated 45 degrees.
    // const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
    // .setLngLat([12.65147, 55.608166])
    // .addTo(map);




// London Tower Bridge: 51.50558326255463, -0.07536723061262272
// Westminster Abbey: 51.499805270230155, -0.127267116069872 
// Hyde Park: 51.50773254598538, -0.16569155196675464
// The Shard: 51.50467878549576, -0.08643840389352578
// Trafalgar Square: 51.50812677208848, -0.12808646579321398

    map.on('load', () => {
  const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;
      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            // 'fill-extrusion-height':["get", "height"],
            // 'fill-extrusion-base': ["get", "min_height"],

            'fill-extrusion-height':[
          "interpolate", ["linear"], ["zoom"],
          // zoom is 15 (or less) -> buildings height is 0
            15, 0,
          // zoom is 15.05 (or greater) -> buildings height is actual value
            15.05, ["get", "height"]
        ],
          'fill-extrusion-base':[
          "interpolate", ["linear"], ["zoom"],
          // zoom is 15 (or less) -> buildings height is 0
            15, 0,
          // zoom is 15.05 (or greater) -> buildings height is actual value
            15.05, ["get", "min_height"]
        ],
            'fill-extrusion-opacity': 0.8
        }
      },
      firstLabelLayerId
      );
    });
