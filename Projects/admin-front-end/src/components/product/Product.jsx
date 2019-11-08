import React, { Component } from "react";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.code}</td>
          <td>{this.props.name}</td>
          <td>{this.props.typeProduct.name}</td>
          <td>{this.props.discount}</td>
          <td>{this.props.detail}</td>
          <td>{this.props.createdDate}</td>
          <td>{this.props.brand.name}</td>
          <td>{this.props.status.name}</td>
          <td>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target={"#modal" + this.props.productId}
            >
              Xem thêm
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default Product;
