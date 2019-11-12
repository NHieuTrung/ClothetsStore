import React from 'react';
import './style.css'
class Main extends React.Component{
    state={
        token: '',
        information: [],
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
                customerId:this.state.information.customerId
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

    renderFormDiaChi = () => {
        if(this.state.information.length !== 0) {
            const listItems = <div className="panel-body">
                                <p className="form-group name">{this.state.information.name}</p>
                                <div className="form-group address">
                                    <label className="address-label">Địa chỉ: </label>
                                    <div>
                                        <input className="input-address" defaultValue={this.state.information.address}></input>
                                    </div>
                                </div>
                                <div className="form-group email">
                                    <label className="email">Email:</label>
                                    <div>
                                        <input className="input-email" defaultValue={this.state.information.email}></input>
                                    </div>
                                </div>
                                <div className="form-group phone">
                                    <label className="address">Điện thoại:</label>
                                    <div>
                                        <input className="input-phone" defaultValue={this.state.information.phone}></input>
                                    </div>
                                </div>
                                <div className="action">
                                    <button type="button" className="btn btn-default ok">Giao đến địa chỉ này</button>
                                    <button type="button" className="btn btn-default huy">Sửa</button>
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