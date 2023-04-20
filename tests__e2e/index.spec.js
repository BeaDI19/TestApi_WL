const { test, expect } = require("@playwright/test");

test.describe("basic test", async () => {

  test("if pong is displayed", async ({ page }) => {
    await page.goto("http://localhost:3000/ping");

    const pong = await page.$$("body pre");
    expect(pong).toBeTruthy();
  });
});