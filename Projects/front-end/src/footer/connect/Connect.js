import React from 'react';

class Connect extends React.Component {

    render() {
        return (
            // {/* <!-- footer subscribe --> */}
            <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer">
                    <h3 className="footer-header">Stay Connected</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                    <form>
                        <div className="form-group">
                            <input className="input" placeholder="Enter Email Address" />
                        </div>
                        <button className="primary-btn">Join Newslatter</button>
                    </form>
                </div>
            </div>
            // {/* <!-- /footer subscribe --> */}
        )
    }
}

export default Connect;