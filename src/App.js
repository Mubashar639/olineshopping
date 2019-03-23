import React, { Component } from 'react';
import './App.css';
import Upload from "./compunent/uploadadd"
import Appbar from './compunent/Appbar';
import Gallery from "./compunent/gallery";
import {  Switch,BrowserRouter, Route } from "react-router-dom";
import Detail from './compunent/details';
import Selected from './compunent/selected';
import Login from './compunent/login';
import Register from './compunent/Register';

class App extends Component {


  render() {
    console.log(this.props.array)
    return (
      <BrowserRouter>
        <div className="App">
          <header>
         
            <Appbar />
          </header>
        <Switch>
       <Route exact path="/details/:pti" component={Detail}/>
       <Route  exact path="/selected" component={Selected}/>
       <Route  path="/login" component={Login}/>
       <Route  path="/upload" component={Upload}/>
       <Route  path="/register" component={Register}/>

        <Route path="/" component={Gallery} />
        </Switch>
        </div>
      </BrowserRouter>
     
    );
  }
}
export default App

