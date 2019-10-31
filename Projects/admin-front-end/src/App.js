import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import ListProduct from "./components/product/ListProduct";

function App() {
  return (
    <Router>
      <div id="wrapper">
        <Sidebar />

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            <Topbar />

            {/* Begin Page Content */}
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/product-page">
                <ListProduct />
              </Route>
              <Route path="/dashboard">
                <Home />
              </Route>
            </Switch>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}

          {/* Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2019</span>
              </div>
            </div>
          </footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
    </Router>
  );
}

export default App;
