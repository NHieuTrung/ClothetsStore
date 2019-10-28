import React from 'react';  
import ProductImage from './product-image/ProductImage'
import ProductInfo from './product-info/ProductInfo'
import ProductReview from './product-review/ProductReview'

class Main extends React.Component {
    state = {
        item: ''
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            item: nextProps.item,
        });
    }

    render() {
        return (
            // {/* <!-- MAIN --> */}
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        {/* <!--  Product Details --> */}
                        <div className="product product-details clearfix">
                            <ProductImage></ProductImage>
                            <ProductInfo itemName={this.state.item.name} itemPrice={this.state.item.price} itemDetail={this.state.item.detail} itemDiscount={this.state.item.discount}></ProductInfo>
                            <ProductReview></ProductReview>
                        </div>
                        {/* <!-- /Product Details --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            // {/* <!-- /MAIN --> */}
        );
    }
}

export default Main;