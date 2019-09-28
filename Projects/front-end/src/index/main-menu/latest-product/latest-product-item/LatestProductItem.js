import React from 'react';

class LatestProductItem extends React.Component {
    render() {
        let imgUrl = "/assets/img/product0" + this.props.id + ".jpg";

        return (
            // {/* <!-- Product Single --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="product product-single">
                    <div className="product-thumb">
                        <button className="main-btn quick-view"><i className="fa fa-search-plus"></i> Quick view</button>
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="product-body">
                        <h3 className="product-price">$32.50</h3>
                        <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o empty"></i>
                        </div>
                        <h2 className="product-name"><a href=" #">Product Name Goes Here</a></h2>
                        <div className="product-btns">
                            <button className="main-btn icon-btn"><i className="fa fa-heart"></i></button>
                            <button className="main-btn icon-btn"><i className="fa fa-exchange"></i></button>
                            <button className="primary-btn add-to-cart"><i className="fa fa-shopping-cart"></i> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            // {/* <!-- /Product Single --> */}
        )
    }
}

export default LatestProductItem;
