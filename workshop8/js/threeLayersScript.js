const COUNTRIES = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson'
const POPULATION = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_populated_places_simple.geojson'

  const deckgl = new deck.DeckGL({
    container: 'map',
    initialViewState: {
        latitude: 51.47,
        longitude: 0.45,
        zoom: 4,
        bearing: 0,
        pitch: 0
    },
    parameters: {
    //Canvas background color, it can be applied to DIV CSS as well
      clearColor: [0.38, 0.89, 0.94, 0.5] //RGB 0-1+ opacity
    },
    controller: true,

    
    layers: [
      //First layer
      new deck.GeoJsonLayer({
        id: 'base-map', //every layer needs to have a unique ID
        data: COUNTRIES, //data can be passed as variable or added inline
        // Styles
        stroked: true,
        filled: true,
        lineWidthMinPixels: 1,
        opacity: 0.7,
        getLineColor: [252, 148, 3], //RGB 0 - 255
        getFillColor: [79, 75, 69]
      }),

      //Second layer
      new deck.GeoJsonLayer({
        id: 'population',
        data: POPULATION,
        dataTransform: d => d.features.filter(f => f.properties.featurecla === 'Admin-0 capital'),
        // Styles
        filled: true,
        pointRadiusScale: 10,
        getRadius: f => f.properties.pop_max / 1000,
        getFillColor: [200, 0, 80, 190],
         //Interactivity
         pickable: true,
      }),

      //Third layer
      new deck.TextLayer({
          id: 'text-layer',
          data: POPULATION,
          dataTransform: d => d.features.filter(f => f.properties.featurecla === 'Admin-0 capital'),
          getPosition: f => f.geometry.coordinates,
          getText: f => { return f.properties.pop_max.toString(); },
          getSize: 22,
          getColor: [0, 0, 0, 180],
          getAngle: 0,
          getTextAnchor: 'middle',
          getAlignmentBaseline: 'bottom',
          fontFamily: 'Gill Sans',
          backgroundColor: [255, 255, 255,180]
      }),    

    ],

    getTooltip: ({ object }) => object && { //object is the reference to the hover feature
            html: `<b>${object.properties.name}:</b> ${object.properties.pop_max}`, //html of the tooltip content
            style: {
                backgroundColor: 'steelblue',
                fontSize: '0.8em',
                color: 'white',
            }
        }

    });