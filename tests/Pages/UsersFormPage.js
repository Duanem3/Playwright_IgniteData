const { expect } = require('@playwright/test');

class UserFormPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.dateInput = page.locator('div.react-datepicker__input-container input');
    this.professionInput = page.locator('input[name="profession"]');
    this.addButton = page.locator('button:has-text("Add new user")');
    this.updateButton = page.locator('button:has-text("Update")');
    this.shortErrorMessage = page.locator('div.form-error:has-text("name is too short")');
    this.longErrorMessage = page.locator('div.form-error:has-text("name is too long")');
    this.nameErrorMessage = page.locator('div.form-error').filter({ hasText: 'This field is required' }).first();
    this.professionErrorMessage = page.locator('div.form-error').filter({ hasText: 'This field is required' }).first();
  }

  // Form interactions
  async fillName(name) {
    await this.nameInput.fill(name);
  }

  async fillDateOfBirth(date) {
    await this.dateInput.fill(date);
    await this.page.getByLabel('Choose Friday, April 23rd,').click();

  }

  async fillProfession(profession) {
    await this.professionInput.fill(profession);
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async clickUpdateButton() {
    await this.updateButton.click();
  }

  async assertAddButtonIsDisabled() {
    await expect(this.addButton).toBeDisabled();
  }

  async assertUpdateButtonIsDisabled() {
    await expect(this.updateButton).toBeDisabled();
  }

  async assertShortErrorMessageIsVisible() {
    await expect(this.shortErrorMessage).toBeVisible();
  }

  async assertLongErrorMessageIsVisible() {
    await expect(this.longErrorMessage).toBeVisible();
  }

  async assertNameErrorMessageIsVisible() {
    await expect(this.nameErrorMessage).toBeVisible();
  }

  async assertProfessionErrorMessageIsVisible() {
    await expect(this.professionErrorMessage).toBeVisible();
  }

  async assertDateOfBirthIsCorrect(expectedDate) {
    const currentDate = await this.dateInput.inputValue();
    expect(currentDate).toBe(expectedDate);
  }

  // User list management
  getUserRow(userName) {
    return this.page.locator('tr', { hasText: userName });
  }

  getEditButton(userName) {
    return this.getUserRow(userName).locator('button:has-text("edit")');
  }

  getDeleteButton(userName) {
    return this.getUserRow(userName).locator('button:has-text("delete")');
  }

  async editUser(userName) {
    await this.getEditButton(userName).click();
  }

  async deleteUser(userName) {
    await this.getDeleteButton(userName).click();
  }

  async assertUserIsNotVisible(userName) {
    const userRow = this.getUserRow(userName);
    await expect(userRow).not.toBeVisible();
  }

  // Adding a user and validating details
  async createUser(name, profession, dateOfBirth) {
    await this.fillName(name);
    await this.fillProfession(profession);
    await this.fillDateOfBirth(dateOfBirth);
    await this.clickAddButton();
  }

  async assertUserDetailsInTable(name, dateOfBirth, profession) {
    const tableRow = this.getUserRow(name);
    await expect(tableRow).toContainText(name);
    await expect(tableRow).toContainText(dateOfBirth);
    await expect(tableRow).toContainText(profession);
  }
}

module.exports = { UserFormPage };
