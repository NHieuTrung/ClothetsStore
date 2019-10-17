import React from 'react';

class FilterByBrand extends React.Component {
    state = {
        items: [],
        error: null
    }

    componentDidMount() {
        fetch("https://localhost:44376/api/customer/brand/getBrands")
            .then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        items: res
                    });
                },
                (err) => {
                    this.setState({
                        isLoaded: true,
                        error: err
                    });
                }
            )
    }

    renderItem = () => {
        let items = this.state.items.map((item, idx) => 
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <li key={ idx }><a href=" #">{ item.name }</a></li>
        );

        return items;
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Thương hiệu</h3>
                <ul className="list-links">
                    { this.renderItem() }
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterByBrand;