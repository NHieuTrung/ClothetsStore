import React from 'react';
import Filter from './filter/Filter';
import List from './list/List';

class Main extends React.Component {
    state = {
        pageSize: 9,
        pageNumber: 1,
        orderBy: 'new',
        items: [],
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000'
    }

    changeSize = (size) => {
        this.setState({
            pageSize: size
        }, () => {
            this.props.changeSize(size);
        }, () => {
            this.getProducts();
        });
    }

    changePage = (page) => {
        this.setState({
            pageNumber: page
        }, () => {
            this.props.changePage(page);
        }, () => {
            this.getProducts();
        });
    }
    
    changeOrder = (order) => {
        this.setState({
            orderBy: order
        }, () => {
            this.props.changeOrder(order);
        }, () => {
            this.getProducts();
        })
    }

    getProducts = () => {
        fetch(`https://localhost:44376/api/customer/product/getProductVMs?pageSize=${this.state.pageSize}&pageNumber=${this.state.pageNumber}&orderBy=${this.state.orderBy}&minPrice=${this.state.filterByMinPrice}&maxPrice=${this.state.filterByMaxPrice}&colorId=${this.state.filterByColor}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                items: res
            })
        })
        .catch(error =>{
            console.log(error)
        })
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            pageSize: nextProps.pageSize,
            pageNumber: nextProps.pageNumber,
            filterByMinPrice: nextProps.minPrice,
            filterByMaxPrice: nextProps.maxPrice,
            filterByColor: nextProps.color
        }, () => {
            this.getProducts();
        });
    }

    render() {
        return (
            // {/* <!-- MAIN --> */}
            <div id="main" className="col-md-9">
                <Filter changeSize={this.changeSize} changePage={this.changePage} changeOrder={this.changeOrder} pageSize={this.state.pageSize} currentPageNumber={this.state.pageNumber} orderBy={this.state.orderBy} minPrice={this.state.filterByMinPrice} maxPrice={this.state.filterByMaxPrice} color={this.state.filterByColor}></Filter>
                <List items={this.state.items}></List>
            </div>
            // {/* <!-- /MAIN --> */}
        );
    }
}

export default Main;