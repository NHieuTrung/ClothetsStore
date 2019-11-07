import React from 'react';
import {
    Link
} from "react-router-dom";
import NumberFormat from "react-number-format";

class Order extends React.Component{
    state={
        cart:[],
        sizeId:'00000000-0000-0000-0000-000000000000',
        colorId:'00000000-0000-0000-0000-000000000000',
        namesize:"",
        namecolor:""
    }

    renderCart = () => {
        if(this.state.cart !== null)
        {
            const listItems = this.state.cart.map((item, idx) =>
            
            <tr>
                <td className="thumb"><img src={"/assets/"+ item.imageUrl} alt=""/></td>
                    <td className="details">
                        <a href={"/product?id="+ item.productId}>{item.name}</a>
                        <ul>
                            <li><span>Size: {item.sizeId}</span></li>
                            <li><span>Color: {item.colorId}</span></li>
                        </ul>
                    </td>
                    
                <td className="price text-center">{item.price}</td>
                <td className="qty text-center"><input class="input" type="number" value={item.quantity}/></td>
                
                <td className="total text-center">{item.discount}</td>
                <td className="total text-center"><strong class="primary-color">{(item.price - (item.price * item.discount / 100))*item.quantity}</strong></td>
                <td className="text-right"><button class="main-btn icon-btn"><i class="fa fa-close"></i></button></td>
        </tr>
            );

            return listItems;
        }
    }

    renderTotalPrice = () => {
        if(this.state.cart !== null)
        {
            let totalPrice = 0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                totalPrice += item.discount === null ? item.price * item.quantity : (item.price - (item.price * item.discount / 100)) * item.quantity;
            })

            return <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true}/>;
        }
    }

    renderTotalProducts = () => {
        if(this.state.cart !== null)
        {
            let totalProducts = 0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                totalProducts += item.quantity;
            })

            return totalProducts;
        }
    }

    getAllProducts = () => {
        fetch(`https://localhost:44376/api/customer/product/getProductsForCart?carts=${localStorage.getItem("cart")}`)
        .then(res => res.json())
        .then(
            (res) => {
                this.setState({
                    cart: res
                });
            },
            (err) => {
                console.log(err);
            }
        )
    }

    getSizeName=()=>{
        fetch(`https://localhost:44376/api/customer/size/getSizebyId?sizeId=${this.state.sizeId}`)
        .then(res=>res.json())
        .then(
            (res=>{
                this.setState({
                    namesize:res
                });
            },
            (err)=>{
                console.log(err);
            }
            )
        )
    }

    componentDidMount = () => {
        this.getAllProducts();
    }


    render(){
        return(
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <div className="section-title">
						<h3 className="title">Chi tiết giỏ hàng</h3>
					</div>
                    <table className="shopping-cart-table table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th></th>
                                <th className="text-center">Đơn giá</th>
                                <th className="text-center">Số lượng</th>
                                <th className="text-center">Giảm giá</th>
                                <th className="text-center">Thành tiền</th>
								<th className="text-right"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
                        </tbody>
                        <tfoot>
							{/* <tr>
								<th class="empty" colspan="3"></th>
								<th>SUBTOTAL</th>
								<th colspan="2" class="sub-total">$97.50</th>
							</tr>
							<tr>
								<th class="empty" colspan="3"></th>
								<th>SHIPING</th>
								<td colspan="2">Free Shipping</td>
							</tr> */}
							<tr>
								<th class="empty" colspan="3"></th>
								<th>Tổng tiền</th>
								<th colspan="2" class="total">{this.renderTotalPrice()}</th>
							</tr>
						</tfoot>
                    </table>
                    <div class="pull-right">
						<button class="primary-btn">Thanh toán</button>
					</div>
                </div>
            </div>
        )
    }
}
export default Order;