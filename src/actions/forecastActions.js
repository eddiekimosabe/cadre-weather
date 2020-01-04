import { forecastConstants } from '../constants/forecastConstants';

export const forecastActions = {
	getForecasts
}

function getForecasts(geolocation){
	return dispatch => {
		dispatch(request());
		const requestOptions = {
		    method: 'GET'
		};

		fetch(`https://api.weather.gov/points/${geolocation}`, requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log(data, "DATA FIRST FETCH")
				dispatch(pointsSuccess(data.properties))
				
				const forecastZone = data.properties.forecastZone.match(/[^/]*$/)
				fetch(`https://api.weather.gov/alerts/active?zone=${forecastZone}`)
					.then(response => response.json())
					.then(data => {
								const feature = data.features[0]
								feature ? dispatch(alertSuccess(feature.properties)) : dispatch(alertClear())
					})

				fetch(data.properties.forecast)
					.then(response => response.json())
					.then(data => {
						console.log(data, "DATA SECOND FETCH")
						dispatch(forecastSuccess(data.properties))
				})

				fetch(data.properties.forecastHourly)
					.then(response => response.json())
					.then(data => {
						dispatch(hourlySuccess(data.properties))
				})

			})
	}
	function request() { return { type: forecastConstants.GET_ALL_REQUEST } }
	function pointsSuccess(data) { return { type: forecastConstants.GET_POINTS_SUCCESS, data } }
	function forecastSuccess(data) { return { type: forecastConstants.GET_ALL_SUCCESS, data } }
	function hourlySuccess(data) { return { type: forecastConstants.GET_HOURLY_SUCCESS, data } }
	function alertSuccess(data) { return { type: forecastConstants.GET_ALERT_SUCCESS, data } }
	function alertClear() { return { type: forecastConstants.ALERT_CLEAR } }
	function failure(error) { return { type: forecastConstants.GET_ALL_FAILURE, error } }
}
