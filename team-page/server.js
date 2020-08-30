const querystring = require('querystring');
const express = require('express');
const Tailor = require('node-tailor');
const filterHeaderFn = () => ({});
const requestFragment = require('node-tailor/lib/request-fragment')(filterHeaderFn);
const port = process.env.PORT || 3000;
const teamSearchHost = process.env.TEAM_SEARCH_HOST || 'http://localhost:3003/search';
const teamDecideHost = process.env.TEAM_DECIDE_HOST || 'http://localhost:3002/decide';

const tailor = new Tailor({
    requestFragment: ((_, url, attributes) => {
        if (attributes.params['0'] === 'favicon.ico') {
            return;
        }
        let requestURL;
        const splitId = url.id.split('-');
        const team = splitId[1];
        const component = splitId[2];
        switch (team) {
            case 'decide':
                requestURL = `${teamDecideHost}/${component}`;
                break;
            case 'search':
                requestURL = `${teamSearchHost}/${component}`;
                break;
        }
        requestURL += `?${querystring.stringify(attributes.query)}`;
        return requestFragment(requestURL, {timeout: 1000}, {headers: {}});
    })
});

const app = express();
app.use('/static/', express.static('dist'));

app.get('/*', (req, res) => {
    req.headers['x-request-uri'] = req.url;
    req.url = '/index';
    tailor.requestHandler(req, res);
});

app.listen(port);