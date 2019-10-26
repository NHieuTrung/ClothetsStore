import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Index from './index/Index';
import ProductList from './product-list/ProductList.js'
import ProductDetail from './product-detail/ProductDetail'

function App() {
     return (
        <Router>
            <div>
                <Header></Header>
                <Route exact path="/" component={ Index } />
                <Route path="/productlist" component={ ProductList } />
                <Route path="/product" component={ProductDetail}/>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
