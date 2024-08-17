const { test } = require('@playwright/test');
const {UserFormPage} =require('./Pages/UsersFormPage');

test.describe('Create New User and Validate Details', () => {
  let userFormPage;

  test.beforeEach(async ({ page }) => {
    // Navigate to the application and set up UserFormPage
    await page.goto('http://localhost:3000'); // Adjust the URL if needed
    userFormPage = new UserFormPage(page);
  });

  test('should create a new user and display the correct details', async () => {
    // Create a new user
    await userFormPage.createUser('Jason Roberts', 'Plumber', '1999-04-23');

    // Assert that the user details are displayed correctly in the table
    await userFormPage.assertUserDetailsInTable('Jason Roberts', '1999-04-23', 'Plumber');
  });
});
