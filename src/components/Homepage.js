import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	grid: {
	  height: '100%'
	},
	content: {
	  height: '100%',
	  display: 'flex',
	  flexDirection: 'column'
	},
	title: {
	  marginTop: theme.spacing(3)
	}
})

class Homepage extends Component {
	constuctor(props){
		this.geolocate = this.geolocate.bind(this);
	}

	componentDidMount(){
		this.geolocate()
	}

	geolocate(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				let geolocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				}
				const requestOptions = {
				    method: 'GET'
				};
				fetch(`https://api.weather.gov/points/${geolocation.lat},${geolocation.lng}`, requestOptions)
					.then(response => response.json())
					.then(data => {

						fetch(data.properties.forecast)
							.then(response => response.json())
							.then(data => {
								console.log(data);
						})
				})
			})
		}
	}

	render(){
		const classes = this.props;
		return(
			<Grid
				className={classes.grid}
			  container
			>
				<Grid
					className={classes.content}
				  item
				  lg={7}
				  xs={12}
				>
				<h1 className={classes.title}>Cadre Weather</h1>
				<SearchBar/>
				</Grid>
			</Grid>
			)
	}

}

export default withStyles(styles)(Homepage); 