import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Index from './index/Index';
import ProductList from './product-list/ProductList.js'
import ProductDetail from './product-detail/ProductDetail'
import Register from './account/Register'
import Login from './account/Login'
import Information from './account/Information'
import CartDetail from './cart-detail/Cart'
import Delivery from './delivery/Deliverry'

function App() {
     return (
        <Router>
            {/* Đăng ký */}
            <Route path="/register" component={Register}></Route>

            {/* Đăng nhập */}
            <Route path="/login" component={Login}></Route>

            {/* Thông tin */}
            <Route path="/information" component={Information}></Route>

            {/* Trang chủ */}
            <Route exact path="/">
                <Header></Header>
                <Index></Index>
                <Footer></Footer>
            </Route>

            {/* Danh sách sp */}
            <Route path="/productlist">
                <Header></Header>
                <ProductList></ProductList>
                <Footer></Footer>
            </Route>

            {/* Chi tiết sp */}
            <Route path="/product">
                <Header></Header>
                <ProductDetail></ProductDetail>
                <Footer></Footer>
            </Route>

            {/* Giỏ hàng */}
            <Route path="/cartdetail">
                <Header></Header>
                <CartDetail></CartDetail>
                <Footer></Footer>
            </Route>
            {/*thanh toan*/}
            <Route path="/delivery">
                <Header></Header>
                <Delivery></Delivery>
                <Footer></Footer>
            </Route>
        </Router>
    );
}

export default App;
