import React from 'react';
import NumberFormat from 'react-number-format';

class Filter extends React.Component {
    state = {
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000',
        color: [],
        filterBySize: ''
    }

    getColor = () => {
        fetch(`https://localhost:44376/api/customer/color/getColorById?id=${this.state.filterByColor}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                color: res
            });
        })
        .catch(error => {
            console.log(error)
        })
    }

    resetPrice = () => {
        this.props.filterByPrice(0, 0);

        this.setState({
            filterByMinPrice: 0,
            filterByMaxPrice: 0
        })
    }

    resetColor = () => {
        this.props.filterByColor('00000000-0000-0000-0000-000000000000');

        this.setState({
            filterByColor: '00000000-0000-0000-0000-000000000000',
            color: []
        });
    }

    resetSize = () => {
        this.props.filterBySize('');

        this.setState({
            filterBySize: ''
        });
    }

    renderPrice = () => {
        let price;

        if(this.state.filterByMaxPrice !== 0) {
            price = <ul className="filter-list">
                        <li><span className="text-uppercase">Giá:</span></li>
                        <li><a href=" #" onClick={this.resetPrice}>Từ: <NumberFormat value={this.state.filterByMinPrice} displayType={'text'} thousandSeparator={true}/></a></li>
                        <li><a href=" #" onClick={this.resetPrice}>Đến: <NumberFormat value={this.state.filterByMaxPrice} displayType={'text'} thousandSeparator={true}/></a></li>
                    </ul>
        }

        return price;
    }

    renderColor = () => {
        let color;
        
        if(this.state.filterByColor !== '00000000-0000-0000-0000-000000000000') {
            color = <ul className="filter-list">
                        <li><span className="text-uppercase">Màu:</span></li>
                        <li><a href=" #" onClick={this.resetColor} style={{ border: "1px solid #F8694A", backgroundColor: `${this.state.color.colorValue}`, color: this.state.color.name === "Trắng" ? "#000" : "#FFF" }}>{this.state.color.name}</a></li>
                    </ul>
        }

        return color;
    }

    renderSize = () => {
        let size;

        if(this.state.filterBySize !== '') {
            size =  <ul className="filter-list">
                        <li><span className="text-uppercase">Size:</span></li>
                        <li><a href=" #" onClick={this.resetSize} style={{ border: "1px solid #F8694A"}}>{this.state.filterBySize}</a></li>
                    </ul>
        }

        return size;
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            filterByMinPrice: nextProps.minPrice,
            filterByMaxPrice: nextProps.maxPrice,
            filterByColor: nextProps.color,
            filterBySize: nextProps.size
        }, () => {
            this.getColor();
        });
    }

    render() {
        return (
            // {/* <!-- aside widget --> */}
            <div className="aside">
                <h3 className="aside-title">Bộ lọc</h3>

                {this.renderPrice()}
                {this.renderColor()}
                {this.renderSize()}
                {/* <ul className="filter-list">
                    <li><span className="text-uppercase">color:</span></li>
                    <li><a href=" #" style={{ backgroundColor: "#8A2454", color: "#FFF" }}>Camelot</a></li>
                    <li><a href=" #" style={{ backgroundColor: "#475984", color: "#FFF" }}>East Bay</a></li>
                    <li><a href=" #" style={{ backgroundColor: "#BF6989", color: "#FFF" }}>Tapestry</a></li>
                    <li><a href=" #" style={{ backgroundColor: "#9A54D8", color: "#FFF" }}>Medium Purple</a></li>
                </ul>

                <ul className="filter-list">
                    <li><span className="text-uppercase">Size:</span></li>
                    <li><a href=" #">X</a></li>
                    <li><a href=" #">XL</a></li>
                </ul>

                <ul className="filter-list">
                    <li><span className="text-uppercase">Price:</span></li>
                    <li><a href=" #">MIN: $20.00</a></li>
                    <li><a href=" #">MAX: $120.00</a></li>
                </ul>

                <ul className="filter-list">
                    <li><span className="text-uppercase">Gender:</span></li>
                    <li><a href=" #">Men</a></li>
                </ul> */}

                <button className="primary-btn">Xoá tất cả</button>
            </div>
            // {/* <!-- /aside widget --> */}
        );
    }
}

export default Filter;