import React from 'react';

class Breadcrumb extends React.Component {
    render() {
        return (
             // <!-- BREADCRUMB -->
            <div id="breadcrumb">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><a href=" #">Home</a></li>
                        <li className="active">Products</li>
                    </ul>
                </div>
            </div>
            // <!-- /BREADCRUMB -->
        );
    }
}

export default Breadcrumb;