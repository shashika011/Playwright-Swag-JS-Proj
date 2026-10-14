export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.cartItem = page.locator('.cart_item');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
