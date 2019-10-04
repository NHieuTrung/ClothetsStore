import React from 'react';
import ListItem from './list-item/ListItem';

class List extends React.Component {
    state = {
        numberOfItem: 8
    };

    renderItem = () => {
        let items = [];

        for(let i = 1; i <= this.state.numberOfItem; i++) {
            items.push(<ListItem key={i} id={i}></ListItem>);
        }

        return items;
    }

    render() {
        return (
            // {/* <!-- STORE --> */}
            <div id="store">
                {/* <!-- row --> */}
                <div className="row">
                    { this.renderItem() }
                </div>
                {/* <!-- /row --> */}
            </div>
            // {/* <!-- /STORE --> */}
        );
    }
}

export default List;