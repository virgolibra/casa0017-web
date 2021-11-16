    
    const API_TOKEN_Mapbox = 'pk.eyJ1IjoidWNmbm16MCIsImEiOiJja3ZhdG56Z2IwMmE2Mm9uNm9nbnZvZG5wIn0.YD41mSWi6vImdUjKc47PVA';
    mapboxgl.accessToken = API_TOKEN_Mapbox;

    const API_KEY_HERE = "85M6KrKVnx45I2-wfD5KWuMB8egtwIW_IKDZd4XNv_s";
    
    
    const INITIAL_VIEW_STATE = {
        longitude: -0.12,
        latitude: 51.5,
        zoom: 11,
        bearing: 0,
        pitch: 0
    };


      // MapBox Vector Tile
      const map = new mapboxgl.Map({
        container: 'map',
        //  style: 'mapbox://styles/mapbox/light-v10', //vector tiles require a Mapbox API to access them
        style: 'mapbox://styles/mapbox/navigation-night-v1', 
        
        // Note: deck.gl will be in charge of interaction and event handling
        interactive: true,
        center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
        zoom: INITIAL_VIEW_STATE.zoom,
        bearing: INITIAL_VIEW_STATE.bearing,
        pitch: INITIAL_VIEW_STATE.pitch
    });



    /* Data points defined as an array of LatLng objects */
// var heatmapData = [
//   new mapboxgl.Marker().setLngLat([-0.124603,51.500896]),
//   new mapboxgl.Marker().setLngLat([ -0.09929038196690297,51.508676367797285]),
//   new mapboxgl.Marker().setLngLat([ -0.11954297294079794,51.50343084692139]),
//   new mapboxgl.Marker().setLngLat([ -0.12827467479226445,51.50906276178127]),
//   new mapboxgl.Marker().setLngLat([ -0.12701024595593177,51.5196135595575]),
//   new mapboxgl.Marker().setLngLat([ -0.07584961469949537,51.50947490124]),
//   new mapboxgl.Marker().setLngLat([-0.17216927294105142,51.49675940777218]),
//   // new mapboxgl.Marker().setLngLat([-0.124603,51.500896]),
//   // new mapboxgl.Marker().setLngLat([-0.124603,51.500896]),
//   // new mapboxgl.Marker().setLngLat([-0.124603,51.500896]),
//   // new mapboxgl.Marker().setLngLat([-0.124603,51.500896]),
//   // new mapboxgl.Marker().setLngLat([-0.124603,51.500896]),

// ];

// heatmapData.addTo(map);



    // // Create a default Marker and add it to the map.
    // //bigben：
    // const marker1 = new mapboxgl.Marker()
    // .setLngLat([-0.124603,51.500896])
    // .addTo(map);

    // //tate Morden:
    // const marker2 = new mapboxgl.Marker()
    // .setLngLat([ -0.09929038196690297,51.508676367797285])
    // .addTo(map);

    // //london eye：
    // const marker3 = new mapboxgl.Marker()
    // .setLngLat([ -0.11954297294079794,51.50343084692139])
    // .addTo(map);

    // //national gallery:
    // const marker4 = new mapboxgl.Marker()
    // .setLngLat([ -0.12827467479226445,51.50906276178127])
    // .addTo(map);

    // //British museum：
    // const marker5 = new mapboxgl.Marker()
    // .setLngLat([ -0.12701024595593177,51.5196135595575])
    // .addTo(map);

    // //Tower of London：
    // const marker6 = new mapboxgl.Marker()
    // .setLngLat([ -0.07584961469949537,51.50947490124])
    // .addTo(map);

    // //Victoria and Albert Museum: 
    // const marker7 = new mapboxgl.Marker()
    // .setLngLat([-0.17216927294105142,51.49675940777218])
    // .addTo(map);
     
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

    //   const BikeTFL = new deck.MapboxLayer({
    //     id: "bike-tfl",
    //     data: "https://api.tfl.gov.uk/BikePoint",
    //     type: deck.ScatterplotLayer,
    //     pickable: true,
    //     opacity: 0.8,
    //     stroked: true,
    //     filled: true,
    //     radiusScale: 50,
    //     radiusMinPixels: 10,
    //     radiusMaxPixels: 150,
    //     lineWidthMinPixels: 1,
    //     getPosition: (d) => [d.lon, d.lat],
    //     getRadius: (d) => d.additionalProperties[6].value,
    //     getFillColor: (d) => [255, 140, 0],
    //     getLineColor: (d) => [0, 0, 30],
    
    // onHover: ({ object }, info) => {
    //       (isHovering = Boolean(object));
    //       if (isHovering == true) {
    //         console.log(object.additionalProperties[6].value);
    //         map.getCanvas().style.cursor = 'pointer';
    //         showTooltip(info, object);
    //         }
    //         else { hideTooltip(); }
    //       },
    //     });
    
    //   map.addLayer(BikeTFL);


      // map.addSource('my-data', {
      //   "type": "geojson",
      //   "data": {
      //   "type": "Feature",
      //   "geometry": {
      //   "type": "Point",
      //   "coordinates": [-0.124603,51.500896]
      //   },
      //   "properties": {
      //   "title": "Mapbox DC",
      //   "marker-symbol": "monument",
      //   "dbh":555
      //   }
      //   }
      //   });
      
        map.addSource('trees', {
          type: 'geojson',
          data: './resources/trees.geojson'
        });
     
        map.addSource('myData', {
          type: 'geojson',
          data: './resources/myData.geojson'
        });

        const geojson = {"type": "FeatureCollection",
        "features": [
            {"type": "Feature", 
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.124603,51.500896]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Bigben",
                    "heat":1.775
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.09929038196690297,51.508676367797285]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Tate Morden",
                    "heat":0.894
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.11954297294079794,51.50343084692139]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "London Eye",
                    "heat":7.708
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.12827467479226445,51.50906276178127]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "National Gallery",
                    "heat":8.479
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.12701024595593177,51.5196135595575]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "British museum",
                    "heat":8.613
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.07584961469949537,51.50947490124]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Tower of London",
                    "heat":1.314
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.17216927294105142,51.49675940777218]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Victoria and Albert Museum",
                    "heat":7.717
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.07536723061262272,51.50558326255463 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "London Tower Bridge",
                    "heat":9.453
                }
            },
    
            
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.127267116069872 ,51.499805270230155 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Westminster Abbey",
                    "heat":7.444
                }
            },
                
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [ -0.16569155196675464 , 51.50773254598538 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Hyde Park",
                    "heat":8.997
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.08643840389352578 , 51.50467878549576 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "The Shard",
                    "heat":10.594
                }
            },
    
            {"type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-0.12808646579321398 ,  51.50812677208848 ]
                },
                "properties": {
                    "title": "Mapbox",
                    "description": "Trafalgar Square",
                    "heat":6.081
                }
            }
    
    
    
        ]
    }
    
    // add markers to map
for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
  new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);
  
}
//         const mySource = map.getSource('myData');
//         var geoJson = mySource.getGeoJSON();

//             // add markers to map
// for (const feature of geoJson.features) {
//   // create a HTML element for each feature
//   const el = document.createElement('div');
//   el.className = 'marker';

//   // make a marker for each feature and add to the map
//   new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
// }

        // mySource.features.forEach(function(marker) {
        //   const el = document.createElement('div');
        //   el.className = 'marker';
        //   // make a marker for each feature and add to the map
        //   new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
        // });
        // Add a symbol layer
map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'myData',
    'layout': {
    
    // get the title name from the source's "title" property
    'text-field': ['get', 'description'],
    'text-font': [
    'Open Sans Semibold',
    'Arial Unicode MS Bold'
    ],
    
    'text-offset': [0, 1.25],
    'text-anchor': 'top'
    },

    paint: {
        "text-color": "#ffffff"
      }
    });


        map.addLayer(
          {
            id: 'spot-heat',
            type: 'circle',
            source: 'myData',
            minzoom: 11,
            paint: {
              // increase the radius of the circle as the zoom level and dbh value increases
              'circle-radius': {
                property: 'heat',
                type: 'exponential',
                stops: [
                  [{ zoom: 11, value: 1 }, 10],
                  [{ zoom: 11, value: 12 }, 40],
                  [{ zoom: 22, value: 1 }, 40],
                  [{ zoom: 22, value: 12 }, 200]
                ]
              },
              // 'circle-radius': {
              //   'base':100,
              //   'stops': [
              //   [12, 100],
              //   [22, 500]
              //   ]
              //   },
              'circle-color': {
                property: 'heat',
                type: 'exponential',
                stops: [
                  [0, 'rgba(255,191,0,10)'],
                //   [2, 'rgba(255,191,0,10)'],
                //   [4, 'rgba(255,191,0,20)'],
                //   [6, 'rgba(255,191,0,30)'],
                //   [7, 'rgba(255,191,0,40)'],
                  [8, 'rgba(255,191,0,50)'],
                //   [9, 'rgba(255,191,0,10)'],
                //   [10,'rgba(255,191,0,10)'],
                //   [11,'rgba(255,191,0,10)'],
                  [12,'rgba(255,191,0,100)'],
                  [70, 'red']
                ]

                // stops: [
                //     [0, 'rgba(236,222,239,0)'],
                //     [2, 'rgb(236,222,239)'],
                //     [4, 'rgb(208,209,230)'],
                //     [6, 'rgb(166,189,219)'],
                //     [8, 'rgb(103,169,207)'],
                //     [10, 'rgb(28,144,153)'],
                //     [12, 'rgb(1,108,89)'],
                //     [70, 'red']
                //   ]
              },
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              'circle-opacity': {
                stops: [
                  [11, 0],
                  [12, 1]
                ]
              }
              
            }
          },
          'waterway-label'
        );
      




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


    map.on('click', 'spot-heat', (event) => {
      new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML(`<strong>Place:</strong> ${event.features[0].properties.description}`)
        // .setHTML(`<strong>DBH:</strong> ${event.features[0].properties.dbh}`)
        .addTo(map);
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
    