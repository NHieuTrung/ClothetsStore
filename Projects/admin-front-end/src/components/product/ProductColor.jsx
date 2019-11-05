import React, { Component } from "react";
import ProductSize from "./ProductSize";

class ProductColor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { listProductSize } = this.props;
    const { color } = this.props;
    const domainServer = "https://localhost:44376/";
    return (
      <div className="card">
        <div className="card-img-top">
          <img
            className="mx-auto d-block"
            src={domainServer + this.props.imageUrl}
            height="200"
            alt="Product"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            Màu {color.name} <input type="color" value={color.colorValue} />
          </h5>
          <form action="">
            {listProductSize.map(productSize => (
              <ProductSize
                key={productSize.size.sizeId}
                size={productSize.size}
                inventoryQuantity={productSize.inventoryQuantity}
              />
            ))}
          </form>
        </div>
      </div>
    );
  }
}

export default ProductColor;
