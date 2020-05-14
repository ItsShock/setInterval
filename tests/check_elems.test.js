const puppeteer = require('puppeteer');
let urlToTest = "http://127.0.0.1:8080/";

describe("Zadanie nr. 2", () => {
  const timeout = 30000;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.goto(urlToTest);
    await page.waitFor(1000);
  }, timeout);

  afterAll(async () => {
    await browser.close();
  })

  it("Dodano button o odpowiednim ID", async () => {
    const button = await page.$eval("#startInterval", elem => !!elem);
    expect(button).toBe(true);
  }, timeout);

  it("Po kliknięciu w button, uruchamia się timer i po 5 sekundach wyświetla 'Boom!' w H1", async () => {
    await page.click("#startInterval");
    await page.waitFor(8000);

    const counter = await page.$eval("#counter", elem => elem.innerText);
    expect(counter).toBe('7');
  }, timeout);
});
