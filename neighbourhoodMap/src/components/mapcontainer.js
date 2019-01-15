import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      allMarkers: []
    }
    this.setMarkerState = this.setMarkerState.bind(this);
  }  
  setMarkerState(element) {
    this.setState((prevState) => {
     return {allMarkers: prevState.allMarkers.concat(element.marker)}
    })
  }
  render() {
    console.log(this.state.allMarkers)
    const style = {
      width: '100%',
      height: '100%'
    }
    const {allRestaurants, visRestaurants} = this.props;
    let bounds = new this.props.google.maps.LatLngBounds();
    if(visRestaurants.length > 0){
      for (var i = 0; i < visRestaurants.length; i++) {
        bounds.extend(visRestaurants[i].latlng);
      }
    } else {
      for (var j = 0; j < allRestaurants.length; j++) {
        bounds.extend(allRestaurants[j].latlng);
      }
    }
    return (
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
        {visRestaurants.map((restaurant) =>
          <Marker
            ref={this.setMarkerState}
            key={restaurant.id}
            name={restaurant.name}
            title={restaurant.name}
            position={restaurant.latlng}
            animation={this.props.google.maps.Animation.DROP}
          />
        )}

        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3jqt7DCVczlq4PLZRp2UTjZCN5LqUGUM'
})(MapContainer)