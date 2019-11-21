import React from 'react';
import NumberFormat from "react-number-format";
class Main extends React.Component{
    state={
        token:'',
        //isLoggedIn: false
        information:[],
        orderdetail:[]
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
        let x= this.state.information.customerId;
        console.log(x);
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
    // getUserInformation = () => {
    //     let information = JSON.parse(localStorage.getItem("information"));

    //     this.setState({
    //         information: information
    //     })
    // }  
    getUserInformation = () => {
        fetch('https://localhost:44376/api/customer/account/validateToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                tokenId: this.state.token
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                information: res
            }, () => {
                this.getOrderDetailAll()
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }
    renderorder=()=>{
        if(this.state.orderdetail!==null){
            const listItems = this.state.orderdetail.map((item, idx) =>
            <tbody>
                <tr key={idx}>
                    <td>Mã đơn hàng: {item.orderId}</td>
                    <td>Ngày mua: {item.createdDate}</td>
                    <td>Tổng tiền: {item.totalPrice}</td>
                    <td>Tình trạng: {item.statusName}</td>
                </tr>
                <tr>
                    <td className="thumb"><img src={"https://localhost:44376/"+ item.imageUrl} alt=""/></td>
                    <td className="details">
                        <a href={"/product?id="+ item.productId}>{item.name}</a>
                    </td>        
                    <td className="price text-center"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></td>
                        {/* <td className="qty text-center"><input id={"txt" + idx} className="input" type="number" min="1" defaultValue={item.quantity} onChange={this.changeQuantity}/></td> */}
                    <td className="qty text-center"><p id={"txt" + idx}>{item.quantity}</p></td>
                        
                    <td className="total text-center">{item.discount === null ? 0 : item.discount}</td>
                    <td className="total text-center"><strong className="primary-color"><NumberFormat value={(item.price - (item.price * item.discount / 100))*item.quantity} displayType={'text'} thousandSeparator={true}/></strong></td>
                </tr>     
            </tbody>
                
            );
            return listItems;
        }
    }
    // renderOrderDetail=()=>{
    //     if(this.state.orderdetail!==null)
    //     {
    //         const listItems= this.state.orderdetail.map((item,idx)=>
    //             <tr key={idx}>
    //                 <td className="thumb"><img src={"https://localhost:44376/"+ item.imageUrl} alt=""/></td>
    //                 <td className="details">
    //                     <a href={"/product?id="+ item.productId}>{item.name}</a>
    //                 </td>        
    //                 <td className="price text-center"><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true}/></td>
    //                     {/* <td className="qty text-center"><input id={"txt" + idx} className="input" type="number" min="1" defaultValue={item.quantity} onChange={this.changeQuantity}/></td> */}
    //                 <td className="qty text-center"><p id={"txt" + idx}>{item.quantity}</p></td>
                        
    //                 <td className="total text-center">{item.discount === null ? 0 : item.discount}</td>
    //                 <td className="total text-center"><strong className="primary-color"><NumberFormat value={(item.price - (item.price * item.discount / 100))*item.quantity} displayType={'text'} thousandSeparator={true}/></strong></td>
    //             </tr>
    //             );
    //             return listItems;
    //         }
    //     }
    componentDidMount=()=>{
        //this.checkPreviousUrl(); 
        this.checkLoggedIn();
        //this.getUserInformation();
        // this.getOrderDetailAll();
    }
    render(){
        return(
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    <h3 className="title">Đơn hàng</h3>
                </div>
                <table className="shopping-cart-table table">
                {/* <thead>
                    <tr>
                        <th className="text-center">Mã đơn hàng</th>
                        <th className="text-center">Ngày mua</th>
                        <th className="text-center">Tổng tiền</th>
                    </tr>
                </thead> */}
                    {this.renderorder()}
                    {/* {this.renderOrderDetail()} */}
            </table>
            </div>
        )
    }
}
export default Main;