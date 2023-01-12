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
});
