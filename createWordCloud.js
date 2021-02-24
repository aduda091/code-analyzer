const fs = require('fs');
const puppeteer = require('puppeteer');

const INPUT_FILE = 'wordlist.txt';
const OUTPUT_FILE = 'wordcloud.jpg';
const WC_URL = 'https://monkeylearn.com/word-cloud/';

const TIMEOUT_LONG = 5000;

// selectors
const selectors = {
    textArea: '#root .Form-page-content textarea',
    submitButton: '#root .Form-page-content .Blue-button',
    wordCloud: '#wordcloud svg'
};

const inputFile = fs.readFileSync(INPUT_FILE, 'utf-8');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(WC_URL);

    await page.waitForSelector(selectors.textArea);
    const textArea = await page.$(selectors.textArea);
    await textArea.type(inputFile);
    await page.$eval(selectors.textArea, (el, value) => (el.value = value), inputFile);

    await page.waitForTimeout(TIMEOUT_LONG);

    await page.click(selectors.submitButton);

    await page.waitForSelector(selectors.wordCloud);
    await page.waitForTimeout(TIMEOUT_LONG);

    const cloudImage = await page.$(selectors.wordCloud);

    await cloudImage.screenshot({ path: OUTPUT_FILE, type: 'jpeg', quality: 80 });

    await browser.close();
})();
