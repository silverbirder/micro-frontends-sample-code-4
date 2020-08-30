import postal from 'postal'

window.postal = postal;

let allReadyCount = 0;
window.postal.subscribe({
    channel: 'page',
    topic: '*.ready',
    callback: function () {
        allReadyCount++;
        if (allReadyCount == 3) {
            window.postal.publish({
                channel: 'page',
                topic: 'page.allReady',
            });
        }
    }
});