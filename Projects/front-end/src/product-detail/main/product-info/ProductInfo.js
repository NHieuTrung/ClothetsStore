import React from 'react';
import NumberFormat from 'react-number-format';

class ProductInfo extends React.Component{
    render() {
        return (
            <div className="col-md-6">
                <div className="product-body">
                    <div className="product-label">
                        <span>New</span>
                        <span className="sale">-20%</span>
                    </div>
                    <h2 className="product-name">{this.props.itemName}</h2>
                    { 
                        this.props.itemDiscount === null ?
                        <h3 className="product-price"><NumberFormat value={this.props.itemPrice} displayType={'text'} thousandSeparator={true}/></h3> :
                        <h3 className="product-price">{this.props.itemPrice - (this.props.itemPrice * this.props.itemDiscount / 100)} <del className="product-old-price">${this.props.itemPrice}</del></h3>
                    }
                    {/* <div>
                        <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                        </div>
                        <a href=" #">3 Review(s) / Add Review</a>
                    </div> */}
                    <p><strong>Availability:</strong> In Stock</p>
                    <p><strong>Brand:</strong> E-SHOP</p>
                    <p>{this.props.itemDetail}</p>
                    <div className="product-options">
                        <ul className="size-option">
                            <li><span className="text-uppercase">Size:</span></li>
                            <li className="active"><a href=" #">S</a></li>
                            <li><a href=" #">XL</a></li>
                            <li><a href=" #">SL</a></li>
                        </ul>
                        <ul className="color-option">
                            <li><span className="text-uppercase">Color:</span></li>
                            <li className="active"><a href=" #" style={{backgroundColor: '#475984'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#8A2454'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#BF6989'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#9A54D8'}}> </a></li>
                        </ul>
                    </div>

                    <div className="product-btns">
                        <div className="qty-input">
                            <span className="text-uppercase">QTY: </span>
                            <input className="input" type="number" />
                        </div>
                        <button className="primary-btn add-to-cart"><i className="fa fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
                        <div className="pull-right">
                            <button className="main-btn icon-btn"><i className="fa fa-heart"></i></button>
                            <button className="main-btn icon-btn"><i className="fa fa-exchange"></i></button>
                            <button className="main-btn icon-btn"><i className="fa fa-share-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductInfo;