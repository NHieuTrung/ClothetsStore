import React from 'react';

class Account extends React.Component {

    render() {
        return (
            // {/* <!-- footer widget --> */}
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
            // {/* <!-- /footer widget --> */}
        )
    }
}

export default Account;