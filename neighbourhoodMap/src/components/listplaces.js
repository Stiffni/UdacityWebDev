import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';

class ListPlaces extends Component {
  render() {
    return (
      <div className={classNames("list-places",this.props.menuActive ? 'open': null)}>
        ListPlaces
      </div>
    )
  }
}
export default ListPlaces