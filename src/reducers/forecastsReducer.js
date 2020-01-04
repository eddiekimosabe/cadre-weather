import { forecastConstants } from '../constants/forecastConstants';
const initialState = {
	currentPeriod: null,
	dailyPeriods: [],
	hourlyPeriods: [],
	zoneId: null,
	alert: null
};

function forecasts(state=initialState, action){
	switch(action.type) {
		case forecastConstants.GET_ALL_REQUEST:
			return {
				...state,
				loading: true
			};
		case forecastConstants.GET_ALL_SUCCESS:
			console.log(action.data, "DATA")
			return {
				...state,
				dailyPeriods: action.data.periods,
				loading: false
			};
		case forecastConstants.GET_ALL_FAILURE:
			return {
				...state,
				error: action.error,
				loading: false
			};
		case forecastConstants.GET_ALERT_SUCCESS:
			return {
				...state,
				alert: action.data.headline
			}
		case forecastConstants.CLEAR_ALERT:
			return {
				...state,
				alert: null
			}
		case forecastConstants.GET_HOURLY_SUCCESS:
			console.log(action.data, "DATA")
			return {
				...state,
				currentPeriod: action.data.periods[0],
				hourlyPeriods: action.data.periods.slice(0,12),
				loading: false
			};	
		case forecastConstants.GET_POINTS_SUCCESS:
			console.log(action.data, "DATA")
			return {
				...state,
				currentState: action.data.relativeLocation.properties.state,
				currentCity: action.data.relativeLocation.properties.city,
				loading: false
			};	
		default:
			return state;
	}
}

export default forecasts;