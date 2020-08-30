import React from 'react';
import {hydrate} from 'react-dom';
import Items from "./components/Items"

window.postal.subscribe({
    channel: 'search',
    topic: 'search.word',
    callback: function (data) {
        hydrate(<Items {...{items: data.items}} />, document.querySelector('#team-decide-items'));
    }
});

window.postal.publish({
    channel: 'page',
    topic: 'decide.ready',
});