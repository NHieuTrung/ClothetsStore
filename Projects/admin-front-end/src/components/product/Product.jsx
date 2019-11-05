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
          <td>{this.props.typeProductName}</td>
          <td>{this.props.discount}</td>
          <td>{this.props.detail}</td>
          <td>{this.props.brandName}</td>
          <td>{this.props.statusName}</td>
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
