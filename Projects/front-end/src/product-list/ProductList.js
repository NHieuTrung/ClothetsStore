import React from 'react';
import ProductNavigation from '../navigation/ProductNavigation';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Aside from './aside/Aside';
import Main from './main/Main';

class ProductList extends React.Component {
    state = {
        pageSize: 9,
        pageNumber: 1,
        orderBy: 'new',
        filterByMinPrice: 0,
        filterByMaxPrice: 0,
        filterByColor: '00000000-0000-0000-0000-000000000000',
        filterBySize: ''
    }

    getUrl = () => {
        let pageSizeTemp, pageSize = 9, pageNumberTemp, pageNumber = 1, orderByTemp, orderBy = 'new';
        let url = window.location.href;
        
        if(url.indexOf('pageSize') !== -1) {
            pageSizeTemp = url.substring(url.indexOf('pageSize'), url.length);
            pageSize = pageSizeTemp.substr(pageSizeTemp.indexOf('=') + 1, pageSizeTemp.indexOf('&') === -1 ? pageSizeTemp.length - pageSizeTemp.indexOf('=') : pageSizeTemp.indexOf('&') - pageSizeTemp.indexOf('=') - 1);
        }
        if(url.indexOf('pageNumber') !== -1) {
            pageNumberTemp = url.substring(url.indexOf('pageNumber'), url.length);
            pageNumber = pageNumberTemp.substr(pageNumberTemp.indexOf('=') + 1, pageNumberTemp.indexOf('&') === -1 ? pageNumberTemp.length - pageNumberTemp.indexOf('=') : pageNumberTemp.indexOf('&') - pageNumberTemp.indexOf('=') - 1);
        }
        if(url.indexOf('orderBy') !== -1) {
            orderByTemp = url.substring(url.indexOf('pageNumber'), url.length);
            orderBy = orderByTemp.substr(orderByTemp.indexOf('=') + 1, orderByTemp.indexOf('&') === -1 ? orderByTemp.length - orderByTemp.indexOf('=') : orderByTemp.indexOf('&') - orderByTemp.indexOf('=') - 1);
        }

        this.setState({
            pageSize: pageSize,
            pageNumber: pageNumber,
            orderBy: orderBy
        });
    }

    changeSize = (size) => {
        this.setState({
            pageSize: size
        });
    }

    changePage = (page) => {
        this.setState({
            pageNumber: page
        });
    }

    changeOrder = (order) => {
        this.setState({
            orderBy: order
        });
    }

    filterByPrice = (minPrice, maxPrice) => {
        this.setState({
            filterByMinPrice: minPrice,
            filterByMaxPrice: maxPrice
        });
    }

    filterByColor = (colorId) => {
        this.setState({
            filterByColor: colorId
        });
    }

    filterBySize = (sizeName) => {
        this.setState({
            filterBySize: sizeName
        });
    }

    componentDidMount = () => {
        this.getUrl();
    }

    render() {
        return (
            <div>
                {/* <ProductNavigation></ProductNavigation> */}
                <ProductNavigation></ProductNavigation>
                <Breadcrumb></Breadcrumb>
    
                {/* <!-- section --> */}
                <div className="section">
                    {/* <!-- container --> */}
                    <div className="container">
                        {/* <!-- row --> */}
                        <div className="row">
                            <Aside filterBySize={this.filterBySize} filterByPrice={this.filterByPrice} filterByColor={this.filterByColor}></Aside>
                            <Main size={this.state.filterBySize} color={this.state.filterByColor} minPrice={this.state.filterByMinPrice} maxPrice={this.state.filterByMaxPrice} pageSize={this.state.pageSize} pageNumber={this.state.pageNumber} orderBy={this.state.orderBy} changeSize={this.changeSize} changePage={this.changePage} changeOrder={this.changeOrder}></Main>
                        </div>
                        {/* <!-- /row --> */}
                    </div>
                    {/* <!-- /container --> */}
                </div>
                {/* <!-- /section --> */}
            </div>
            // </div>
        );
    }
}

export default ProductList;
