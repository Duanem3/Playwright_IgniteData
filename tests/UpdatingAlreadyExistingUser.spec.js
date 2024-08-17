const { test } = require('@playwright/test');
const {UserFormPage} =require('./Pages/UsersFormPage');

test.describe('Edit User and Validate Required Fields Separately', () => {
  let userFormPage;

  test.beforeEach(async ({ page }) => {
    // Navigate to the application and set up UserFormPage
    await page.goto('http://localhost:3000'); // Adjust the URL if needed
    userFormPage = new UserFormPage(page);

    // Common action: Locate and click the edit button for Tom Jones before each test
    await userFormPage.editUser('Tom Jones');
  });

  test('should show validation message and disable update button when name is removed during edit', async () => {
    // Clear the name field
    await userFormPage.fillName('');

    // Validate that the "Update" button is disabled
    await userFormPage.assertUpdateButtonIsDisabled();

    // Validate that the correct validation message is shown for the name
    await userFormPage.assertNameErrorMessageIsVisible();
  });

  test('should show validation message and disable update button when profession is removed during edit', async () => {
    // Clear the profession field
    await userFormPage.fillProfession('');

    // Validate that the "Update" button is disabled
    await userFormPage.assertUpdateButtonIsDisabled();

    // Validate that the correct validation message is shown for the profession
    await userFormPage.assertProfessionErrorMessageIsVisible();
  });
});
