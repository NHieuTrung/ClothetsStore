import React from 'react';

class FilterByGender extends React.Component {
    state = {
        items: [],
        error: null
    }

    componentDidMount() {
        fetch("https://localhost:44376/api/customer/productgender/getProductGenders")
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
                <h3 className="aside-title">Filter by Gender</h3>
                <ul className="list-links">
                    {/* <li className="active"><a href=" #">Men</a></li> */}
                    { this.renderItem() }
                </ul>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default FilterByGender;