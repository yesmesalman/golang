import "./styles/bootstrap.css"
import "./App.css"
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from './component/Home'
import OrderComplete from './component/OrderComplete'

export default function App() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Router>
            <Switch>
              <Route path="/OrderComplete">
                <OrderComplete />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}