const { test, expect } = require("@playwright/test");

test.describe("navigation", () => {
	test.beforeEach(async ({ page }) => {
	  // Go to the starting url before each test.
	  await page.goto("http://localhost:3000/ping");
	});
  
	test("main navigation", async ({ page }) => {
	  // Assertions use the expect API.
	  await expect(page).toHaveURL("http://localhost:3000/ping");
	});

	test("if pong is displayed", async ({ page }) => {
		await page.goto("http://localhost:3000/ping");
	
		const pong = await page.$$("body pre");
		expect(pong).toBeTruthy();
	  });
  });

