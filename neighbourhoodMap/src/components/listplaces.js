import React, {Component} from 'react'
import classNames from 'classnames'

class ListPlaces extends Component {
  constructor(){
    super();
    this.state = {
      input: ''
    }
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
  onChangeHandler(e) {
    this.setState({
      input: e.target.value
    })
  }
  listClickHandler() {

  }
  
  render() {
    const {restaurants, menuActive} = this.props;
    return (
      <div className={classNames("list-places",menuActive ? 'open': null)} //Add open class if the menu was clicked, so we can show the list
        aria-label='Locations'>
        <h1 className="fav">My Fav Eats</h1>
        <input
          value={this.state.input}
          type="text"
          aria-label="Filter restaurants"
          placeholder="Filter"
          ref={(filter) => {this.filter = filter;}}
          onChange={this.onChangeHandler.bind(this)}
        >
        </input>
        <ul>
          {restaurants.map((restaurant,index) =>
            <li
              key={restaurant.id}
              onClick={this.listClickHandler}
              tabIndex='1'
            >
              <h2>{restaurant.name}</h2>
              <h3>{restaurant.address}</h3>
              <h3>{restaurant.category}</h3>
            </li>
          )}
        </ul>
      </div>
    )
  }
}
export default ListPlaces
