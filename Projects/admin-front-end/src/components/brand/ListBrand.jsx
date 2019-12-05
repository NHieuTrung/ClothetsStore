import React, { Component } from "react";
import Brand from "./Brand";
class ListBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBrand: []
    };
  }
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") === null) {
      window.location.href = "/login";
    }
  }
  async componentDidMount() {
    const url = "https://localhost:44376/api/admin/brands";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            localStorage.getItem("authenticatedTokenAdmin").toString()
        }
      });
      const json = await response.json();
      this.setState({ listBrand: json });
      console.log("Success:", JSON.stringify(json));
    } catch (error) {
      console.error("Error:", error);
    }

    const scriptBootstrapDatatable = document.createElement("script");
    const scriptDemoDatatable = document.createElement("script");

    scriptBootstrapDatatable.src =
      "/vendor/datatables/dataTables.bootstrap4.min.js";
    scriptDemoDatatable.src = "/js/demo/datatables-demo.js";

    document.body.appendChild(scriptBootstrapDatatable);

    setTimeout(function() {
      document.body.appendChild(scriptDemoDatatable);
    }, 1000);
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
            <h6 className="m-0 font-weight-bold text-primary">List Products</h6>
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
                    <th>Mã thương hiệu</th>
                    <th>Tên thương hiệu</th>
                    <th>Thuộc công ty</th>
                    <th></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Mã thương hiệu</th>
                    <th>Tên thương hiệu</th>
                    <th>Thuộc công ty</th>
                    <th></th>
                  </tr>
                </tfoot>
                <tbody>
                  {this.state.listBrand.map(brand => (
                    <Brand
                      key={brand.brandId}
                      brandId={brand.brandId}
                      name={brand.name}
                      companyName={brand.companyName}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-success"
              data-toggle="modal"
              data-target="#modalCreateBrand"
            >
              {" "}
              Tạo thương hiệu mới
            </button>
          </div>
        </div>
       </div>
    );
  }
}

export default ListBrand;
