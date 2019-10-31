import React, { Component } from "react";
import Product from "./Product";
import "./dataTables.bootstrap4.min.css";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: []
    };
  }
  componentWillMount() {
    const urlGender = "https://localhost:44376/api/admin/extendedproduct";
    const optionsGender = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: headers
    };
    fetch(urlGender, optionsGender)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            listProduct: [...result],
            userInfo: this.state.userInfo
          });
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
                    <th>Code</th>
                    <th>Name Product</th>
                    <th>Discount</th>
                    <th>Detail</th>
                    <th>Created Date</th>
                    <th>Brand</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Code</th>
                    <th>Name Product</th>
                    <th>Discount</th>
                    <th>Detail</th>
                    <th>Created Date</th>
                    <th>Brand</th>
                    <th>Status</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListProduct;
