import React from 'react';

function Footer() {
     return (
        <div>
            {/* <!-- FOOTER --> */}
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        {/* <!-- footer widget --> */}
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="footer">
                                {/* <!-- footer logo --> */}
                                <div className="footer-logo">
                                    <a className="logo" href="/#">
                                        <img src="./img/logo.png" alt="" />
                                    </a>
                                </div>
                                {/* <!-- /footer logo --> */}

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>

                                {/* <!-- footer social --> */}
                                <ul className="footer-social">
                                    <li><a href="/#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="/#"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                                {/* <!-- /footer social --> */}
                            </div>
                        </div>
                        {/* <!-- /footer widget --> */}

                        {/* <!-- footer widget --> */}
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-header">My Account</h3>
                                <ul className="list-links">
                                    <li><a href="/#">My Account</a></li>
                                    <li><a href="/#">My Wishlist</a></li>
                                    <li><a href="/#">Compare</a></li>
                                    <li><a href="/#">Checkout</a></li>
                                    <li><a href="/#">Login</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /footer widget --> */}

                        <div className="clearfix visible-sm visible-xs"></div>

                        {/* <!-- footer widget --> */}
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-header">Customer Service</h3>
                                <ul className="list-links">
                                    <li><a href="/#">About Us</a></li>
                                    <li><a href="/#">Shiping & Return</a></li>
                                    <li><a href="/#">Shiping Guide</a></li>
                                    <li><a href="/#">FAQ</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /footer widget --> */}

                        {/* <!-- footer subscribe --> */}
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="footer">
                                <h3 className="footer-header">Stay Connected</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                <form>
                                    <div className="form-group">
                                        <input className="input" placeholder="Enter Email Address" />
                                    </div>
                                    <button className="primary-btn">Join Newslatter</button>
                                </form>
                            </div>
                        </div>
                        {/* <!-- /footer subscribe --> */}
                    </div>
                    {/* <!-- /row --> */}
                    <hr />
                    {/* <!-- row --> */}
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 text-center">
                            {/* <!-- footer copyright --> */}
                            <div className="footer-copyright">
                                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                                Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
                                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                            </div>
                            {/* <!-- /footer copyright --> */}
                        </div>
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            {/* <!-- /FOOTER --> */}
        </div>
    );
}

export default Footer;
