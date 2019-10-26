import React from 'react';

class Breadcrumb extends React.Component {
    render() {
        return (
             // <!-- BREADCRUMB -->
            <div id="breadcrumb">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><a href=" #">Home</a></li>
                        <li><a href=" #">Products</a></li>
                        <li><a href=" #">Category</a></li>
                        <li className="active">Product Name Goes Here</li>
                    </ul>
                </div>
            </div>
            // <!-- /BREADCRUMB -->
        );
    }
}

export default Breadcrumb;