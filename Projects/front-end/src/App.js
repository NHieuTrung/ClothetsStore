import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Index from './index/Index';
import ProductList from './product-list/ProductList.js'

function App() {
     return (
        <Router>
            <div>
                <Header></Header>
                <Route exact path="/" component={ Index } />
                <Route path="/productlist" component={ ProductList } />
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
