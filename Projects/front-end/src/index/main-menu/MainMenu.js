import React from 'react';
import LatestProduct from './latest-product/LatestProduct';
import Deal from './deal/Deal';

class MainMenu extends React.Component {
    render() {
        return (
            <div>
                <Deal></Deal>
                <LatestProduct></LatestProduct>
            </div>
        );
    }
}

export default MainMenu;
