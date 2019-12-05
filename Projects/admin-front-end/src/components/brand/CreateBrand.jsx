import React, { Component } from "react";

const CreateBrand = () => {
  return (
    <div
      className="modal fade"
      id="modalCreateBrand"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalCreateBrandTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCreateBrandTitle">
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
              <div className="form-group row">
                <label for="brandNameInput" className="col-sm-4 col-form-label">
                  Tên thương hiệu
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="brandNameInput"
                    value="Tên thương hiệu"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  for="companyBrandInput"
                  className="col-sm-4 col-form-label"
                >
                  Thuộc công ty
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    id="companyBrandInput"
                    placeholder="Thuộc công ty"
                  />
                </div>
              </div>
              <div className="form-group-row">
                <button type="reset" className="btn btn-primary">
                  Hồi phục
                </button>
                <button type="submit" className="btn btn-success">
                  Tạo thương hiệu
                </button>
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
