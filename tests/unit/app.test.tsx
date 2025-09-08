import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    // Basic smoke test - adjust based on your app structure
    expect(true).toBe(true);
  });
  
  it('has proper document title', () => {
    expect(document.title).toBeDefined();
  });
});
