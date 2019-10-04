import React from 'react';

class Filter extends React.Component {
    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Shop by:</h3>
                <ul className="filter-list">
                    <li><span className="text-uppercase">color:</span></li>
                    <li><a href=" #" style={{ backgroundColor: "#8A2454", color: "#FFF" }}>Camelot</a></li>
                    <li><a href=" #" style={{ backgroundColor: "#475984", color: "#FFF" }}>East Bay</a></li>
                    <li><a href=" #" style={{ backgroundColor: "#BF6989", color: "#FFF" }}>Tapestry</a></li>
                    <li><a href=" #" style={{ backgroundColor: "#9A54D8", color: "#FFF" }}>Medium Purple</a></li>
                </ul>

                <ul className="filter-list">
                    <li><span className="text-uppercase">Size:</span></li>
                    <li><a href=" #">X</a></li>
                    <li><a href=" #">XL</a></li>
                </ul>

                <ul className="filter-list">
                    <li><span className="text-uppercase">Price:</span></li>
                    <li><a href=" #">MIN: $20.00</a></li>
                    <li><a href=" #">MAX: $120.00</a></li>
                </ul>

                <ul className="filter-list">
                    <li><span className="text-uppercase">Gender:</span></li>
                    <li><a href=" #">Men</a></li>
                </ul>

                <button className="primary-btn">Clear All</button>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default Filter;