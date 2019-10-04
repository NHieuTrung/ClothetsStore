import React from 'react';
import Filter from './filter/Filter';
import FilterByPrice from './filter-by-price/FilterByPrice';
import FilterByColor from './filter-by-color/FilterByColor';
import FilterBySize from './filter-by-size/FilterBySize';
import FilterByBrand from './filter-by-brand/FilterByBrand';
import FilterByGender from './filter-by-gender/FilterByGender';

class Aside extends React.Component {
    render() {
        return (
            // {/* <!-- ASIDE --> */}
            <div id="aside" className="col-md-3">
                <Filter></Filter>
                <FilterByPrice></FilterByPrice>
                <FilterByColor></FilterByColor>
                <FilterBySize></FilterBySize>
                <FilterByBrand></FilterByBrand>
                <FilterByGender></FilterByGender>
            </div>
            // {/* <!-- /ASIDE --> */}
        );
    }
}

export default Aside;