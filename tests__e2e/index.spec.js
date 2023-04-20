const { test, expect } = require("@playwright/test");

/* test.describe("basic test", async () => {

  test("if pong is displayed", async ({ page }) => {
    await page.goto("https://web-goodfood-dev-v1.azurewebsites.net/ping");

    const pong = await page.$$("body pre");
    expect(pong).toBeTruthy();
  });
}); */

test.describe("navigation", () => {
	test.beforeEach(async ({ page }) => {
	  // Go to the starting url before each test.
	  await page.goto("https://web-goodfood-dev-v1.azurewebsites.net/ping");
	});
  
	test("main navigation", async ({ page }) => {
	  // Assertions use the expect API.
	  await expect(page).toHaveURL("https://web-goodfood-dev-v1.azurewebsites.net/ping");
	});
  });

  