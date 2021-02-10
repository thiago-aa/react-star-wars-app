import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import People from './pages/Characters'
import Home from './pages/Home';
import Films from './pages/Films'
import Starships from './pages/Starships';
import Vehicles from './pages/Vehicles';
import Species from './pages/Species';
import Planets from './pages/Planets';
import './App.css'

function App() {
  return (
  <div>
    <BrowserRouter>
      <div className="menu">
        <Link to='/'>Films/Home</Link>
        <Link to='/characters'>Characters</Link>
        <Link to='/planets'>Planets</Link>
        <Link to='/starships'>Starships</Link>
        <Link to='/vehicles'>Vehicles</Link>
        <Link to='/species'>Species</Link>
      </div>
      <Switch>
        <Route path='/' component={Films} exact/>
        <Route path='/characters' component={People}/>
        <Route path='/films' component={Films}/>
        <Route path='/starships' component={Starships}/>
        <Route path='/vehicles' component={Vehicles}/>
        <Route path='/species' component={Species}/>
        <Route path='/planets' component={Planets}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;

