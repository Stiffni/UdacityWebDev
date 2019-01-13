import React from 'react'
import './App.css'
import MapContainer from './components/mapcontainer'
import ListPlaces from './components/listplaces'

class NeighbourhoodMapsApp extends React.Component {
  //https://stackoverflow.com/questions/42630473/react-toggle-class-onclick
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false
    };
    this.handleNavClick = this.handleNavClick.bind(this);
  }
  handleNavClick() {
    console.log(this.state)
    const currentState = this.state.menuActive;
    this.setState({ menuActive: !currentState });
  };  
  render() {
    return (
      <div className="main">
        <ListPlaces
          menuActive={this.state.menuActive}
        />
        <MapContainer 
          onNavClick={this.handleNavClick}
        />
      </div>
    )
  }
}

export default NeighbourhoodMapsApp
