const { test } = require('@playwright/test');
const {UserFormPage} =require('./Pages/UsersFormPage');

test.describe('Delete User and Verify Removal', () => {
  let userFormPage;

  test.beforeEach(async ({ page }) => {
    // Navigate to the application and set up UserFormPage
    await page.goto('/');
    userFormPage = new UserFormPage(page);
  });

  test('should delete Tom Jones and verify the details are no longer visible', async () => {
    // Delete Tom Jones
    await userFormPage.deleteUser('Tom Jones');

    // Verify that Tom Jones' details are no longer visible
    await userFormPage.assertUserIsNotVisible('Tom Jones');
  });
});
