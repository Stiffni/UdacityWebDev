import React, {Component} from 'react'

class Navigation extends Component {
  /* Since we only show the hamburger menu on small viewports, I'm only
   * focusing it if we're on a small window
  */
  componentDidMount() {
    if(window.innerWidth < 650) {
      this.navButton.focus();
    }
  }
  render() {
    return (
      <div className="navigation">
        <button
          className="menu"
          ref={(button) => {this.navButton = button;}}
          aria-label="Show or Hide Locations Dialog"
          onClick={this.props.onNavClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"></path>
          </svg>
        </button>
      </div>
    );
  }
}
 
export default Navigation