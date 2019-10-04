import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class FilterByPrice extends React.Component {
    Slider = () => (
        <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
    );

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Filter by Price</h3>
                {/* <div id="price-slider"></div> */}
                { this.Slider() }
            </div>
            
            // {/* <!-- aside widget --> */}
        );
    }
}

export default FilterByPrice;