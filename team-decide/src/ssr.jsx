import React from 'react';
import Items from "./components/Items";

const SSR = (props) => {
    return (
        <div id="team-decide">
            <div id="team-decide-items">
                <Items {...{items: props.items}} />
            </div>
        </div>
    )
};

export default SSR;