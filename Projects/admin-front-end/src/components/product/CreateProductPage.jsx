import React, { Component } from "react";
import ProductColor from "./ProductColor";
class CreateProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeProducts: [],
      brands: [],
      status: [],
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
  }
  render() {
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
                  <option value="" selected>
                    Choose Type Product
                  </option>
                  <option>...</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputBrand">Brand</label>
                <select id="inputBrand" className="form-control">
                  <option value="" selected>
                    Choose Brand
                  </option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputStatus">Status</label>
                <select id="inputStatus" className="form-control">
                  <option value="" selected>
                    Choose Status
                  </option>
                  <option>...</option>
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
              <div className="row">
                {this.state.extendedProduct.listProductColor.map(item => (
                  <div className="col-sm-4">
                    <ProductColor
                      color={item.color}
                      imageUrl={item.imageUrl}
                      listProductSize={item.listProductSize}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateProductPage;
