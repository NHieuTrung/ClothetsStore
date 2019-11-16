import React from 'react';
import './style.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal= withReactContent(Swal);

class Main extends React.Component{
    state={
        token: '',
        information: [],
        address: '',
        phone: '',
        email: '',
        customerId:'00000000-0000-0000-0000-000000000000',
        isLoggedIn: false,
        provinces: [],
        provinceId: 0,
        districts: [],
        districtId: 0
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
        } else {
            window.location.href = "/";
        }
    }

    checkPreviousUrl = () => {
        let url = document.referrer;
        let suffix = url.substring(url.lastIndexOf("/") + 1, url.length);
        
        if(suffix !== "cartdetail") {
            window.location.href = "/";
        }
    }

    getDistrictsByProvinceId = () => {
        fetch(`https://localhost:44376/api/customer/delivery/getDistrictsByProvinceId?provinceId=${this.state.provinceId}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                districts: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
    }

    getProvinces = () => {
        fetch(`https://localhost:44376/api/customer/delivery/getProvinces`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                provinces: res
            });
        })
        .catch(error =>{
            console.log(error)
        })
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
                information: res,
                address: res.address,
                phone: res.phone,
                email: res.email
            }, () => {
                this.onChangeInformation();
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
            information: information,
            address: window.$("#address").val(),
            email: window.$("#email").val(),
            phone: window.$("#phone").val()
        }, () => {
            MySwal.fire({
                title: 'Thông báo',
                width: 300,
                padding: '2em',
                icon: 'success',
                html: "<p style='font-size: 15px'>Cập nhật thông tin thành công</p>"
            })
            .then((res) => {
                this.onChangeInformation();
            });
        })
        // console.log(information.address)
        // localStorage.setItem("address",JSON.stringify(window.$("#address").val()));
        // localStorage.setItem("email",JSON.stringify(window.$("#email").val()));
        // localStorage.setItem("phone",JSON.stringify(window.$("#phone").val()));
    }

    checkEmailValidity=(email)=>{
        // eslint-disable-next-line no-useless-escape
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
        //eslint-disable-line
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

    onChangeProvince = () => {
        let provinceId = window.$("#province").val();

        this.setState({
            provinceId: provinceId
        }, () => {
            this.getDistrictsByProvinceId();
        }, () => {
            this.onChangeInformation();
        })
    }

    onChangeDistrict = () => {
        let districtId = window.$("#district").val();

        this.setState({
            districtId: districtId
        }, () => {
            this.onChangeInformation();
        });
    }

    onChangeInformation = () => {
        let address = window.$("#address").val();
        let email = window.$("#email").val();
        let phone = window.$("#phone").val();
        let province = window.$("#province").val();
        let district = window.$("#district").val();

        if(address !== this.state.address || email !== this.state.email || phone !== this.state.phone) {
            window.$("#btnHuy").prop("disabled", false);
            window.$("#btnOk").prop("disabled", true);
        } else {
            if(province === null || district === null) {
                window.$("#btnHuy").prop("disabled", true);
                window.$("#btnOk").prop("disabled", true);
            }
            else {
                window.$("#btnHuy").prop("disabled", true);
                window.$("#btnOk").prop("disabled", false);
            }
        }        
    }

    renderFormDiaChi = () => {
        if(this.state.information.length !== 0) {
            const listItems = <div className="panel-body">
                                <p className="form-group name">{this.state.information.name}</p>
                                <div className="form-group address">
                                    <label className="address-label">Địa chỉ: </label>
                                    <div>
                                        <input className="input-address" id="address" defaultValue={this.state.information.address} onChange={this.onChangeInformation}></input>
                                    </div>
                                    <div>
                                        <select className="input-address" id="province" ref="province" defaultValue="blank" onChange={this.onChangeProvince}>
                                            <option value="blank" disabled>Vui lòng chọn tỉnh thành</option>
                                            {this.renderProvinces()}
                                        </select>
                                    </div>
                                    <div>
                                        <select className="input-address" id="district" ref="district" defaultValue="blank" onChange={this.onChangeDistrict}>
                                            <option value="blank" disabled>Vui lòng chọn quận huyện</option>
                                            {this.renderDistricts()}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group email">
                                    <label className="email-lable">Email:</label>
                                    <div>
                                        <input className="input-email" id="email" defaultValue={this.state.information.email} onChange={this.onChangeInformation}></input>
                                    </div>
                                </div>
                                <div className="form-group phone">
                                    <label className="phone-lable">Điện thoại:</label>
                                    <div>
                                        <input className="input-phone" id="phone" defaultValue={this.state.information.phone} onChange={this.onChangeInformation}></input>
                                    </div>
                                </div>
                                <div className="action">
                                    <button type="button" className="btn btn-default ok" id="btnOk" style={{marginRight: "1em"}}>Giao đến địa chỉ này</button>
                                    <button type="button" className="btn btn-default huy" id="btnHuy" onClick={this.updateinfomation}>Sửa</button>
                                </div>
                                <span className="default">Mặc định</span>
                            </div>
            return listItems;
        }
    }

    renderProvinces = () => {
        if(this.state.provinces.length !== 0) {
            const provinces = this.state.provinces.map((item, idx) =>
                <option key={idx} value={item.provinceId}>{item.provinceName}</option>
            );

            return provinces;
        }
    }

    renderDistricts = () => {
        if(this.state.districts.length !== 0) {
            const districts = this.state.districts.map((item, idx) =>
                <option key={idx} value={item.districtId}>{item.districtName}</option>
            );
            
            return districts;
        }
        // if(this.state.provinces.length !== 0) {
        //     const provinces = this.state.provinces.map((item, idx) =>
        //         <option key={idx} value={item.provinceId}>{item.provinceName}</option>
        //     );

        //     return provinces;
        // }
    }
   
    componentDidMount=()=>{
        // this.checkPreviousUrl(); Khi nào xong thì gỡ comment
        this.checkLoggedIn();
        this.getProvinces();
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