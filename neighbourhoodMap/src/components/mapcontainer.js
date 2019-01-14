import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Navigation from './navigation'

export class MapContainer extends Component {
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    const {restaurants} = this.props;
    let bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < restaurants.length; i++) {
      bounds.extend(restaurants[i].latlng);
    }
    console.log(bounds)
    return (
      <div className="map-nav-wrapper">
        <Navigation 
          onNavClick={this.props.onNavClick}
        />
        <div className="google-map" aria-label="application">
          <Map
            initialCenter={{
              lat: 43.450702,
              lng: -80.491410
            }}
            google={this.props.google}
            zoom={17}
            style={style}
            bounds={bounds}
          >
          {restaurants.map((restaurant) => 
            <Marker
              key={restaurant.id}
              name={restaurant.name}
              title={restaurant.name}
              position={restaurant.latlng}
            />
          )}
          
          </Map>
        </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3jqt7DCVczlq4PLZRp2UTjZCN5LqUGUM'
})(MapContainer)