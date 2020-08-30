import React from 'react';
import Item from "./Item";

class Items extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map((item) => {
                    return <Item name={item.name}></Item>
                })}
            </ul>
        )
    }
}

export default Items;