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
          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id={"modal" + this.props.productId}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </tr>
      </React.Fragment>
    );
  }
}

export default Product;
