import React, { Component } from "react";
import ProductColor from "./ProductColor";
class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTypes: [],
      brands: [],
      statuses: [],
      sizes: [],
      colors: [],
      productSize: {
        size: {
          sizeId: "",
          name: ""
        },
        inventoryQuantity: ""
      },
      productColor: {
        color: {
          colorId: "",
          colorValue: "",
          name: ""
        },
        imageUrl: "",
        imageData: "",
        listProductSize: []
      },
      extendedProduct: {
        productId: "",
        code: "",
        name: "",
        typeProduct: {
          typeProductId: "",
          name: ""
        },
        price: "",
        detail: "",
        discount: "",
        createdDate: "",
        brand: {
          brandId: "",
          name: ""
        },
        status: {
          statusId: "",
          name: ""
        },
        listProductColor: []
      }
    };
    this.handleAvatarDataChange = this.handleAvatarDataChange.bind(this);
  }
  componentWillMount() {
    fetch("https://localhost:44376/api/customer/size/getSizes")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            sizes: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {}
      );
    fetch("https://localhost:44376/api/customer/brand/getBrands")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            brands: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {}
      );
    fetch("https://localhost:44376/api/customer/productType/getProductTypes")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            productTypes: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {}
      );
    fetch("https://localhost:44376/api/admin/status/getStatuses")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            statuses: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {}
      );
    fetch("https://localhost:44376/api/customer/color/getColors")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            colors: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {}
      );
  }
  handleAvatarDataChange(event) {
    const { productColor } = this.state;
    const urlImage = document.getElementById("inputProductImage").file[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.setState({
        productColor: {
          color: productColor.color,
          imageUrl: reader.result,
          imageData: urlImage,
          listProductSize: productColor.listProductSize
        }
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  render() {
    const productObj = this.state;
    return (
      <div className="container">
        <form action="">
          <div className="justify-content-center">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCode">Code Product</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCode"
                  placeholder="Code Product"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCode">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPrice"
                  min="0"
                  placeholder="Price"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputTypeProduct">Type Product</label>
                <select id="inputTypeProduct" className="form-control">
                  <option defaultValue="">Choose Type Product</option>
                  {productObj.productTypes.map(productType => (
                    <option
                      key={productType.typeProductId}
                      value={productType.typeProductId}
                    >
                      {productType.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputBrand">Brand</label>
                <select id="inputBrand" className="form-control">
                  <option defaultValue="">Choose Brand</option>
                  {productObj.brands.map(brand => (
                    <option key={brand.brandId} value={brand.brandId}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputStatus">Status</label>
                <select id="inputStatus" className="form-control">
                  <option defaultValue="">Choose Status</option>
                  {productObj.statuses.map(status => (
                    <option key={status.statusId} value={status.statusId}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="detailTextArea">Detail</label>
              <textarea
                className="form-control"
                id="detailTextArea"
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#modalProductColor"
              >
                Add Product Color
              </button>
            </div>
          </div>
        </form>
        <div
          className="modal fade"
          id="modalProductColor"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalProductColorTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
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
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <img
                      src={productObj.productColor.imageUrl}
                      className="rounded mx-auto d-block"
                      alt="Avatar"
                      width="100"
                      height="100"
                    />
                    <input
                      type="file"
                      className="form-control"
                      id="inputProductImage"
                      accept="image/*"
                      onChange={this.handleAvatarDataChange}
                    />
                  </div>

                  <div className="form-group">
                    <label for="inputColor">Color</label>
                    <select id="inputColor" className="form-control">
                      <option defaultValue="">Choose...</option>
                      {productObj.colors.map(color => (
                        <option key={color.colorId} value={color.colorId}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    {productObj.colors.map(color => (
                      <option key={color.colorId} value={color.colorId}>
                        {color.name}
                      </option>
                    ))}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-toggle="modal"
                      data-target="#modalProductSize"
                    >
                      Add Product Size
                    </button>
                  </div>

                  <button type="reset" className="btn btn-success">
                    Add Product Color
                  </button>
                </form>
              </div>
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
        <div
          className="modal fade"
          id="modalProductSize"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalProductSizeTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
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
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label for="inputSize">Size</label>
                    <select id="inputSize" className="form-control">
                      <option defaultValue="">Choose...</option>
                      {productObj.sizes.map(size => (
                        <option key={size.sizeId} value={size.sizeId}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="inputInventory">Iventory Quantity</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputInventory"
                      placeholder="Iventory Quantity"
                    />
                  </div>

                  <button type="reset" className="btn btn-success">
                    Add Product Size
                  </button>
                </form>
              </div>
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
      </div>
    );
  }
}

export default CreateProductPage;
