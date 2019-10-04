import React from 'react';
import ProductNavigation from '../navigation/ProductNavigation';
import Breadcrumb from './breadcrumb/Breadcrumb';
import Aside from './aside/Aside';
import Main from './main/Main';

class ProductList extends React.Component {
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
                            <Aside></Aside>
                            <Main></Main>                            
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
