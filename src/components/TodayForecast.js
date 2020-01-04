import React, {Component} from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
    display: 'flex',
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    maxHeight: 400 
  },
  fixedHeight: {
    height: 240,
  },
});

class TodayForecast extends Component{
	constructor(props){
		super(props);
		this.adjustTime = this.adjustTime.bind(this);
	}

	adjustTime(timeString){
		const time = new Date(timeString);
		return time.toLocaleTimeString('en-US', {hour12:true, weekday:'short', hour:'numeric', minute:'numeric', timezone:'America/New_York'});
	}

	render(){
		const {currentCity, currentState, currentPeriod, hourlyPeriods, alert, classes} = this.props
		if(!currentPeriod){
			return <span>LOADING</span>;
		}
		return(
			<div>
			<Grid item xs={12}>
			  <Paper className={classes.paper}>
			  	<h3>
					{currentCity},{currentState}
			  	</h3>

			  	<h2>
					{currentPeriod.temperature + '\u00B0' +currentPeriod.temperatureUnit}
			  	</h2>

			  	<h3>
					{alert}
					</h3>
			  </Paper>
			</Grid>
			<Grid item xs={12}>
			  <Paper className={classes.paper}>
			  <Table>
			  	<TableHead>
			  		<TableRow>
			  			<TableCell>Time</TableCell>
			  			<TableCell>Description</TableCell>
			  			<TableCell>Temp</TableCell>
			  			<TableCell>Wind</TableCell>
			  			<TableCell></TableCell>
			  		</TableRow>
			  	</TableHead>

			  	<TableBody>
			  		{hourlyPeriods.map(period => (
			  		                <TableRow
			  		                  hover
			  		                  key={period.number}
			  		                  id={period.number}
			  		                >
			  		                  <TableCell>{this.adjustTime(period.startTime)}</TableCell>
			  		                  <TableCell>{period.shortForecast}</TableCell>
			  		                  <TableCell>{period.temperature}&#176;{period.temperatureUnit}</TableCell>
			  		                  <TableCell>{period.windDirection} {period.windSpeed}</TableCell>
			  											<TableCell><img src={period.icon} alt={period.shortForecast}/></TableCell>
			  			            	</TableRow>
			  		               ))}
			  	</TableBody>
			  </Table>
			  </Paper>
			</Grid>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const {currentPeriod, hourlyPeriods, currentCity, currentState, alert, classes} = state.forecasts;
	return {
		currentCity,
		currentState,
		currentPeriod,
		hourlyPeriods,
		alert,
		classes
	}
}

export default connect(mapStateToProps)(withStyles(styles)(TodayForecast));