import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import SSR from './ssr';
const port = process.env.PORT || 3002;
const host = process.env.HOST || `http://localhost:${port}`;
const app = express();
const production = process.env.NODE_ENV === 'production';

app.listen(port);

app.use("/decide/static/", express.static("./dist"));

app.get('/decide/items', (req, res) => {
    if(production) {
        const js = `<${host}/decide/static/fragment.js>; rel="fragment-script"`;
        res.writeHead(200, {
            Link: `${js}`,
            'Content-Type': 'text/html'
        });
    }
    const id = req.query.id ? req.query.id.split(',') : [];
    const mockData = {1: 'apple', 2: 'banana', 3: 'orange'};
    const items = id.map((i) => {
       return {name: mockData[i]};
    });
    ReactDOMServer.renderToNodeStream(
        <div>
            <SSR {...{items: items}}/>
            {!production && <script src={`${host}/decide/static/fragment.js`}></script>}
        </div>
    ).pipe(res);
});