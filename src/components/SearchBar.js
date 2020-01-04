import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

/* global google */

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    this.props.history.push(`/weather/today/${place.geometry.location.lat()},${place.geometry.location.lng()}`)
  }

  render() {
    return (
    	<TextField 
    		variant="outlined"
    		inputRef={this.autocompleteInput}
    		id="autocomplete"
    		placeholder="Enter your address"
    	/>
    );
  }
}

export default withRouter(SearchBar);