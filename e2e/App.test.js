describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have Weather screen', async () => {
    await expect(element(by.id('cities-list'))).toBeVisible();
  });

  it('should have Paris item on the list of cities', async () => {
    await expect(element(by.id('Paris'))).toBeVisible();
  });

  it('should redirect to details screen of Paris after press on Paris item', async () => {
    await element(by.id('Paris')).tap();
    await expect(element(by.text('Humidity'))).toBeVisible();
    await expect(element(by.text('Pressure'))).toBeVisible();
    await expect(element(by.text('Wind speed'))).toBeVisible();
    await expect(element(by.text('Cloud cover'))).toBeVisible();
  });

  it('should go back after press on return button', async () => {
    await element(by.id('Paris')).tap();
    await element(by.text('Weather')).tap();
    await expect(element(by.text('Weather'))).toBeVisible();
  });

});
