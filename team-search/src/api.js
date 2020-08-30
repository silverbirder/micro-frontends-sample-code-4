import {api, axiosDefault as axios} from 'create-api'
const DECIDE_HOST = process.env.DECIDE_HOST || `http://localhost:3002`;

export function fetchItems(items) {
    const id = items.map((item) => {
        return item.id;
    }).join(',');
    const CACHE_KEY = `ITEMS_${id}`;
    const cache = api.cachedItems;
    if (cache && cache.has(CACHE_KEY)) {
        return Promise.resolve(cache.get(CACHE_KEY))
    }
    return axios.get(`${DECIDE_HOST}/decide/items?id=${id}`)
        .then(response => {
            const script = response.headers['link'].split(';')[0].match(/<([^>]+)>/)[1];
            const html = `${response.data}<script src="${script}"></script>`;
            cache && cache.set(CACHE_KEY, html);
            return html;
        })
}