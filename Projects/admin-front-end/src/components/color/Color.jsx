import React, { Component } from "react";
const Color = props => {
  return (
    <tr>
      <td>{props.colorId}</td>
      <td>{props.name}</td>
      <td>
        <input type="color" value={props.colorValue} disabled />
      </td>
      <td></td>
    </tr>
  );
};

export default Color;
