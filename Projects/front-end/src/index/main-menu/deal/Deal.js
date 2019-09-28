import React from 'react';
import DealItem from './deal-item/DealItem';

class Deal extends React.Component {
    state = {
        numberOfItem: 3
    };

    renderItem = () => {
        let items = [];

        for(let i = 1; i <= this.state.numberOfItem; i++) {
            items.push(<DealItem key={i} id={i}></DealItem>);
        }

        return items;
    }

    render() {
        return (
            // <!-- section -->
            <div className="section">
                {/* <!-- container --> */}
                <div className="container">
                    {/* <!-- row --> */}
                    <div className="row">
                        {/* <!-- section-title --> */}
                        <div className="col-md-12">
                            <div className="section-title">
                                <h2 className="title">Deals Of The Day</h2>
                                <div className="pull-right">
                                    <div className="product-slick-dots-1 custom-dots"></div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /section-title --> */}

                        {/* <!-- banner --> */}
                        <div className="col-md-3 col-sm-6 col-xs-6">
                            <div className="banner banner-2">
                                <img src="/assets/img/banner14.jpg" alt="" />
                                <div className="banner-caption">
                                    <h2 className="white-color">NEW<br />COLLECTION</h2>
                                    <button className="primary-btn">Shop Now</button>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /banner --> */}

                        {/* <!-- Product Slick --> */}
                        <div className="col-md-9 col-sm-6 col-xs-6">
                            <div className="row">
                                <div id="product-slick-1" className="product-slick">
                                    { this.renderItem() }
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Product Slick --> */}
                    </div>
                    {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            // {/* <!-- /section --> */}
        )
    }
}

export default Deal;
