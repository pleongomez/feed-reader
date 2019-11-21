import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from 'react-bootstrap';
import FeedList from './components/feedList';
import FeedSearch from './components/feedSearch';
import FeedDetail from './components/feedDetail';
import {connect} from 'react-redux';


class  App extends Component {
  render(){
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="container">
            <div className="navbar-header">
            <a href="/#" className="navbar-brand">Feed Reader</a>
            </div>
          </div>
        </nav>
  
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <FeedList/>
              <FeedSearch/>
            </div>
            <div className="col-md-8">
              <FeedDetail />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    
  }
}


const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
