import React from 'react'
import './App.css'
import MapContainer from './components/mapcontainer'
import ListPlaces from './components/listplaces'
import Restaurants from './data/locations.json'
import * as FoursquareAPI from './fourSquareAPI'

class NeighbourhoodMapsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRestaurants: [],
      clickedListRestaurantName: '',
      allMarkers: [],
      activeMarker: {},
      showingInfoWindow: false,
      selectedPlace: {},
      map: {}
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.listItemClickHandler = this.listItemClickHandler.bind(this);
    this.setAppMarkerState = this.setAppMarkerState.bind(this);
    this.setAppMapState = this.setAppMapState.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }
  
  componentDidMount() {
    for(let i=0; i<Restaurants.length; i++) {
      FoursquareAPI.get(Restaurants[i].name, Restaurants[i].latlng.lat, Restaurants[i].latlng.lng).then(result => {
          if(result.response.venues.length > 0 && result.response.venues[0].location.address) {
            Restaurants[i].address = result.response.venues[0].location.address;
          } else {
            Restaurants[i].address = 'Not found'
          }
          if(result.response.venues.length > 0 && result.response.venues[0].categories.length > 0 && result.response.venues[0].categories[0].shortName) {
            Restaurants[i].category = result.response.venues[0].categories[0].shortName;
          } else {
            Restaurants[i].category = 'Not found'
          }
          this.setState((prevState) => ({
            visibleRestaurants: prevState.visibleRestaurants.concat(Restaurants[i])
          }));
       })
    }
  }
  /* Filter the restaurants when someone types in the filter box
   * https://stackoverflow.com/questions/41436253/how-to-filter-list-while-typing-with-input-field
   */
  handleFilterChange(input) {
    let filteredResults = Restaurants
      .filter(restaurant => input === '' || restaurant.name.toLowerCase().includes(input.toLowerCase()))
      this.setState({
        visibleRestaurants: filteredResults
      });
  }
  listItemClickHandler(name) {
    this.setState({clickedListRestaurantName: name});
    let marker = this.state.allMarkers.filter((marker) => marker.name === name)[0];
    marker.map = this.state.map;
    this.handleMarkerClick({name:name}, marker);
  }
  /* Used to track the clicked property of the menu button and send it to the location list
   * so we know when to add the open class to the list
   * //https://stackoverflow.com/questions/42630473/react-toggle-class-onclick
   */
  setAppMarkerState(element) {
    if(element){
      this.setState((prevState) => {
        return {allMarkers: prevState.allMarkers.concat(element.marker)}
      })
    }
  }
  setAppMapState(element) {
    if(element){
      this.setState({map:element.map})
    }
  }
  handleMarkerClick(props, marker) {
    let showingRestaurant = Restaurants.filter((restaurant) => restaurant.name === props.name)[0]
    this.setState({
      selectedPlace:showingRestaurant,
      activeMarker:marker,
      showingInfoWindow:true
    });
  }
  handleMapClick(props) {
    this.setState({
      activeMarker:null,
      showingInfoWindow:false,
      selectedPlace:{}
    })
  }
  render() {
    return (
      <div className="main">
        <ListPlaces
          restaurants={this.state.visibleRestaurants}
          onFilterChange={this.handleFilterChange}
          OnlistItemClickHandler={this.listItemClickHandler}
        />
        <MapContainer
          onNavClick={this.handleNavClick}
          visRestaurants={this.state.visibleRestaurants}
          allRestaurants={Restaurants}
          clickedListRestaurantId={this.state.clickedListRestaurantName}
          setAppMarkerState={this.setAppMarkerState}
          onMarkerClick={this.handleMarkerClick}
          selectedPlace={this.state.selectedPlace}
          activeMarker={this.state.activeMarker}
          showingInfoWindow={this.state.showingInfoWindow}
          onMapClick={this.handleMapClick}
          setAppMapState={this.setAppMapState}
        />
      </div>
    )
  }
}

export default NeighbourhoodMapsApp
