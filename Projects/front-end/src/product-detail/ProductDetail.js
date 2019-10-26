import React from 'react';
import ProductNavigation from '../navigation/ProductNavigation'
import Breadcrumb from './breadcrumb/Breadcrumb'
import Main from './main/Main'

class ProductDetail extends React.Component{
    productSlick = () => {
        // PRODUCT DETAILS SLICK
        window.$('#product-main-view').slick({
            infinite: true,
            speed: 300,
            dots: false,
            arrows: true,
            fade: true,
            asNavFor: '#product-view',
        });

        window.$('#product-view').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            asNavFor: '#product-main-view',
        });

        // PRODUCT ZOOM
        window.$('#product-main-view .product-view').zoom();
    }

    componentDidMount = () => {
        this.productSlick();
    }

    render() {
        return (
            <div>
                <ProductNavigation></ProductNavigation>
                <Breadcrumb></Breadcrumb>
                <Main></Main>
            </div>
        );
    }
}

export default ProductDetail;