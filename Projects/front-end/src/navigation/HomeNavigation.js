import React from 'react';

class HomeNavigation extends React.Component {

    render() {
        return (
            // <!-- NAVIGATION -->
            <div id="navigation">
                {/* <!-- container --> */}
                <div className="container">
                    <div id="responsive-nav">
                        {/* <!-- category nav --> */}
                        <div className="category-nav">
                            <span className="category-header">Danh mục <i className="fa fa-list"></i></span>
                            <ul className="category-list">
                            <li><a href="/productlist">Tất cả</a></li>
                                <li><a href="/productlist?productGenderId=006333C4-68BF-4954-B886-DD5E342E3938">Nam</a></li>
                                <li><a href="/productlist?productGenderId=D0BBA5FE-BD96-4A29-87F2-A3D4E63F974A">Nữ</a></li>
                                {/* <li className="dropdown side-dropdown"><a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" href="/#">Phones & Accessories <i className="fa fa-angle-right"></i></a>
                                    <div className="custom-menu">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <ul className="list-links">
                                                    <li>
                                                        <h3 className="list-links-title">Categories</h3></li>
                                                    <li><a href="/#">Women’s Clothing</a></li>
                                                    <li><a href="/#">Men’s Clothing</a></li>
                                                    <li><a href="/#">Phones & Accessories</a></li>
                                                    <li><a href="/#">Jewelry & Watches</a></li>
                                                    <li><a href="/#">Bags & Shoes</a></li>
                                                </ul>
                                                <hr />
                                                <ul className="list-links">
                                                    <li>
                                                        <h3 className="list-links-title">Categories</h3></li>
                                                    <li><a href="/#">Women’s Clothing</a></li>
                                                    <li><a href="/#">Men’s Clothing</a></li>
                                                    <li><a href="/#">Phones & Accessories</a></li>
                                                    <li><a href="/#">Jewelry & Watches</a></li>
                                                    <li><a href="/#">Bags & Shoes</a></li>
                                                </ul>
                                                <hr className="hidden-md hidden-lg" />
                                            </div>
                                            <div className="col-md-4">
                                                <ul className="list-links">
                                                    <li>
                                                        <h3 className="list-links-title">Categories</h3></li>
                                                    <li><a href="/#">Women’s Clothing</a></li>
                                                    <li><a href="/#">Men’s Clothing</a></li>
                                                    <li><a href="/#">Phones & Accessories</a></li>
                                                    <li><a href="/#">Jewelry & Watches</a></li>
                                                    <li><a href="/#">Bags & Shoes</a></li>
                                                </ul>
                                                <hr />
                                                <ul className="list-links">
                                                    <li>
                                                        <h3 className="list-links-title">Categories</h3></li>
                                                    <li><a href="/#">Women’s Clothing</a></li>
                                                    <li><a href="/#">Men’s Clothing</a></li>
                                                    <li><a href="/#">Phones & Accessories</a></li>
                                                    <li><a href="/#">Jewelry & Watches</a></li>
                                                    <li><a href="/#">Bags & Shoes</a></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-4 hidden-sm hidden-xs">
                                                <a className="banner banner-2" href="/#">
                                                    <img src="/assets//img/banner04.jpg" alt="" />
                                                    <div className="banner-caption">
                                                        <h3 className="white-color">NEW<br />COLLECTION</h3>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                        {/* <!-- /category nav --> */}

                        {/* <!-- menu nav --> */}
                        <div className="menu-nav">
                            <span className="menu-header">Menu <i className="fa fa-bars"></i></span>
                            <ul className="menu-list">
                            <li><a href="/">Trang chủ</a></li>
                                <li><a href="/productlist">Sản phẩm</a></li>
                                <li><a href="/productlist?productGenderId=006333C4-68BF-4954-B886-DD5E342E3938">Nam</a></li>
                                <li><a href="/productlist?productGenderId=D0BBA5FE-BD96-4A29-87F2-A3D4E63F974A">Nữ</a></li>
                                {/* <li><a href="/#">Sales</a></li> */}
                            </ul>
                        </div>
                        {/* <!-- menu nav --> */}
                    </div>
                </div>
                {/* <!-- /container --> */}
            </div>
            // <!-- /NAVIGATION -->
        );
    }
}

export default HomeNavigation;
