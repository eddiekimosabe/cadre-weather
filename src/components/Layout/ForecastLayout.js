import React, {Component} from 'react';
import { connect } from 'react-redux';
import { forecastSelectors } from '../../selectors/forecastSelectors';
import { forecastActions } from '../../actions/forecastActions';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchBar from '../SearchBar';

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


class ForecastLayout extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: 0
		};
		this.handleTab = this.handleTab.bind(this);
	}

	componentDidMount(){
		this.props.getForecasts(this.props.children.props.match.params.geolocation);
	}

	handleTab(event, value){
		console.log(value)
		this.setState({value})
	}

	render(){
		const {children, classes} = this.props
		debugger;
		return(
			<div className={classes.root}>
				<Grid container spacing={3}>
					<SearchBar/>
					<Grid item xs={12}>
						<Tabs
						value={this.state.value}
						onChange={this.handleTab}
						indicatorColor="primary"
						textColor="primary"
						>
						  <Tab label="Today" component={Link} to={`/weather/today/${children.props.match.params.geolocation}`} />
						  <Tab label="7 Day" component={Link} to={`/weather/7day/${children.props.match.params.geolocation}`} />
						</Tabs>
					</Grid>
					<div>
						{children}
					</div>
				</Grid>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const {classes} = state.forecasts;
	return {
		classes
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getForecasts: (geolocation) => dispatch(forecastActions.getForecasts(geolocation))
	}
}
	
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ForecastLayout));