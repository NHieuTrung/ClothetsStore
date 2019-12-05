import React, { Component } from "react";
const Brand = props => {
  return (
    <tr>
      <td>{props.brandId}</td>
      <td>{props.name}</td>
      <td>{props.companyName}</td>
      <td></td>
    </tr>
  );
};

export default Brand;
