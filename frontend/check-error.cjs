const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        }
    });

    page.on('pageerror', err => {
        console.log('PAGE EXCEPTION:', err.toString());
    });

    console.log('Navigating to http://localhost:5178/ ...');
    await page.goto('http://localhost:5178/', { waitUntil: 'networkidle2' });

    await browser.close();
})();
