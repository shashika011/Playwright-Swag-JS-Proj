import { test, expect } from '../../fixtures/testFixtures.js';
import { readJson } from '../../utils/fileUtils.js';

const userData = readJson('./test-data/loginData.json');

test('valid user can log in to Sauce Demo', async ({ page, loginPage }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(loginPage.usernameInput).toBeVisible();

  await loginPage.login(userData.validUser.username, userData.validUser.password);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('invalid user sees a login error', async ({ page, loginPage }) => {
  await page.goto('/');
  await loginPage.login(userData.invalidUser.username, userData.invalidUser.password);

  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});
