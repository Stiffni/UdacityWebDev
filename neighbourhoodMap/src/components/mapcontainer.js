import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Navigation from './navigation'

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <div className="map-nav-wrapper">
        <Navigation 
          onNavClick={this.props.onNavClick}
        />
        <div className="google-map" aria-label="application">
          <Map
            google={this.props.google}
            zoom={14}
            style={style}
          >
          </Map>
        </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3jqt7DCVczlq4PLZRp2UTjZCN5LqUGUM'
})(MapContainer)