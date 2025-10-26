// Basic smoke test for the application
describe('Application', () => {
  it('should run without errors', () => {
    expect(true).toBe(true);
  });

  it('should have document available', () => {
    expect(typeof document).toBe('object');
  });
});
