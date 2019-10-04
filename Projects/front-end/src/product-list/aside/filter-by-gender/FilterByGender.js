import React from 'react';

class FilterByGender extends React.Component {
    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Filter by Gender</h3>
                <ul className="list-links">
                    <li className="active"><a href=" #">Men</a></li>
                    <li><a href=" #">Women</a></li>
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterByGender;