const { test } = require('@playwright/test');
const {UserFormPage} =require('./Pages/UsersFormPage');

test.describe('Test that Name Input, Profession Field, and Date of Birth Validation are working ', () => {
  let userFormPage;

  test.beforeEach(async ({ page }) => {
    // Navigate to the application and set up UserFormPage
    await page.goto('/');
    userFormPage = new UserFormPage(page);
  });

  test('Should validate the name input length and button state', async () => {
    // Test with a name less than 4 characters
    await userFormPage.fillName('Tom');
    await userFormPage.assertShortErrorMessageIsVisible();
    await userFormPage.assertAddButtonIsDisabled();

    // Test with a name of more than 16 characters
    await userFormPage.fillName('ThisNameIsVeryVeryLong');
    await userFormPage.assertLongErrorMessageIsVisible();
    await userFormPage.assertAddButtonIsDisabled();
  });

  test('should require the profession field for enabling the Add New User button', async () => {
    // Fill in the name with a valid value
    await userFormPage.fillName('Chris Smith');

    // Fill in the date field
    await userFormPage.fillDateOfBirth('1999-04-23');

    // Leave the profession field empty
    await userFormPage.fillProfession(''); // Enters an empty field
    await userFormPage.assertAddButtonIsDisabled();
  });


  //TEst below will test the validation when the date of birth field is empty. However you cant seem to delete the date

 /*  test('should require the Date of Birth field for enabling the Add New User button', async () => {
    // Fill in the name with a valid value
    await userFormPage.fillName('Jeremy Doe');
    await userFormPage.fillProfession('baker');
    // Leave the Date of Birth field empty
    await userFormPage.fillDateOfBirth(''); // Clear any value if needed
    await userFormPage.assertAddButtonIsDisabled();
  }); */

  test('should handle Date of Birth correctly across different time zones (USA)', async ({ context }) => {
    //changes the browsers timezone to USA/newyork
    await context.grantPermissions([], { timezoneId: 'America/New_York' });
    //reloads the page to apply the timezone
    await userFormPage.page.reload();

    // Create a new user
    const userName = 'michael';
    const profession = 'Engineer';
    const dateOfBirth = '1999-04-23';

    await userFormPage.createUser(userName, profession, dateOfBirth);

    // Verify that the user details are displayed correctly in the table after timezone changed
    await userFormPage.assertUserDetailsInTable(userName, dateOfBirth, profession);
  });
});
