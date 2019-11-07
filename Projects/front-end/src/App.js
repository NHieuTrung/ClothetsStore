import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Index from './index/Index';
import ProductList from './product-list/ProductList.js'
import ProductDetail from './product-detail/ProductDetail'
import Register from './login/Register'
import CartDetail from './cart-detail/Cart'

function App() {
     return (
        <Router>
            {/* Đăng ký */}
            <Route path="/register" component={Register}></Route>

            {/* Trang chủ */}
            <Route exact path="/" component={ Index }>
                <Header></Header>
                <Index></Index>
                <Footer></Footer>
            </Route>

            {/* Danh sách sp */}
            <Route path="/productlist" component={ ProductList }>
                <Header></Header>
                <ProductList></ProductList>
                <Footer></Footer>
            </Route>

            {/* Chi tiết sp */}
            <Route path="/product" component={ProductDetail}>
                <Header></Header>
                <ProductDetail></ProductDetail>
                <Footer></Footer>
            </Route>

            {/* Giỏ hàng */}
            <Route path="/cartdetail" component={CartDetail}>
                <Header></Header>
                <CartDetail></CartDetail>
                <Footer></Footer>
            </Route>
        </Router>
    );
}

export default App;
