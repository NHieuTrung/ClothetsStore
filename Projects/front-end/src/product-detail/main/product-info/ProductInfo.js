import React from 'react';
import NumberFormat from 'react-number-format';

class ProductInfo extends React.Component{
    state = {
        productId: '00000000-0000-0000-0000-000000000000',
        colorArr: [],
        colorId: '00000000-0000-0000-0000-000000000000',
        size:[]
    }

    getProductColors = () => {
        fetch(`https://localhost:44376/api/customer/color/getColorByProductId?productId=${this.state.productId}`)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    colorArr: res
                });

            },
            (err) => {
                console.log(err);
            }
        )
    }

    getProductSize=()=>{
        fetch(`https://localhost:44376/api/customer/size/getSizeByProduct?id=${this.state.productId}`)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    size: res
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }

    renderProductColors = () => {
        const colors = this.state.colorArr.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            item.colorId === this.state.colorId ?
                <li className="active" key={ idx }><a id={item.colorId} onClick={this.selectColor} href=" #" style={{ backgroundColor: item.colorValue, border: "1px solid" }}> </a></li> :
                <li key={ idx }><a id={item.colorId} onClick={this.selectColor} href=" #" style={{ backgroundColor: item.colorValue, border: "1px solid" }}> </a></li>
        );

        return colors;
    }

    renderProductSizes = () => {
        // console.log(this.state.size);
        const sizes = this.state.size.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <li key={idx}><a id={item.sizeId} href=" #">{item.name}</a></li>
        );

        return sizes;
    }

    selectColor = (e) => {
        let colorId = e.target.id;
        this.props.selectColor(colorId);

        this.setState({
            colorId: colorId
        });
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            productId: nextProps.itemId,
            colorId: nextProps.colorId
        }, () => {
            this.getProductColors();
            // console.log(this.state)
            this.getProductSize();
        });
    }

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
                            {this.renderProductSizes()}
                            {/* <li className="active"><a href=" #">S</a></li>
                            <li><a href=" #">XL</a></li>
                            <li><a href=" #">SL</a></li> */}
                        </ul>
                        <ul className="color-option">
                            <li><span className="text-uppercase">Color:</span></li>
                            {this.renderProductColors()}
                            {/* <li className="active"><a href=" #" style={{backgroundColor: '#475984'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#8A2454'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#BF6989'}}> </a></li>
                            <li><a href=" #" style={{backgroundColor: '#9A54D8'}}> </a></li> */}
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