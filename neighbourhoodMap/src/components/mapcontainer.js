import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  handleClick(e){
    console.log(e);
  }
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <div className="map-nav-wrapper">
        <div className="navigation">
          <nav role="navigation" aria-label="Main">
            <a
              className="menu"
              onClick={this.handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
              </svg>
            </a>
          </nav>
        </div>
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