const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

Before({ timeout: 10000 }, async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user on the page to purchase a ticket", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 30000,
  });
});

When("user selects a ticket", async function () {
  await clickElement(this.page, "a:nth-child(4)");
  await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='192']"
  );
  await clickElement(
    this.page,
    "div[class='buying-scheme'] div:nth-child(5) span:nth-child(6)"
  );
  await clickElement(this.page, ".acceptin-button");
});

Then("user sees the booked ticket", async function () {
  const actual = await getText(this.page, ".ticket__check-title");
  expect(actual).contain("Вы выбрали билеты:");
});

When("user selects some tickets", { timeout: 40000 }, async function () {
  await clickElement(
    this.page,
    "a[class='page-nav__day page-nav__day_weekend']"
  );
  await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='190']"
  );
  await clickElement(
    this.page,
    "div[class='buying-scheme'] div:nth-child(5) span:nth-child(2)"
  );
  await clickElement(
    this.page,
    "div[class='buying-scheme'] div:nth-child(4) span:nth-child(6)"
  );
  await clickElement(
    this.page,
    "div[class='buying-scheme__wrapper'] div:nth-child(2) span:nth-child(10)"
  );
  await clickElement(this.page, ".acceptin-button");
});

When("user selects a seat that is not free", async function () {
  await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='199']"
  );
  await clickElement(
    this.page,
    ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
  );
});

Then("buy button should be disabled", async function () {
  const isDisabled = await this.page.$eval(
    ".acceptin-button",
    (button) => button.disabled
  );
  expect(isDisabled).equal(true);
});
