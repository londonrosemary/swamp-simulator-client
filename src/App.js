import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router} from "react-router-dom";

import AuthenticatedApp from "./AuthenticatedApp.js"
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  // did this work?
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"))

  if (isLoggedIn === false) {
    return(
      <Router>
        <UnauthenticatedApp />
      </Router>
    )}
  else {
    return(
      <Router>
        <AuthenticatedApp />
      </Router>
    )}
}

export default App;
