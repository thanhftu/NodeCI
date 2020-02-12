const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("test launch page and auth", () => {
  it("Test header has the correct text", async () => {
    const text = await page.$eval("a.brand-logo", el => el.innerHTML);
    expect(text).toEqual("Blogster");
  });

  it("Clicking login oauth flow", async () => {
    await page.click(".right a");
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
    // expect(url).toMatch(new RegExp("accounts.google.com", "gi"));
  });
  it("When Signed in, show logout button", async () => {
    await page.login();
    const selector = 'a[href="/auth/logout"]';
    const text = await page.getContentsOf(selector);
    expect(text).toEqual("Logout");
  });
});
