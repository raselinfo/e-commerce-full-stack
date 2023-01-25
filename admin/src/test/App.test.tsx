import { describe, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('Return Hello World', () => {
    // Arrange
    render(<App />);
    // Act
    // Expect
    expect(screen.getByRole('heading', {
      level: 1,
    })).toHaveTextContent('Hello World');
  });
});
