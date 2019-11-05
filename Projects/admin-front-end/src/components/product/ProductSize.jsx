import React, { Component } from "react";

class ProductSize extends Component {
  state = {};
  render() {
    return (
      <div class="card">
        <div className="card-img-top">
          <img src="https://placekitten.com/250/250" alt="Product" />
        </div>
        <div class="card-body">
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );
  }
}

export default ProductSize;
