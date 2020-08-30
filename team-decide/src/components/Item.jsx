import React from 'react';

class Item extends React.Component {
    render() {
        return (
            <div>
                item name:{this.props.name}
            </div>
        );
    }
}

export default Item;