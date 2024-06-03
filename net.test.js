const { clickElement, getText } = require("./lib/commands.js");

let page;

describe("Ticket purchase tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  }, 10000);
  afterEach(() => {
    page.close();
  });

  test("Покупка одного билета", async () => {
    await clickElement(page, "a:nth-child(4)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='192']"
    );
    await clickElement(page, "div:nth-child(5) span:nth-child(6)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  }, 30000);

  test("Покупка нескольких билетов", async () => {
    await clickElement(page, "a[class='page-nav__day page-nav__day_weekend']");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='190']"
    );
    await clickElement(page, "div:nth-child(5) span:nth-child(2)");
    await clickElement(page, "div:nth-child(4) span:nth-child(6)");
    await clickElement(
      page,
      "div[class='buying-scheme__wrapper'] div:nth-child(2) span:nth-child(10)"
    );
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  }, 40000);

  test("Бронирование неактивных мест", async () => {
    //await clickElement(page, "a:nth-child(2)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='199']"
    );
    await clickElement(
      page,
      ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken"
    );
    const isDisabled = await page.$eval(
      ".acceptin-button",
      (button) => button.disabled
    );
    expect(isDisabled).toEqual(true);
  }, 40000);
});
