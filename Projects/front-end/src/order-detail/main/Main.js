import React from 'react';
import NumberFormat from "react-number-format";
class Main extends React.Component{
    state={
        token:'',
        //isLoggedIn: false
        information:[],
        orderdetail:[],
        customerId:'00000000-0000-0000-0000-000000000000'
    }
    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getUserInformation();
            });
        } else {
            window.location.href = "/";
        }
    }

    checkPreviousUrl = () => {
        let url = document.referrer;
        let suffix = url.substring(url.lastIndexOf("/") + 1, url.length);
        
        if(suffix !== "pay") {
            window.location.href = "/";
        }
    }
    getOrderDetailAll=()=>{
        fetch(`https://localhost:44376/api/customer/order/getDetailOrder?idcustomer=${this.state.information.customerId}`)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                orderdetail:res
            });
        })
        .catch(e=>{
            console.log(e);
        })
    }
    getUserInformation = () => {
        let information = JSON.parse(localStorage.getItem("information"));

        this.setState({
            information: information
        })
    }
    renderOrderDetailAll=()=>{
        if(this.state.orderdetail!==null){
            const listItems = this.state.orderdetail.map((item, idx) =>
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
                            <tr key={idx}>
                                <td className="thumb"><img src={"https://localhost:44376/"+ item.imageUrl} alt=""/></td>
                                    <td className="details">
                                        <a href={"/product?id="+ item.productId}>{item.name}</a>
                                        <ul>
                                            <li><span>Size: {item.sizeName}</span></li>
                                            <li><span>Color: {item.colorName}</span></li>
                                        </ul>
                                    </td>
                                    
                                <td className="price text-center"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></td>
                                <td className="qty text-center"><input id={"txt" + idx} className="input" type="number" min="1" defaultValue={item.quantity} onChange={this.changeQuantity}/></td>
                                
                                <td className="total text-center">{item.discount === null ? 0 : item.discount}</td>
                                <td className="total text-center"><strong className="primary-color"><NumberFormat value={(item.price - (item.price * item.discount / 100))*item.quantity} displayType={'text'} thousandSeparator={true}/></strong></td>
                                <td className="text-right"><button className="main-btn icon-btn" onClick={this.deleteProduct} id={"btn" + idx}><i className="fa fa-close"></i></button></td>
                            </tr>
                        </tbody>
                        <tfoot>
							<tr>
								<th className="empty" colSpan="4"></th>
								<th>Tổng tiền</th>
								<th colSpan="2" className="total">{this.renderTotalPrice()}</th>
							</tr>
						</tfoot>
                    </table>
            
        );

        return listItems;
        }
    }
    render(){
        return(
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <h3 className="title">Đơn hàng</h3>
                </div>
                <div className="purchase-list">
                    {/* <div className="purchase-tab">
                        <span className="lable" >Tất cả</span>
                    </div>
                    <div className="purchase-tab">
                        <span className="lable">Chờ xử lí</span>
                    </div>
                    <div className="purchase-tab">
                        <span className="lable">Tất cả</span>
                    </div>
                    <div className="purchase-tab">
                        <span className="lable">Tất cả</span>
                    </div> */}
                    {this.renderOrderDetailAll()}
                </div>
            </div>
        )
    }
}
export default Main;