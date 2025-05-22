import { render, screen } from '@testing-library/react';
import React from 'react';

import { withTracking } from '../withTracking';

const MockComponent = (): React.JSX.Element => (
  <>
    <div data-testid="mock-component">Mock component </div>
  </>
);

const intersectionObserverMock = () => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
});

window.IntersectionObserver = vi.fn().mockImplementation(intersectionObserverMock);

describe('withTracking', () => {
  it('Should render base component', () => {
    const ComponentWithTracker = withTracking(MockComponent);
    render(<ComponentWithTracker />);
    screen.getByText('Mock component');
    screen.getByTestId('mock-component');
  });
});
