import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//SweetAlert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// import { base, firebaseApp } from '../base';
// import firebase from "firebase";
  
class Login extends React.Component{
    state = {
        token: '',
        isLoggedIn: false
    }

    checkLoggedIn = () => {
        let token = localStorage.getItem('authenticatedToken');

        if(token) {
            this.setState({
                token: token,
                isLoggedIn: true
            });
            
            this.props.history.push('/');
        }
    }

    checkExisted = (username, password) => {
        fetch('https://localhost:44376/api/customer/account/getAccountByUsername', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: username
            })
        })
        .then(res => res.text())
        .then(res => {
            if(res === "") {
                this.createUser(username, password);
            }
            else {
                let user = JSON.parse(res);
                localStorage.setItem('id', user.accountId);
                this.checkInformation();
                // this.props.history.push("/home");
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    checkInformation = () => {
        fetch(`https://localhost:44376/api/customer/customer/getCustomerByAccountId?accountId=${localStorage.getItem('id')}`)
        .then(res => res.text())
        .then(res => {
            if(res === "") {
                this.props.history.push("/information");
            }
            else {
                this.props.history.push("/home");
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    createUser = (username, password) => {
        fetch('https://localhost:44376/api/customer/account/createAccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: username,
                Password: password
            })
        })
        .then(res => res.json())
        .then(res => {
            alert("Login succesfully");
            localStorage.setItem('id', res.accountId);
            this.checkInformation();
            // this.props.history.push("/home");
        })
        .catch(error =>{
            console.log(error)
        })
    }

    // authenticate = (provider) => {
    //     const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    //     firebaseApp.auth()
    //                .signInWithPopup(authProvider)
    //                .then(this.authHandler);
    // };
     
    // //  # xử lý sau khi xác thực
    // authHandler = async (authData) => {
    //     // this.checkExisted("testusera");
    //     const userid = authData.user.providerData[0].uid;
    //     const provider = authData.additionalUserInfo.providerId;
    //     this.checkExisted(userid, userid);
    // };

    validateInput() {
        let username = window.$("#username").val();
        let password = window.$("#password").val();
        
        console.log(username);
        console.log(password);
        //check blank
        if(username === "") {
            document.getElementById("username").setCustomValidity("Vui lòng nhập vào tên tài khoản!");
            return;
        }
        document.getElementById("username").setCustomValidity("");

        if(password === "") {
            document.getElementById("password").setCustomValidity("Vui lòng nhập vào mật khẩu!");
            return;
        }
        document.getElementById("password").setCustomValidity("");
    }

    handleSubmit = (event) => { 
        event.preventDefault();

        //check usernamee validity
        let usernameValidity = this.checkUsernameValidity(window.$("#username").val());
        if(usernameValidity === false) {
            return;
        }

        //check password validity
        let passwordValidity = this.checkPasswordValidity(window.$("#password").val());
        if(passwordValidity === false) {
            return;
        }
        
        fetch('https://localhost:44376/api/customer/account/authenticateAccount', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: this.refs.username.value,
                Password: this.refs.password.value
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res === "") {
                MySwal.fire({
                    title: 'Thông báo',
                    width: 300,
                    padding: '2em',
                    html: "<img src='./assets/img/error.gif' style='width: 250px'/><p style='font-size: 15px'>Sai thông tin tài khoản</p>"
                })
            }
            else {
                localStorage.setItem("authenticatedToken", res);
                this.props.history.push("/");
            }
            
            // console.log(res);
            // console.log(res === "")
            // if (res.isValidated === false)
            //     alert('Invalid User');
            // else {
            //     alert('Success');
            //     localStorage.setItem('id', res.accountId);
            //     this.props.history.push("/home");
            // }
        })
        .catch(error =>{
            console.log(error)
        })
    };

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

    snowEffect = () => {
        let items = [];

        for(let i = 0; i < 10; i++) {
            items.push(<div className='snowflake' key={i}>❆</div>);
        }

        return items;
    }

    componentDidMount() {
        this.checkLoggedIn();
    }      

    render()
    {
        return(
            <div className="register">
                { this.snowEffect() }
                <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
                <div className="wrapper wrapper--w780">
                    <div className="card card-3">
                        <div className="card-heading"></div>
                            <div className="card-body">
                                <h2 className="title"><center>Đăng nhập</center></h2>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group">
                                        <input className="input--style-3" type="text" placeholder="Tài khoản" id="username" name="Username" ref="username"/>
                                    </div>
                                    <div className="input-group">
                                        <input className="input--style-3" type="password" placeholder="Mật khẩu" id="password" name="Password" ref="password"/>
                                    </div>
                                    {/* <div className="input-group"style={{ width: "20px", height: "20px" }}>
                                        <a onClick={() => this.authenticate("Facebook")}><FontAwesomeIcon size="lg" icon={['fab', 'facebook']}></FontAwesomeIcon></a>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <a onClick={() => this.authenticate("Google")}><FontAwesomeIcon size="lg" icon={['fab', 'google']}></FontAwesomeIcon></a>
                                        
                                    </div> */}
                                    <div className="p-t-10">
                                        <center><button className="btn btn--pill btn--green" type="submit" onClick={this.validateInput}>Đăng nhập</button></center>
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
export default Login;