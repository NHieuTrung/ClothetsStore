import React from 'react';  
import  { Redirect } from 'react-router-dom'
import ProductImage from './product-image/ProductImage'
import ProductInfo from './product-info/ProductInfo'
import ProductReview from './product-review/ProductReview'

class Main extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.routeParam = props.match.params.id;
    // }
    state = {
        item: ''
    }
    getProduct = (id) => {
        fetch(`https://localhost:44376/api/customer/product/getProductById?id=${id}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                item: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getId = () => {
        let idTemp = '', id = '';
        let href = window.location.href;

        if(href.indexOf("id") === -1) {
            return <Redirect to='/productlist'/>; //Chưa chạy được
        }
        else {
            idTemp = href.substring(href.indexOf("id"), href.length);
            id = idTemp.substring(idTemp.indexOf('=') + 1, idTemp.length);
        }

        this.getProduct(id);
    }

    componentDidMount = () => {
        this.getId();
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
                            <ProductInfo itemName={this.state.item.name}></ProductInfo>
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