import React from 'react'
import './App.css'
import MapContainer from './components/mapcontainer'
import ListPlaces from './components/listplaces'

class NeighbourhoodMapsApp extends React.Component {
  render() {
    return (
      <div className="flex-container">
        <ListPlaces />
        <MapContainer />
      </div>
    )
  }
}

export default NeighbourhoodMapsApp
