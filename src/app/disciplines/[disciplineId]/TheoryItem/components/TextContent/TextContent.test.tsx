import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { TextContent } from './TextContent';

describe('TextContent', () => {
  it('renders paragraph with text', () => {
    render(<TextContent data="Hello, world!" />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('renders long text', () => {
    const longText = 'A'.repeat(100);
    render(<TextContent data={longText} />);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });
}); 