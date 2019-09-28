import React from 'react';
import LatestProductItem from './latest-product-item/LatestProductItem';

class LatestProduct extends React.Component {
    state = {
        numberOfItem: 8
    };

    renderItem = () => {
        let items = [];

        for(let i = 1; i <= this.state.numberOfItem; i++) {
            items.push(<LatestProductItem key={i} id={i}></LatestProductItem>);
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
                    {/* <!-- section title --> */}
                    <div className="col-md-12">
                        <div className="section-title">
                            <h2 className="title">Latest Products</h2>
                        </div>
                    </div>
                    {/* <!-- section title --> */}

                    { this.renderItem() }
                </div>
                {/* <!-- /row --> */}
                </div>
                {/* <!-- /container --> */}
            </div>
            // {/* <!-- /section --> */}
        )
    }
}

export default LatestProduct;
