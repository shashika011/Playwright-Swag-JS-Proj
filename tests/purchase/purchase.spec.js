import { test, expect } from '../../fixtures/testFixtures.js';
import { readJson } from '../../utils/fileUtils.js';

const userData = readJson('./test-data/loginData.json');
const purchaseData = readJson('./test-data/purchaseData.json');

test('user can purchase an item from Sauce Demo', async ({
  page,
  loginPage,
  homePage,
  cartPage,
  checkoutPage,
}) => {
  await homePage.goto();
  await loginPage.login(userData.validUser.username, userData.validUser.password);
  await expect(page).toHaveURL(/inventory\.html/);

  await homePage.addProductToCart(purchaseData.product);
  await homePage.openCart();
  await expect(cartPage.cartItem).toContainText(purchaseData.product);

  await cartPage.proceedToCheckout();
  await checkoutPage.fillInformation(purchaseData.customer);
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await checkoutPage.finishOrder();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});
