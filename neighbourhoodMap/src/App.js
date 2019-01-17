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
    //Check API First so we don't loop over a failing API
    FoursquareAPI.get('someplace', '43.451474', '-80.494139').then(() => {
      for(let i=0; i<Restaurants.length; i++) {
        Restaurants[i].address = 'Not found' //Set some initial data
        Restaurants[i].category = 'Not found'
        //Get data from foursquare that we can display later
        FoursquareAPI.get(Restaurants[i].name, Restaurants[i].latlng.lat, Restaurants[i].latlng.lng).then(result => {
          if(result.response.venues.length > 0 && result.response.venues[0].location.address) {
            Restaurants[i].address = result.response.venues[0].location.address;
          }
          if(result.response.venues.length > 0 && result.response.venues[0].categories.length > 0 && result.response.venues[0].categories[0].shortName) {
            Restaurants[i].category = result.response.venues[0].categories[0].shortName;
          }
          this.setState((prevState) => ({
            visibleRestaurants: prevState.visibleRestaurants.concat(Restaurants[i])
          }));
        }).catch((err) => { //Still catch here just in case the api fails after we checked it initially
          alert('Unable to get response from FourSquare, some page data may be missing! ' + err);
        })
      }
    }).catch((err) => {
      alert('Unable to get response from FourSquare, some page data may be missing! ' + err);
    })
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
  //When someone clicks on a list item, call the same method we would call as if they clicked on a marker, and pass the right marker to it
  listItemClickHandler(name) {
    this.setState({clickedListRestaurantName: name});
    let marker = this.state.allMarkers.filter((marker) => marker.name === name)[0];
    marker.map = this.state.map;
    this.handleMarkerClick({name:name}, marker);
  }
  /* Used to track the clicked property of the hambruger menu button and send it to the location list
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
  //Show InfoWindow when someone clicks on a marker or list item
  handleMarkerClick(props, marker) {
    let showingRestaurant = Restaurants.filter((restaurant) => restaurant.name === props.name)[0]
    this.setState({
      selectedPlace:showingRestaurant,
      activeMarker:marker,
      showingInfoWindow:true
    });
  }
  //Hide InfoWindow when the map is clicked
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
