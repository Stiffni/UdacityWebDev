import React, {Component} from 'react'
import classNames from 'classnames'
import Navigation from './navigation'

class ListPlaces extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: '',
      menuActive: false
    }
    this.handleNavClick = this.handleNavClick.bind(this);
  }  
  /* Since we only show the list on the page if the page is large or the menu
   * is open, I am only focusing the first list item when it loads up and we
   * have a large window or we have the menu flyout open. I am purposely only
   * setting this focus when the page loads or the flyout comes out and not on
   * resize, because I don't want something the user may have clicked on in
   * a large window mode to come out of focus if they shrink their browser window
  */
  componentDidMount() {
    if(window.innerWidth >= 650) {
      this.filter.focus();
    }
  }
  handleFilterChange(e) {
    this.setState({
      input: e.target.value
    })
    this.props.onFilterChange(e.target.value);
  }
  listItemClickHandler(name) {
    this.props.OnlistItemClickHandler(name);
  }
  handleNavClick() {
    const currentState = this.state.menuActive;
    this.setState({menuActive: !currentState});
  }
  render() {
    const {restaurants} = this.props;
    const {menuActive, input} = this.state;
    return (
      <div>
        <Navigation 
          onNavClick={this.handleNavClick}
        />
        <div className={classNames("list-places",menuActive ? 'open': null)} //Add open class if the menu was clicked, so we can show the list
          aria-label='Locations'>
          <h1 className="fav">My Fav Eats</h1>
          <input
            value={input}
            type="text"
            aria-label="Filter restaurants"
            placeholder="Filter"
            ref={(filter) => {this.filter = filter;}}
            onChange={this.handleFilterChange.bind(this)}
          >
          </input>
          <ul>
            {restaurants.map((restaurant) =>
              <li
                key={restaurant.id}
                onClick={() => this.listItemClickHandler(restaurant.name)}
                tabIndex='1'
              >
                <h2>{restaurant.name}</h2>
                <h3>{restaurant.category}</h3>
              </li>
            )}
            {restaurants.length === 0 && 
              <li>
                <h2>No results found</h2>
              </li>
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default ListPlaces
