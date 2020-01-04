export const forecastSelectors = {
	getHighLow
}

function getHighLow(state){
	const timeMarkers = ['Today', 'This Afternoon', 'Tonight', 'Overnight']
	const timeMarkerPeriods = state.forecasts.dailyPeriods.filter( forecast => timeMarkers.includes(forecast.name))

	return !state.forecasts.currentPeriod.isDaytime ? {high: null, low:state.forecasts.dailyPeriods[0].temperature+state.forecasts.dailyPeriods[0].temperatureUnit} : {}
}