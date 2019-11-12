import React from 'react';
import './login.css';
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Information extends React.Component {
    state = {
        gender: [],
        information: [],
        token: '',
        isLoggedIn: false
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            }, () => {
                this.getUserInformation()
            });
        } else {
            this.props.history.push('/');
        }
    }

    renderSnowEffect = () => {
        let items = [];

        for(let i = 0; i < 10; i++) {
            items.push(<div className='snowflake' key={i}>❆</div>);
        }

        return items;
    }

    getGender = () => {
        fetch(`https://localhost:44376/api/customer/gender/getGenders`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                gender: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

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
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    renderGender = () => {
        let list = this.state.gender;
        let listOption = [];

        list.forEach((g, index) => {
            listOption.push(<option key={index} value={g.genderId}>{g.name}</option>);
        })

        return listOption;
    }

    renderBirthday = () => {
        if(this.state.information.birthday !== undefined) {
            let value = new Date(this.state.information.birthday);

            let date = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
            let month = value.getMonth() < 10 ? "0" + value.getMonth() : value.getMonth();
            let year = value.getFullYear();

            let fullDate = `${year}-${month}-${date}`;
            const birthday = <input className="input--style-3 js-datepicker" type="date" placeholder="Birthdate" id="birthday" name="birthday" ref="birthday" defaultValue={fullDate} required style={{borderBottom: "1px solid rgba(255, 255, 255, 0.2)", width: "60%", padding: "0"}}/>;
            
            return birthday
        }
    }

    handleSubmit = (event) => { 
        event.preventDefault();

        //check birthday validity
        let birthdayValidity = this.checkBirthdayValidity(window.$("#birthday").val());
        if(birthdayValidity === false) {
            return;
        }

        //check phone validity
        let phoneValidity = this.checkPhoneValidity(window.$("#phone").val());
        if(phoneValidity === false) {
            return;
        }

        //check name validity
        let nameValidity = this.checkNameValidity(window.$("#name").val());
        if(nameValidity === false) {
            return;
        }

        //updateInformation
        fetch('https://localhost:44376/api/customer/customer/updateCustomerInformation', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                customerId: this.state.information.customerId,
                name: this.refs.name.value,
                genderId: this.refs.gender.value,
                birthday: this.refs.birthday.value,
                address: this.refs.address.value,
                email: this.refs.email.value,
                phone: this.refs.phone.value
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res === true) {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    icon: 'success',
                    html: "<p style='font-size: 15px'>Cập nhật thông tin thành công</p>"
                }).then((res) => {
                   window.location.href = "/"; 
                });
            } else {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Lỗi</p>"
                })
            }
        })
        .catch(error =>{
            console.log(error)
        })
    };

    checkBirthdayValidity = (birthday) => {
        let date = Date.parse(birthday);
        let now = Date.now();
        
        if(date >= now) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Vui lòng nhập ngày sinh hợp lệ</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    checkNameValidity = (name) => {
        let nameLength = name.length;
        
        if(nameLength < 2) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Họ tên không hợp lệ</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    checkPhoneValidity = (phone) => {
        let phoneLength = phone.length;
        
        if(phoneLength < 8 || phoneLength > 10) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Số điện thoại không hợp lệ</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    validateInput() {
        let name = window.$("#name").val();
        let birthday = window.$("#birthday").val();
        let phone = window.$("#phone").val();
        let address = window.$("#address").val();
        let email = window.$("#address").val();
        
        //check blank
        if(name === "") {
            document.getElementById("name").setCustomValidity("Vui lòng nhập vào họ tên!");
            return;
        } else {
            document.getElementById("name").setCustomValidity("");
        }

        if(birthday === "") {
            document.getElementById("birthday").setCustomValidity("Vui lòng chọn ngày tháng năm sinh!");
            return;
        } else {
            document.getElementById("birthday").setCustomValidity("");
        }

        if(phone === "") {
            document.getElementById("phone").setCustomValidity("Vui lòng nhập vào số điện thoại!");
            return;
        } else {
            document.getElementById("phone").setCustomValidity("");
        }

        if(address === "") {
            document.getElementById("address").setCustomValidity("Vui lòng nhập vào địa chỉ!");
            return;
        } else {
            document.getElementById("address").setCustomValidity("");
        }

        if(email === "") {
            document.getElementById("email").setCustomValidity("Vui lòng nhập vào email!");
            return;
        } else {
            document.getElementById("email").setCustomValidity("");
        }
    }

    componentDidMount() {
        this.getGender();
        this.checkLoggedIn();
    }

    render()
    {
        return(
            <div className="register">
                { this.renderSnowEffect() }
                <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
                    <div className="wrapper wrapper--w780">
                        <div className="card card-3">
                            <div className="card-heading">
                                <a href="/"><img src="./assets/img/logo.png" alt="logo.png"></img></a>
                            </div>
                            <div className="card-body">
                                <h2 className="title"><center>Thông tin</center></h2>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Họ tên" id="name" name="Name" ref="name" defaultValue={this.state.information.name} required/>
                                    </div>
                                    <div className="input-group" style={{borderBottom: "none"}}>
                                        <span style={{color: "#ccc", fontSize: "16px", padding: "5px 0", marginRight: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.2)"}}>Giới tính</span>
                                        <select className="input--style-3" ref="gender" required style={{padding: "4px 0"}}>
                                            Giới tính { this.renderGender() }
                                        </select>
                                    </div>
                                    <div className="input-group" style={{borderBottom: "none"}}>
                                        <span style={{color: "#ccc", fontSize: "16px", padding: "5px 0", marginRight: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.2)"}}>Ngày sinh</span>
                                        {/* <input className="input--style-3 js-datepicker" type="date" placeholder="Birthdate" id="birthday" name="birthday" ref="birthday" defaultValue="01/01/2013" required style={{borderBottom: "1px solid rgba(255, 255, 255, 0.2)", width: "60%", padding: "0"}}/> */}
                                        {this.renderBirthday()}
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Số điện thoại" id="phone" name="phone" ref="phone" defaultValue={this.state.information.phone} required/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Địa chỉ" id="address" name="Address" ref="address" defaultValue={this.state.information.address} required/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Email" id="email" name="email" ref="email" defaultValue={this.state.information.email} required disabled/>
                                    </div>
                                    <div className="p-t-10">
                                        <center><button className="btn btn--pill btn--green" type="submit" onClick={this.validateInput}>Lưu</button></center>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Information;