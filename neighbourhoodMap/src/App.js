import React from 'react'
import './App.css'
import MapContainer from './components/mapcontainer'
import ListPlaces from './components/listplaces'
import Restaurants from './data/locations.json'

class NeighbourhoodMapsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      restaurants: []
    };
    this.handleNavClick = this.handleNavClick.bind(this);
  }
  componentDidMount() {
    this.setState({restaurants: Restaurants})
  }
  /* Used to track the clicked property of the menu button and send it to the location list
   * so we know when to add the open class to the list
   * //https://stackoverflow.com/questions/42630473/react-toggle-class-onclick
   */
  handleNavClick() {
    const currentState = this.state.menuActive;
    this.setState({menuActive: !currentState});
  }
  render() {
    const {restaurants, menuActive} = this.state;
    return (
      <div className="main">
        <ListPlaces
          menuActive={menuActive}
          restaurants={restaurants}
        />
        <MapContainer 
          onNavClick={this.handleNavClick}
          restaurants={restaurants}
        />
      </div>
    )
  }
}

export default NeighbourhoodMapsApp
