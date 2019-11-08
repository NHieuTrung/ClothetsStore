import React, { Component } from "react";
import Product from "./Product";
import ListProductColor from "./ListProductColor";
import "./dataTables.bootstrap4.min.css";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: []
    };
  }
  async componentWillMount() {
    const urlGender = "https://localhost:44376/api/admin/extendedproducts";
    const optionsGender = {
      method: "GET" // *GET, POST, PUT, DELETE, etc.
    };
    const result = await fetch(urlGender, optionsGender)
      .then(res => res.json())
      .then(
        result => {
          return result;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          /*this.setState({
            isSubmitted: true,
            error
          });*/
          alert("Can't get gender info from backend server!!!");
        }
      );
    this.setState({
      listProduct: [...result]
    });
  }
  componentDidMount() {
    const scriptBootstrapDatatable = document.createElement("script");
    const scriptDemoDatatable = document.createElement("script");

    scriptBootstrapDatatable.src =
      "/vendor/datatables/dataTables.bootstrap4.min.js";
    scriptDemoDatatable.src = "/js/demo/datatables-demo.js";

    document.body.appendChild(scriptBootstrapDatatable);

    document.body.appendChild(scriptDemoDatatable);
  }
  render() {
    return (
      <div className="container-fluid">
        {/* Page Heading */}
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>
        <p className="mb-4">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the{" "}
          <a target="_blank" href="https://datatables.net">
            official DataTables documentation
          </a>
          .
        </p>

        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên</th>
                    <th>Loại sản phẩm</th>
                    <th>Giảm giá</th>
                    <th>Chi tiết</th>
                    <th>Ngày tạo</th>
                    <th>Nhãn hiệu</th>
                    <th>Trạng thái</th>
                    <th>Chủng loại</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên</th>
                    <th>Loại sản phẩm</th>
                    <th>Giảm giá</th>
                    <th>Chi tiết</th>
                    <th>Ngày tạo</th>
                    <th>Nhãn hiệu</th>
                    <th>Trạng thái</th>
                    <th>Chủng loại</th>
                  </tr>
                </tfoot>
                <tbody>
                  {this.state.listProduct.map(product => (
                    <Product
                      key={product.productId}
                      productId={product.productId}
                      code={product.code}
                      name={product.name}
                      typeProduct={product.typeProduct}
                      discount={product.discount}
                      detail={product.detail}
                      createdDate={product.createdDate}
                      brand={product.brand}
                      status={product.status}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {this.state.listProduct.map((product, index) => (
          <ListProductColor
            key={index}
            productId={product.productId}
            listProductColor={product.listProductColor}
          />
        ))}
      </div>
    );
  }
}

export default ListProduct;
