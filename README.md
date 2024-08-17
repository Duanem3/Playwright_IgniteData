# Notes/assumptions/issues

- You should think about changing the date picker as it is not so user friendly. You cannot enter a date manually without having to select the date on the date picker. You should be able to enter a date manually into the picker
- It is very difficult to remove a date and enter a blank date. This makes it hard to test whether the validation is working for a blank date field. As if you remove hte date, it seems to use the previously entered date. So you cannot remove a date and submit a blank date (for testing purposes)
- When you are adding a user, when you enter a name and a profession and then remove them, you get a "*" error validation message. However this message should be a bit more descriptive, for example "Please enter a name". It seems to show a more relevant message on edit user mode
- It is not clearly indicated with the 'Add new User' button when it is enabled and disabled. Maybe a colur change of enable or disabled state should be applied to indicate users that they can click the button
- There is no indication that you have entered an invalid date. Forexample, you can enter a date such as "abcd2024-08-17".
- Should think about adding ids to the field elements as it the best method for interacting with elements. At the moment, using the name attribute is the next best way, however this can cause maintainability issues if there are other elements on the page with the same name or the name changes in the future
- Maybe the 'Profession' field should have text length validation just like the name field. As when the profession is really long, the view users table gets misaligned and doesnt look good
- You can create name and profession with just blank space marks as valid characters. This should not be allowed 


Here is some instructions to run the tests

# Playwright Test Project

This project contains automated tests using [Playwright](https://playwright.dev/). The tests are designed to validate the functionality of a web application, including form inputs, field validations, and other key features.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have [Node.js](https://nodejs.org/) installed (version 14.x or higher).
- You have a GitHub account.
- You have [Git](https://git-scm.com/) installed.

## Getting Started

Follow these steps to set up the project on your local machine:

### Clone the Repository


```git clone https://github.com/Duanem3/Playwright_IgniteData.git```

 ### Install Dependencies

```npm install```

This command will install all required dependencies, including Playwright.

### Install Playwright Browsers
Playwright needs to install specific browser binaries (like Chromium, Firefox, and WebKit) to run the tests. Run:


```npx playwright install```

### Running the Tests
You can run all tests using the following command:


```npx playwright test```

To run the tests in headed mode and in chrome (with the browser UI visible):


```npx playwright test --project chromium --headed```


### Running Specific Tests
To run a specific test file:

```npx playwright test tests/your-test-file.spec.js```

Replace your-test-file.spec.js with the test file you want to run

For example,
```npx playwright test UpdatingAlreadyExistingUser.spec --project chromium --headed ```

### Viewing the Test Report
After running the tests, you can generate and view a detailed HTML report:

```npx playwright show-report```

This command opens the report in your default browser.
