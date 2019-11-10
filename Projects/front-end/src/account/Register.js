import React from 'react';
import './login.css';
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Register extends React.Component {
    state = {
        gender: [],
        test: false
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

    renderGender = () => {
        let list = this.state.gender;
        let listOption = [];

        list.forEach((g, index) => {
            listOption.push(<option key={index} value={g.genderId}>{g.name}</option>);
        })

        return listOption;
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

        //check username validity
        let usernameValidity = this.checkUsernameValidity(window.$("#username").val());
        if(usernameValidity === false) {
            return;
        }

        //check password validity
        let passwordValidity = this.checkPasswordValidity(window.$("#password").val());
        if(passwordValidity === false) {
            return;
        }

        //check email validity
        let emailAvailability = false;
        fetch(`https://localhost:44376/api/customer/account/checkEmailAvailability?email=${window.$("#email").val()}`)
        .then(res => res.json())
        .then(res => {
            emailAvailability = res;
        }).then(() => {
            if(emailAvailability === false) {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Email đã được sử dụng</p>"
                })

                return;
            }
            else {
                //check account availability
                let accountAvailability = false;
                fetch(`https://localhost:44376/api/customer/account/checkAvailability?username=${window.$("#username").val()}`)
                .then(res => res.json())
                .then(res => {
                    accountAvailability = res;
                }).then(() => {
                    if(accountAvailability === false) {
                        MySwal.fire({
                            title: 'Thông báo',
                            width: 300,
                            padding: '2em',
                            html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Tài khoản đã được sử dụng</p>"
                        })

                        return;
                    }
                    else {
                        this.createAccount();
                    }
                })
                .catch(error =>{
                    console.log(error)
                });
            }
        })
        .catch(error =>{
            console.log(error)
        });
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

    checkPasswordValidity = (password) => {
        let passwordLength = password.length;
        
        if(passwordLength < 6) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Độ dài mật khẩu phải từ 6 ký tự</p>"
            })
            return false;
        }
        else {
            return true;
        }
    }

    checkUsernameValidity = (username) => {
        if(username.includes(" ")) {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Tài khoản không được có khoảng trắng</p>"
            })
            return false;
        }
        else {
            let usernameLength = username.length;

            if(usernameLength < 6) {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Độ dài tài khoản phải từ 6 ký tự/</p>"
                })
                return false;
            }
            else {
                return true;
            }
        }
    }

    createAccount = () => {
        fetch('https://localhost:44376/api/customer/account/createCustomerAccountAndCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.refs.username.value,
                password: this.refs.password.value,
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
            if(res === true) {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    icon: 'success',
                    html: "<p style='font-size: 15px'>Tạo tài khoản thành công</p>"
                }).then((res) => {
                    if(res.value) {
                        this.props.history.push("/");
                    }
                });
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    validateInput() {
        let username = window.$("#username").val();
        let password = window.$("#password").val();
        let name = window.$("#name").val();
        let birthday = window.$("#birthday").val();
        let phone = window.$("#phone").val();
        let address = window.$("#address").val();
        let email = window.$("#address").val();
        
        //check blank
        if(username === "") {
            document.getElementById("username").setCustomValidity("Vui lòng nhập vào tên tài khoản!");
            return;
        } else {
            document.getElementById("username").setCustomValidity("");
        }

        if(password === "") {
            document.getElementById("password").setCustomValidity("Vui lòng nhập vào mật khẩu!");
            return;
        } else {
            document.getElementById("password").setCustomValidity("");
        }

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
                                        <input className="input--style-3" type="text" placeholder="Tài khoản" id="username" name="Username" ref="username" required/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="password" placeholder="Mật khẩu" id="password" name="Password" ref="password" required/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Họ tên" id="name" name="Name" ref="name" required/>
                                    </div>
                                    <div className="input-group" style={{borderBottom: "none"}}>
                                        <span style={{color: "#ccc", fontSize: "16px", padding: "5px 0", marginRight: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.2)"}}>Giới tính</span>
                                        <select className="input--style-3" ref="gender" required style={{padding: "4px 0"}}>
                                            Giới tính { this.renderGender() }
                                        </select>
                                    </div>
                                    <div className="input-group" style={{borderBottom: "none"}}>
                                        <span style={{color: "#ccc", fontSize: "16px", padding: "5px 0", marginRight: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.2)"}}>Ngày sinh</span>
                                        <input className="input--style-3 js-datepicker" type="date" placeholder="Birthdate" id="birthday" name="birthday" ref="birthday" required style={{borderBottom: "1px solid rgba(255, 255, 255, 0.2)", width: "60%", padding: "0"}}/>
                                        <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Số điện thoại" id="phone" name="phone" ref="phone" required/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Địa chỉ" id="address" name="Address" ref="address" required/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Email" id="email" name="email" ref="email" required/>
                                    </div>
                                    <div className="p-t-10">
                                        <center><button className="btn btn--pill btn--green" type="submit" onClick={this.validateInput}>Đăng ký</button></center>
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
export default Register;