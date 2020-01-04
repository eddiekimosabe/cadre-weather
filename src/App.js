import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage'
import {Router} from 'react-router-dom';
import TodayForecast from './components/TodayForecast';
import SevenDayForecast from './components/SevenDayForecast';
import ForecastLayout from './components/Layout/ForecastLayout';
import RouteWithLayout from './RouteWithLayout';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}> 
      <Switch>
        <Route exact path='/' component={Homepage}/>
        
        <RouteWithLayout
                          component={TodayForecast}
                          exact
                          layout={ForecastLayout}
                          path="/weather/today/:geolocation"
                        /> 
        <RouteWithLayout
                          component={SevenDayForecast}
                          exact
                          layout={ForecastLayout}
                          path="/weather/7day/:geolocation"
                        />
      </Switch>
    </Router>
  );
}

export default App;