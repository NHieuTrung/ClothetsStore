import React from 'react';

class FilterByColor extends React.Component {
    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Filter By Color:</h3>
                <ul className="color-option">
                    <li><a href=" #" style={{ backgroundColor: "#475984" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#8A2454" }}></a></li>
                    <li className="active"><a href=" #" style={{ backgroundColor: "#BF6989" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#9A54D8" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#675F52" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#050505" }}></a></li>
                    <li><a href=" #" style={{ backgroundColor: "#D5B47B" }}></a></li>
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterByColor;