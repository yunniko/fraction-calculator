import { expect, test } from "@playwright/test";

test("adds two fractions on the home page and shows the steps", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("First number").fill("1/3");
  await page.getByLabel("Second number").fill("1/6");
  await page.getByLabel("Operation").selectOption("add");

  const result = page.getByTestId("result");
  await expect(result).toContainText("1/2");
  await expect(result.locator("li")).not.toHaveCount(0);
});

test("shows a friendly error for invalid input", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("First number").fill("banana");
  await expect(page.getByTestId("result").getByRole("alert")).toBeVisible();
});

test("the /add page preselects addition and is reachable from the homepage", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Adding fractions →" }).click();
  await expect(page).toHaveURL(/\/add$/);
  await expect(page.getByLabel("Operation")).toHaveValue("add");
});
