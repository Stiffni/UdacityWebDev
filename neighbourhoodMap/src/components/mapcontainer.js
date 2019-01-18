import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.setMarkerState = this.setMarkerState.bind(this);
    this.setMapState = this.setMapState.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleMarkerClick(props, marker, e) {
    this.props.onMarkerClick(props, marker)
  }
  handleMapClick(props) {
    this.props.onMapClick(props);
  }
  handleClose(props) {
    this.props.onClose(props);
  }
  setMarkerState(element) {
    this.props.setAppMarkerState(element);
  }
  setMapState(element) {
    this.props.setAppMapState(element);
  }
  render() {
    const style = {
      width: '100%',
      height: '100%'
    };
    const {allRestaurants, visRestaurants} = this.props;
    let bounds = new this.props.google.maps.LatLngBounds();
    if(visRestaurants.length > 0) {
      for (var i = 0; i < visRestaurants.length; i++) {
        bounds.extend(visRestaurants[i].latlng);
      }
    } else {
      for (var j = 0; j < allRestaurants.length; j++) {
        bounds.extend(allRestaurants[j].latlng);
      }
    }
    window.gm_authFailure = () => {alert("We experienced an error authenticating with the Google Maps API")};
    return (
      <div className="google-map" aria-label="application">
        <Map
          ref={this.setMapState}
          initialCenter={{
            lat: 43.450702,
            lng: -80.491410
          }}
          google={this.props.google}
          zoom={17}
          style={style}
          bounds={bounds}
          onClick={this.handleMapClick}
        >
          {visRestaurants.map((restaurant) =>
            <Marker //I can't figure out how to alttext or tabindex this componenent
              ref={this.setMarkerState}
              key={restaurant.id}
              name={restaurant.name}
              title={restaurant.name}
              position={restaurant.latlng}
              animation={this.props.google.maps.Animation.DROP}
              onClick={this.handleMarkerClick}
            />
          )}
          <InfoWindow
            marker={this.props.activeMarker}
            visible={this.props.showingInfoWindow}
            onClose={this.props.handleClose}>
            <div>
              <h3>{this.props.selectedPlace.name}</h3>
              <h4>{this.props.selectedPlace.category}</h4>
              <h4>{this.props.selectedPlace.address}</h4>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3jqt7DCVczlq4PLZRp2UTjZCN5LqUGUM'
})(MapContainer)