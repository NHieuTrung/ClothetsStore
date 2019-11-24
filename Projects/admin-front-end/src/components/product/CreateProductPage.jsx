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
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleInventoryQuantityChange = this.handleInventoryQuantityChange.bind(
      this
    );
    this.handleAvatarDataChange = this.handleAvatarDataChange.bind(this);
    this.handleSubmitModalProductSize = this.handleSubmitModalProductSize.bind(
      this
    );
    this.handleSubmitModalProductColor = this.handleSubmitModalProductColor.bind(
      this
    );
  }
  componentDidMount() {
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
    const imageData = document.getElementById("inputProductImage").files[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.setState({
        productColor: {
          color: productColor.color,
          imageUrl: reader.result,
          imageData: imageData,
          listProductSize: productColor.listProductSize
        }
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  handleSizeChange(event) {
    this.setState({
      productSize: {
        size: {
          sizeId: event.target.value,
          name: event.target.options[event.target.selectedIndex].text
        },
        inventoryQuantity: this.state.productSize.inventoryQuantity
      }
    });
  }
  handleColorChange(event) {
    const { productColor } = this.state;
    const arr = event.target.options[event.target.selectedIndex].text.split(
      " "
    );
    this.setState({
      productColor: {
        color: {
          colorId: event.target.value,
          colorValue: arr[1],
          name: arr[0]
        },
        imageUrl: productColor.imageUrl,
        imageData: productColor.imageData,
        listProductSize: productColor.listProductSize
      }
    });
  }
  handleInventoryQuantityChange(event) {
    this.setState({
      productSize: {
        size: this.state.productSize.size,
        inventoryQuantity: event.target.value
      }
    });
  }
  handleSubmitModalProductSize(event) {
    event.preventDefault();
    const productSize = this.state.productSize;
    const { productColor } = this.state;
    let listProductSizeTemp = [];
    if (productColor.listProductSize.length > 0) {
      listProductSizeTemp = [...productColor.listProductSize];
    }
    listProductSizeTemp.push(productSize);
    this.setState({
      productColor: {
        color: productColor.color,
        imageUrl: productColor.imageUrl,
        imageData: productColor.imageData,
        listProductSize: [...listProductSizeTemp]
      }
    });
  }
  handleSubmitModalProductColor(event) {
    event.preventDefault();
    const { productColor } = this.state;
    const { extendedProduct } = this.state;
    let listProductColorTemp = [];
    if (this.state.extendedProduct.listProductColor.length > 0) {
      listProductColorTemp = [...extendedProduct.listProductColor];
    }
    listProductColorTemp.push(productColor);
    this.setState({
      extendedProduct: {
        productId: extendedProduct.productId,
        code: extendedProduct.code,
        name: extendedProduct.name,
        typeProduct: extendedProduct.typeProduct,
        price: extendedProduct.price,
        detail: extendedProduct.detail,
        discount: extendedProduct.discount,
        createdDate: extendedProduct.createdDate,
        brand: extendedProduct.brandId,
        status: extendedProduct.status,
        listProductColor: [...listProductColorTemp]
      }
    });
  }
  render() {
    const productObj = this.state;
    const { extendedProduct } = this.state;
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
                <select id="inputTypeProduct" className="form-control" required>
                  <option value="">Choose Type Product</option>
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
                <select id="inputBrand" className="form-control" required>
                  <option value="">Choose Brand</option>
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
                  <option value="" required>
                    Choose Status
                  </option>
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
            <div className="form-row">
              <div className="col-sm-12">
                <label>List Color</label>
              </div>
              {extendedProduct.listProductColor.map(productColor => (
                <div className="col-sm-4" key={productColor.color.colorId}>
                  <ProductColor
                    color={productColor.color}
                    imageUrl={productColor.imageUrl}
                    listProductSize={productColor.listProductSize}
                    heightImg={100}
                    isBase64Url={true}
                  />
                </div>
              ))}
              <div className="col-sm-4">
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
          </div>
        </form>
        <div
          className="modal fade"
          id="modalProductColor"
          tabIndex="-1"
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
                <form onSubmit={this.handleSubmitModalProductColor}>
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
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputColor">Color</label>
                    <select
                      id="inputColor"
                      className="form-control"
                      onChange={this.handleColorChange}
                      required
                    >
                      <option defaultValue="">Choose...</option>
                      {productObj.colors.map(color => (
                        <option key={color.colorId} value={color.colorId}>
                          {color.name + " " + color.colorValue}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    {productObj.productColor.listProductSize.map(item => (
                      <div key={item.size.sizeId} className="col-sm-6">
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          id={item.size.sizeId}
                          value={
                            "Size: " +
                            item.size.name +
                            " | " +
                            "Quantity: " +
                            item.inventoryQuantity
                          }
                        />
                      </div>
                    ))}
                    <div className="col-sm-6">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-toggle="modal"
                        data-target="#modalProductSize"
                      >
                        Add Product Size
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success">
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
          tabIndex="-1"
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
                <form onSubmit={this.handleSubmitModalProductSize}>
                  <div className="form-group">
                    <label htmlFor="inputSize">Size</label>
                    <select
                      id="inputSize"
                      className="form-control"
                      onChange={this.handleSizeChange}
                      required
                    >
                      <option value="">Choose...</option>
                      {productObj.sizes.map(size => (
                        <option key={size.sizeId} value={size.sizeId}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputInventory">Iventory Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputInventory"
                      placeholder="Iventory Quantity"
                      onChange={this.handleInventoryQuantityChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success">
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
