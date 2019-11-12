import React from 'react';
import './style.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal= withReactContent(Swal);

class Main extends React.Component{
    state={
        token: '',
        information: [],
        address:"",
        phone:"",
        email:"",
        customerId:'00000000-0000-0000-0000-000000000000',
        isLoggedIn: false
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getInformation();
            });
        }
    }

    getInformation=()=>{
        fetch('https://localhost:44376/api/customer/account/validateToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                tokenId: this.state.token,
                // customerId:this.state.information.customerId
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                information: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    updateinfomation=()=>{
        let dcValidity= this.checkPhoneValidity(window.$("#phone").val());
        if(dcValidity=== false){
            return;
        }

        let emailValidity= this.checkEmailValidity(window.$("#email").val());
        if(emailValidity=== false){
            return;
        }

        let information = this.state.information;
        information.address = window.$("#address").val();
        information.email = window.$("#email").val();
        information.phone = window.$("#phone").val();

        this.setState({
            information: information
        })
        // console.log(information.address)
        // localStorage.setItem("address",JSON.stringify(window.$("#address").val()));
        // localStorage.setItem("email",JSON.stringify(window.$("#email").val()));
        // localStorage.setItem("phone",JSON.stringify(window.$("#phone").val()));
    }

    checkEmailValidity=(email)=>{
        let emailcheck=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(emailcheck))
        {
            return true;
        }
        
        else{
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Email không hợp lệ</p>"
            })
            return false;
        }
    }

    checkPhoneValidity=(phone)=>{
        let phonecheck= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phone.match(phonecheck))
        {
            return true;
        }
        else{
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Số điện thoại không hợp lệ</p>"
            })
            return false;
        }
    }

    renderFormDiaChi = () => {
        if(this.state.information.length !== 0) {
            const listItems = <div className="panel-body">
                                <p className="form-group name">{this.state.information.name}</p>
                                <div className="form-group address">
                                    <label className="address-label">Địa chỉ: </label>
                                    <div>
                                        <input className="input-address" id="address" defaultValue={this.state.information.address}></input>
                                    </div>
                                </div>
                                <div className="form-group email">
                                    <label className="email-lable">Email:</label>
                                    <div>
                                        <input className="input-email" id="email" defaultValue={this.state.information.email}></input>
                                    </div>
                                </div>
                                <div className="form-group phone">
                                    <label className="phone-lable">Điện thoại:</label>
                                    <div>
                                        <input className="input-phone" id="phone" defaultValue={this.state.information.phone}></input>
                                    </div>
                                </div>
                                <div className="action">
                                    <button type="button" className="btn btn-default ok">Giao đến địa chỉ này</button>
                                    <button type="button" className="btn btn-default huy" onClick={this.updateinfomation}>Sửa</button>
                                </div>
                                <span className="default">Mặc định</span>
                            </div>
            return listItems;
        }
    }
   
    componentDidMount=()=>{
        this.checkLoggedIn();
    }
    render()
    {
        return ( //Phải để (1 ngay đây
           
            <div className="row-address-list">
                <div className="col-lg-6 col-md-6 col-sm-6 item">
                    <div className="panel panel-default address-item">
                        {this.renderFormDiaChi()}
                    </div>
                </div>
            </div>
        )
    }
}
export default Main;