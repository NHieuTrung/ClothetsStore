import React from 'react';
import './style.css';
import Swal from 'sweetalert2';
import NumberFormat from "react-number-format";
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

class Main extends React.Component{
    state={
        token:'',
        //isLoggedIn: false,
        information:[],
        cart:[],
        fee:0,
        totalprice:0

    }

    // checkLoggedIn = () => {
    //     let token = localStorage.getItem('authenticatedToken');

    //     if(token) {
    //         this.setState({
    //             token: token,
    //             isLoggedIn: true
    //         }, () => {
    //             this.getInformation();
    //         });
    //     } else {
    //         window.location.href = "/";
    //     }
    // }

    checkPreviousUrl = () => {
        let url = document.referrer;
        let suffix = url.substring(url.lastIndexOf("/") + 1, url.length);
        
        if(suffix !== "delivery") {
            window.location.href = "/";
        }
    }

    getFee=()=>{
        fetch(`https://localhost:44376/api/customer/delivery/getFee?districtId=${localStorage.getItem("district")}&numberOfProduct=10`)
        .then(res =>res.json())
        .then(res=>{
            // console.log(res.totalFee);
            this.setState({
                fee:res.totalFee
            });
        })
        .catch(error=>{
            console.log(error);
        })
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

    getQuantity=()=>{
        if(this.state.cart !== null)
        {
            let sl=0;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                sl += item.quantity;
            })
            return sl;
        }
        
    }

    renderCart = () => {
        if(this.state.cart !== null)
        {
            const listItems = this.state.cart.map((item, idx) =>
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
            this.setState.totalprice=totalPrice;
            return <NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true}/>;
        }
    }

    rendertotal = () => {
        if(this.state.cart !== null)
        {
            let total = 0;
            let fee= this.state.fee;
            // eslint-disable-next-line
            this.state.cart.map((item) => {
                total += item.discount === null ? item.price * item.quantity : (item.price - (item.price * item.discount / 100)) * item.quantity;
            })
            total=total+fee;
            return <NumberFormat value={total} displayType={'text'} thousandSeparator={true}/>;
        }
    }

    renderFee=()=>{
        let fee=0;
        fee=this.state.fee;
        return <NumberFormat value={fee} displayType={'text'} thousandSeparator={true}/>;
    }
    // rendertotal=()=>{
    //     let total=0;
    //     let fee=0;
    //     fee= this.state.fee;
    //     let tmp=0;
    //     tmp=totalprice;
    //     total= tmp+fee;
    //     return <NumberFormat value={total} displayType={'text'} thousandSeparator={true}/>;
    // }


    // renderInfomartion=()=>{
    //     if(this.state.information!==null)
    // }

    // getSizeName=()=>{
    //     fetch(`https://localhost:44376/api/customer/size/getSizebyId?sizeId=${this.state.sizeId}`)
    //     .then(res=>res.json())
    //     .then(
    //         (res=>{
    //             this.setState({
    //                 namesize:res
    //             });
    //         },
    //         (err)=>{
    //             console.log(err);
    //         }
    //         )
    //     )
    // }


    componentDidMount = () => {
        //this.checkLoggedIn();
        this.getAllProducts();
        this.getQuantity();
        this.getFee();

    }


    render(){
        // const cart = this.state.cart;)
        return(
            // <div className="col-md-12">
            //     {/* <div className="panel-body">
            //         <div className="infomation"></div>
            //         <div className="cart_product"></div>
            //     </div> */}
            //     <div className=" panel panel-default cart">
            //         <div>{this.renderTotalPrice()}</div>
            //     </div>
            //     {/* <div className="panel panel-default cart">
            //         <div className="panel-body">
            //             <div className="order">
            //                 <span className="title">Đơn hàng</span>
            //             </div>
            //             <div className="product">
            //                 {this.renderProduct()}
            //             </div>
            //         </div>
            //     </div> */}
            // </div>
            <div className="col-md-12">
                <div className="order-summary clearfix">
                    {/* <div className="section-title">
                        <i className="fa fa-map-marker"></i>
                        <h3 className="title">Địa chỉ nhận hàng</h3>
                    </div>
                    <div className="content-address">
                        <h3>
                            <b></b>
                        </h3>
                    </div> */}
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
                    </table>
                    <div className="form-chuthich">
                        <div className="form-padding">
                            <div className="tong-tienhang">
                                <div className="txt-dathang">
                                    <p>Phí vận chuyển</p>
                                </div>
                                <div className="gia-dathang">
                                    <p>
                                        ₫{this.renderFee()}
                                    </p>
                                </div>
                            </div>
                            <div className="tong-tienhang">
                                <div className="txt-dathang">
                                    <p>Tổng tiền hàng</p>
                                </div>
                                <div className="gia-dathang">
                                    <p>₫{this.renderTotalPrice()}</p>
                                </div>
                            </div>
                            <div className="tong-tienhang">
                                <div className="txt-dathang">
                                    <p> Tổng thanh toán</p>
                                </div>
                                <div className="gia-dathang">
                                    <p className="gia-tong">
                                        ₫{this.rendertotal()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="action">
                    <button type="button" className="primary-btn" id="btnOk" >Đặt hàng</button>
                    </div>
                </div>
            </div>
            

        )
    }
}
export default Main;