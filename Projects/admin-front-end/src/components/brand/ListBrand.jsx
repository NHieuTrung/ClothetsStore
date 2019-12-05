import React, { Component } from "react";
import Brand from "./Brand";
import CreateBrand from "./CreateBrand";
class ListBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBrand: []
    };
  }
  PushToServerPage = () => {
    window.location.href = "/error-server";
  };
  PushTo404Page = () => {
    window.location.href = "/not-found";
  };
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") === null) {
      window.location.href = "/login";
    }
  }
  async componentDidMount() {
    const url = "https://localhost:44376/api/admin/brands";
    const options = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem("authenticatedTokenAdmin").toString()
      }
    };
    fetch(url, options)
      .then(res => res.json())
      .then(
        result => {
          if (result.status !== 404) {
            this.setState({
              listBrand: [...result]
            });
          } else {
            console.log("Something wrong when get products");
            this.PushTo404Page();
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log("Server interupt");
          this.PushToServerPage();
        }
      );

    const scriptBootstrapDatatable = document.createElement("script");
    const scriptDemoDatatable = document.createElement("script");

    scriptBootstrapDatatable.src =
      "/vendor/datatables/dataTables.bootstrap4.min.js";
    scriptDemoDatatable.src = "/js/demo/datatables-demo.js";

    document.body.appendChild(scriptBootstrapDatatable);

    setTimeout(function() {
      document.body.appendChild(scriptDemoDatatable);
    }, 2000);
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
            <h6 className="m-0 font-weight-bold text-primary">List Brands</h6>
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
              Tạo thương hiệu mới
            </button>
          </div>
        </div>
        <CreateBrand />
      </div>
    );
  }
}

export default ListBrand;
