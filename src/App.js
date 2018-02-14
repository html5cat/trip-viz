import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import DeckGL, { ScatterplotLayer } from 'deck.gl'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'

// import data from './data/2016-07-02--11-56-24.json'
import data from './data/trips.json'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }  
    }

   this.state.trips = data
  }

  
  render() {
    const {viewport, trips} = this.state
    const data = trips.coords

    const layer = new ScatterplotLayer({
      id: 'trips',
      data,
      getPosition: d => [d.lng, d.lat],
      getColor: d => [255, (100 - d.speed) / 100 * 255, 0],
      getRadius: d => 10,
      radiusMinPixels: 3,
      radiusScale: 1
    })
  
    return (
      <MapGL
        {...viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <DeckGL 
          {...viewport} 
          layers={[layer]} 
        />        
      </MapGL>
    );
  }
}

export default Map
