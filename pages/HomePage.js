export class HomePage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async goto() {
    await this.page.goto('/');
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
