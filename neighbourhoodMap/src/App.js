import React from 'react'
import './App.css'
import MapContainer from './components/mapcontainer'
import ListPlaces from './components/listplaces'
import Restaurants from './data/locations.json'

class NeighbourhoodMapsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRestaurants: [],
      clickedListRestaurantId: ''
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.listItemClickHandler = this.listItemClickHandler.bind(this);
  }
  componentDidMount() {
    this.setState({
      visibleRestaurants: Restaurants
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
  listItemClickHandler(id) {
    this.setState({clickedListRestaurantId: id})
  }
  /* Used to track the clicked property of the menu button and send it to the location list
   * so we know when to add the open class to the list
   * //https://stackoverflow.com/questions/42630473/react-toggle-class-onclick
   */

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
          clickedListRestaurantId={this.state.clickedListRestaurantId}
        />
      </div>
    )
  }
}

export default NeighbourhoodMapsApp
