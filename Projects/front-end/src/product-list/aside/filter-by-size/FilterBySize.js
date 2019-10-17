import React from 'react';

class FilterBySize extends React.Component {
    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Kích cỡ</h3>
                <ul className="size-option">
                    <li className="active"><a href=" #">S</a></li>
                    <li className="active"><a href=" #">XL</a></li>
                    <li><a href=" #">SL</a></li>
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterBySize;