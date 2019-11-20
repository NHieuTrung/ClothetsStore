import React, { Component } from "react";
import NumberFormat from 'react-number-format';

class OrderItem extends Component {
    renderDeliveryDate = () => {
        let tempDate = new Date(this.props.deliveryDate);
        
        let dd = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
        let mm = tempDate.getMonth() + 1 < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
        let yyyy = tempDate.getFullYear();

        let fullDate = `${dd}-${mm}-${yyyy}`;
        return fullDate;
    }

    renderCreatedDate = () => {
        let tempDate = new Date(this.props.createdDate);
        
        let dd = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
        let mm = tempDate.getMonth() + 1 < 10 ? "0" + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1;
        let yyyy = tempDate.getFullYear();

        let fullDate = `${dd}-${mm}-${yyyy}`;
        return fullDate;
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.orderId}</td>
                    <td>{this.props.customerName}</td>
                    <td>{this.props.deliveryName}</td>
                    <td>{this.props.contactPhone}</td>
                    <td>{this.props.deliveryEmail}</td>
                    <td>{this.props.deliveryAddress}</td>
                    <td><NumberFormat value={this.props.deliveryPrice} displayType={'text'} thousandSeparator={true}/>₫</td>
                    <td><NumberFormat value={this.props.totalPrice} displayType={'text'} thousandSeparator={true}/>₫</td>
                    <td>{this.renderCreatedDate()}</td>
                    <td>{this.renderDeliveryDate()}</td>
                    <td>{this.props.statusName}</td>
                    <td>
                        <button
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target={"#modal" + this.props.orderId}
                        >
                            Chi tiết
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

export default OrderItem;