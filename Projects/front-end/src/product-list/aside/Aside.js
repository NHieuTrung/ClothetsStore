import React from 'react';
import Filter from './filter/Filter';
import FilterByPrice from './filter-by-price/FilterByPrice';
import FilterByColor from './filter-by-color/FilterByColor';
import FilterBySize from './filter-by-size/FilterBySize';
import FilterByBrand from './filter-by-brand/FilterByBrand';
import FilterByGender from './filter-by-gender/FilterByGender';

class Aside extends React.Component {
    state = {
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000',
        filterBySize: '',
        filterByBrand: '00000000-0000-0000-0000-000000000000',
        filterByProductGender: '00000000-0000-0000-0000-000000000000'
    }

    filterByPrice = (minPrice, maxPrice) => {
        this.setState({
            filterByMinPrice: minPrice,
            filterByMaxPrice: maxPrice
        }, () => {
            this.props.filterByPrice(minPrice, maxPrice);
        });
    }

    filterByColor = (colorId) => {
        this.setState({
            filterByColor: colorId
        }, () => {
            this.props.filterByColor(colorId);
        });
    }

    filterBySize = (sizeName) => {
        this.setState({
            filterBySize: sizeName
        }, () => {
            this.props.filterBySize(sizeName);
        });
    }

    filterByBrand = (brandId) => {
        this.setState({
            filterByBrand: brandId
        }, () => {
            this.props.filterByBrand(brandId);
        });
    }

    filterByProductGender = (productGenderId) => {
        this.setState({
            filterByProductGender: productGenderId
        }, () => {
            this.props.filterByProductGender(productGenderId);
        });
    }

    render() {
        return (
            // {/* <!-- ASIDE --> */}
            <div id="aside" className="col-md-3">
                <Filter productGender={this.state.filterByProductGender} brand={this.state.filterByBrand} size={this.state.filterBySize} color={this.state.filterByColor} minPrice={this.state.filterByMinPrice} maxPrice={this.state.filterByMaxPrice} filterByPrice={this.filterByPrice} filterByColor={this.filterByColor} filterBySize={this.filterBySize} filterByBrand={this.filterByBrand} filterByProductGender={this.filterByProductGender}></Filter>
                <FilterByPrice filterByPrice={this.filterByPrice}></FilterByPrice>
                <FilterByColor filterByColor={this.filterByColor}></FilterByColor>
                <FilterBySize filterBySize={this.filterBySize}></FilterBySize>
                <FilterByBrand filterByBrand={this.filterByBrand}></FilterByBrand>
                <FilterByGender filterByProductGender={this.filterByProductGender}></FilterByGender>
            </div>
            // {/* <!-- /ASIDE --> */}
        );
    }
}

export default Aside;