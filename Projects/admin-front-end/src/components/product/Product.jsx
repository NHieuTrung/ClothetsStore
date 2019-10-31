import React, { Component } from "react";

const Product = props => {
  return (
    <tr>
      <td>props.code</td>
      <td>props.name</td>
      <td>props.typeProductName</td>
      <td>props.detail</td>
      <td>props.discount</td>
      <td>props.brandName</td>
    </tr>
  );
};

export default Product;
