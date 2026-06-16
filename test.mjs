import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173/', {waitUntil: 'networkidle0', timeout: 10000});
    await browser.close();
    console.log("TEST SUCCESSFUL");
  } catch (err) {
    console.error('SCRIPT ERROR:', err.message);
  }
})();
