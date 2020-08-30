const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3003;
const host = process.env.HOST || `http://localhost:${port}`;
const production = process.env.NODE_ENV === 'production';

const express = require('express');
const serialize = require('serialize-javascript');
const VueServerRenderer = require('vue-server-renderer');

const app = express();
app.use('/search/static/', express.static('dist'));

const template = fs.readFileSync(path.join(__dirname, 'src/index.template.html'), 'utf-8');
const renderer = VueServerRenderer.createBundleRenderer(path.join(__dirname, 'dist/vue-ssr-server-bundle.json'), {template});

app.get('/search/*', (req, res) => {
    const ctx = {url: req.url};
    renderer.renderToString(ctx, (err, html) => {
        if (err) {
            console.log(err);
            return res.status(500).end('Interval Server Error');
        }
        if (production) {
            const js = `<${host}/search/static/fragment.js>; rel="fragment-script"`;
            res.writeHead(200, {
                Link: `${js}`,
                'Content-Type': 'text/html'
            });
        } else {
          html += `<script src="${host}/search/static/fragment.js"></script>`
        }
        if (ctx.initialState) {
            res.write(
                `<script>window.__INITIAL_STATE__=${
                    serialize(ctx.initialState, { isJSON: true })
                }</script>`
            )
        }
        res.end(html);
    });
});

app.listen(port);