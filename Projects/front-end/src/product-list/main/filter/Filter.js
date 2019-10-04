import React from 'react';

class Filter extends React.Component {
    render() {
        return (
            // {/* <!-- store top filter --> */}
            <div className="store-filter clearfix">
                <div className="pull-left">
                    <div className="row-filter">
                        <a href=" #"><i className="fa fa-th-large"></i></a>
                        <a href=" #" className="active"><i className="fa fa-bars"></i></a>
                    </div>
                    <div className="sort-filter">
                        <span className="text-uppercase">Sort By: </span>
                        <select className="input">
                                <option value="0">Position</option>
                                <option value="0">Price</option>
                                <option value="0">Rating</option>
                            </select>
                        <a href=" #" className="main-btn icon-btn"><i className="fa fa-arrow-down"></i></a>
                    </div>
                </div>
                <div className="pull-right">
                    <div className="page-filter">
                        <span className="text-uppercase">Show:</span>
                        <select className="input">
                                <option value="0">10</option>
                                <option value="1">20</option>
                                <option value="2">30</option>
                            </select>
                    </div>
                    <ul className="store-pages">
                        <li><span className="text-uppercase">Page:</span></li>
                        <li className="active">1</li>
                        <li><a href=" #">2</a></li>
                        <li><a href=" #">3</a></li>
                        <li><a href=" #"><i className="fa fa-caret-right"></i></a></li>
                    </ul>
                </div>
            </div>
            // {/* <!-- /store top filter --> */}
        );
    }
}

export default Filter;