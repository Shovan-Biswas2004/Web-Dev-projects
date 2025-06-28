
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {

  state={
    progress: 0
  }
  page = 10
  country = "us"
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color="#f11946"
        progress={this.state.progress}
        
      />
        <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress}  key="general" pageSize={this.page} country={this.country} category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={this.page} country={this.country} category="business" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={this.page} country={this.country} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={this.page} country={this.country} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={this.page} country={this.country} category="sports" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.page} country={this.country} category="entertainment" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={this.page} country={this.country} category="technology" />} />
        </Routes>
        </Router>
      </div>
    )
  }
}
