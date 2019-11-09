import React from 'react';
import NumberFormat from 'react-number-format';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";

class Account extends React.Component {
    state = {
        cart: []
    }

    renderCart = () => {
        if(this.state.cart !== null)
        {
            const listItems = this.state.cart.map((item, idx) =>
                <div className="product product-widget" key={idx} style={{marginBottom: "35px"}}>
                    <div className="product-thumb">
                        <img src={"https://localhost:44376/" + item.imageUrl} alt="" />
                    </div>
                    <div className="product-body">
                        {/* <h3 className="product-price">{item.price}  */}
                        { 
                            item.discount === null ?
                            <h3 className="product-price">
                                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/>
                                <span className="qty"> x{item.quantity}</span>
                            </h3> :
                            <h3 className="product-price">
                                <NumberFormat value={item.price - (item.price * item.discount / 100)} displayType={'text'} thousandSeparator={true}/>&nbsp;
                                <del className="product-old-price"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></del>
                                <span className="qty"> x{item.quantity}</span>
                            </h3>
                        }
                        
                        <h2 className="product-name"><a href={"/product?id=" + item.productId}>{item.name}</a></h2>
                    </div>
                    <button className="cancel-btn" onClick={this.deleteProduct} id={"btn" + idx}><i className="fa fa-trash"></i></button>
                </div>
            );

            return listItems;
        }
    }

    renderTotalPrice = () => {
        if(this.state.cart !== null)
        {
            let totalPrice = 0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                totalPrice += item.discount === null ? item.price * item.quantity : (item.price - (item.price * item.discount / 100)) * item.quantity;
            })

            return <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true}/>;
        }
    }

    renderTotalProducts = () => {
        if(this.state.cart !== null)
        {
            let totalProducts = 0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                totalProducts += item.quantity;
            })

            return totalProducts;
        }
    }

    getAllProducts = () => {
        fetch(`https://localhost:44376/api/customer/product/getProductsForCart?carts=${localStorage.getItem("cart")}`)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    cart: res
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }

    deleteProduct = (e) => {
        let id = e.target.id;
        let number = id.substr(3, id.length - 3);

        let list = JSON.parse(localStorage.getItem("cart")) == null ? [] : JSON.parse(localStorage.getItem("cart"));
        if(list !== []) {
            list.splice(number, 1);
            localStorage.setItem("cart", JSON.stringify(list));
            window.location.reload();
        }
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
                            <strong className="text-uppercase">Tài khoản <i className="fa fa-caret-down"></i></strong>
                        </div>
                        <a href="/login" className="text-uppercase">Đăng nhập</a>
                        <ul className="custom-menu">
                            <li><a href="/register"><i className="fa fa-user-plus"></i> Đăng ký</a></li>
                            <li><a href="/#"><i className="fa fa-user-o"></i> My Account</a></li>
                            <li><a href="/#"><i className="fa fa-check"></i> Checkout</a></li>
                        </ul>
                    </li>
                    {/* <!-- /Account --> */}

                    {/* <!-- Cart --> */}
                    <li className="header-cart dropdown default-dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true" href="/#">
                            <div className="header-btns-icon">
                                <i className="fa fa-shopping-cart"></i>
                                <span className="qty">{this.renderTotalProducts()}</span>
                            </div>
                            <strong className="text-uppercase">Giỏ hàng</strong>
                            <br />
                            <span>{this.renderTotalPrice()}</span>
                        </a>
                        <div className="custom-menu">
                            <div id="shopping-cart">
                                {this.renderCart()}
                                <div className="shopping-cart-btns">
                                    <Link to={"/cartdetail"}>
                                        <button className="primary-btn">Thanh toán <i className="fa fa-arrow-circle-right"></i></button>
                                    </Link>
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