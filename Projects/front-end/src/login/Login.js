// import React from 'react';
// import google from './img/gg.jpg';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
// // import { base, firebaseApp } from '../base';
// // import firebase from "firebase";
  
// class Login extends React.Component{
//     state = {
//         idAccount: '',
//         isLoggedIn: false
//     }

//     checkLoggedIn = () => {
//         let id = localStorage.getItem('id');

//         if(id) {
//             this.setState({
//                 idAccount: id,
//                 isLoggedIn: true
//             });
            
//             this.props.history.push('/home');
//         }
//     }

//     checkExisted = (username, password) => {
//         fetch('https://localhost:44376/api/customer/account/getAccountByUsername', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 Username: username
//             })
//         })
//         .then(res => res.text())
//         .then(res => {
//             if(res == "") {
//                 this.createUser(username, password);
//             }
//             else {
//                 let user = JSON.parse(res);
//                 localStorage.setItem('id', user.accountId);
//                 this.checkInformation();
//                 // this.props.history.push("/home");
//             }
//         })
//         .catch(error =>{
//             console.log(error)
//         })
//     }

//     checkInformation = () => {
//         fetch(`https://localhost:44376/api/customer/customer/getCustomerByAccountId?accountId=${localStorage.getItem('id')}`)
//         .then(res => res.text())
//         .then(res => {
//             if(res == "") {
//                 this.props.history.push("/information");
//             }
//             else {
//                 this.props.history.push("/home");
//             }
//         })
//         .catch(error =>{
//             console.log(error)
//         })
//     }

//     createUser = (username, password) => {
//         fetch('https://localhost:44376/api/customer/account/createAccount', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 Username: username,
//                 Password: password
//             })
//         })
//         .then(res => res.json())
//         .then(res => {
//             alert("Login succesfully");
//             localStorage.setItem('id', res.accountId);
//             this.checkInformation();
//             // this.props.history.push("/home");
//         })
//         .catch(error =>{
//             console.log(error)
//         })
//     }

//     authenticate = (provider) => {
//         const authProvider = new firebase.auth[`${provider}AuthProvider`]();
//         firebaseApp.auth()
//                    .signInWithPopup(authProvider)
//                    .then(this.authHandler);
//     };
     
//     //  # xử lý sau khi xác thực
//     authHandler = async (authData) => {
//         // this.checkExisted("testusera");
//         const userid = authData.user.providerData[0].uid;
//         const provider = authData.additionalUserInfo.providerId;
//         this.checkExisted(userid, userid);
//     };

//     handleSubmit = (event) => { 
//         event.preventDefault();

//         fetch('https://localhost:44376/api/customer/account/validatePassword', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 Username: this.refs.username.value,
//                 Password: this.refs.password.value
//             })
//         })
//         .then(res => res.json())
//         .then(res => {
//             // console.log(res);
//             if (res.isValidated === false)
//                 alert('Invalid User');
//             else {
//                 alert('Success');
//                 localStorage.setItem('id', res.accountId);
//                 this.props.history.push("/home");
//             }
//         })
//         .catch(error =>{
//             console.log(error)
//         })
//     };

//     snowEffect = () => {
//         let items = [];

//         for(let i = 0; i < 10; i++) {
//             items.push(<div className='snowflake' key={i}>❆</div>);
//         }

//         return items;
//     }

//     componentDidMount() {
//         this.checkLoggedIn();
//     }      

//     render()
//     {
//         return(
//             <div>
//                 { this.snowEffect() }
//                 <div className="page-wrapper bg-gra-01 p-t-180 p-b-100 font-poppins">
//                 <div className="wrapper wrapper--w780">
//                     <div className="card card-3">
//                         <div className="card-heading"></div>
//                             <div className="card-body">
//                                 <h2 className="title"><center>Login</center></h2>
//                                 <form method="POST">
//                                     <div className="input-group">
//                                         <input className="input--style-3" type="text" placeholder="Username" name="Name" ref="username"/>
//                                     </div>
//                                     <div className="input-group">
//                                         <input className="input--style-3" type="password" placeholder="Password" name="Password" ref="password"/>
//                                     </div>
//                                     <div className="input-group"style={{ width: "20px", height: "20px" }}>
//                                         <a onClick={() => this.authenticate("Facebook")}><FontAwesomeIcon size="lg" icon={['fab', 'facebook']}></FontAwesomeIcon></a>
//                                         <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
//                                         <a onClick={() => this.authenticate("Google")}><FontAwesomeIcon size="lg" icon={['fab', 'google']}></FontAwesomeIcon></a>
                                        
//                                     </div>
//                                     <div className="p-t-10">
//                                         <button className="btn btn--pill btn--green" type="button" onClick={(e) => this.handleSubmit(e)}>Login</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
// export default Login;