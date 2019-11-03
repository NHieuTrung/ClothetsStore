import React from 'react';

class Account extends React.Component {
    state = {
        cart: []
    }
    renderCart = () => {
        if(this.state.cart !== null)
        {
            const listItems = this.state.cart.map((item, idx) =>
                <div className="product product-widget" key={idx}>
                    <div className="product-thumb">
                        <img src="/assets/img/thumb-product01.jpg" alt="" />
                    </div>
                    <div className="product-body">
                        <h3 className="product-price">$32.50 <span className="qty">x3</span></h3>
                        <h2 className="product-name"><a href="/#">Product Name Goes Here</a></h2>
                    </div>
                    <button className="cancel-btn"><i className="fa fa-trash"></i></button>
                </div>
            );

            return listItems;
        }
    }

    getAllProducts = () => {
        this.setState({
            cart: JSON.parse(localStorage.getItem("cart"))
        })
    }

    componentDidMount = () => {
        this.getAllProducts();
    }

    render() {
        return (
            <div className="pull-right">
                <ul className="header-btns">
                    {/* <!-- Account --> */}
                    <li className="header-account dropdown default-dropdown">
                        <div className="dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="true">
                            <div className="header-btns-icon">
                                <i className="fa fa-user-o"></i>
                            </div>
                            <strong className="text-uppercase">My Account <i className="fa fa-caret-down"></i></strong>
                        </div>
                        <a href="/#" className="text-uppercase">Login</a> / <a href="/#" className="text-uppercase">Join</a>
                        <ul className="custom-menu">
                            <li><a href="/#"><i className="fa fa-user-o"></i> My Account</a></li>
                            <li><a href="/#"><i className="fa fa-heart-o"></i> My Wishlist</a></li>
                            <li><a href="/#"><i className="fa fa-exchange"></i> Compare</a></li>
                            <li><a href="/#"><i className="fa fa-check"></i> Checkout</a></li>
                            <li><a href="/#"><i className="fa fa-unlock-alt"></i> Login</a></li>
                            <li><a href="/#"><i className="fa fa-user-plus"></i> Create An Account</a></li>
                        </ul>
                    </li>
                    {/* <!-- /Account --> */}

                    {/* <!-- Cart --> */}
                    <li className="header-cart dropdown default-dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" href="/#">
                            <div className="header-btns-icon">
                                <i className="fa fa-shopping-cart"></i>
                                <span className="qty">3</span>
                            </div>
                            <strong className="text-uppercase">My Cart:</strong>
                            <br />
                            <span>35.20$</span>
                        </a>
                        <div className="custom-menu">
                            <div id="shopping-cart">
                                {this.renderCart()}
                                <div className="shopping-cart-btns">
                                    <button className="main-btn">View Cart</button>
                                    <button className="primary-btn">Checkout <i className="fa fa-arrow-circle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* <!-- /Cart --> */}

                    {/* <!-- Mobile nav toggle--> */}
                    <li className="nav-toggle">
                        <button className="nav-toggle-btn main-btn icon-btn"><i className="fa fa-bars"></i></button>
                    </li>
                    {/* <!-- / Mobile nav toggle --> */}
                </ul>
            </div>
        )
    }
}

export default Account;