import React from 'react';
import Filter from './filter/Filter';
import List from './list/List';

class Main extends React.Component {
    render() {
        return (
            // {/* <!-- MAIN --> */}
            <div id="main" className="col-md-9">
                <Filter></Filter>
                <List></List>
            </div>
            // {/* <!-- /MAIN --> */}
        );
    }
}

export default Main;