import React from 'react';

class ProductImage extends React.Component{
    render() {
        return (
            <div className="col-md-6">
                <div id="product-main-view">
                    <div className="product-view">
                        <img src="/assets/img/main-product01.jpg" alt="" />
                    </div>
                    <div className="product-view">
                        <img src="/assets/img/main-product02.jpg" alt="" />
                    </div>
                    <div className="product-view">
                        <img src="/assets/img/main-product03.jpg" alt="" />
                    </div>
                    <div className="product-view">
                        <img src="/assets/img/main-product04.jpg" alt="" />
                    </div>
                </div>
                <div id="product-view">
                    <div className="product-view">
                        <img src="/assets/img/thumb-product01.jpg" alt="" />
                    </div>
                    <div className="product-view">
                        <img src="/assets/img/thumb-product02.jpg" alt="" />
                    </div>
                    <div className="product-view">
                        <img src="/assets/img/thumb-product03.jpg" alt="" />
                    </div>
                    <div className="product-view">
                        <img src="/assets/img/thumb-product04.jpg" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductImage;