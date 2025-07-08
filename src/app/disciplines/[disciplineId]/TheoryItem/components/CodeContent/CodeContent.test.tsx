import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { CodeContent } from './CodeContent';

describe('CodeContent', () => {

  jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
    oneDark: {}
  }));

  it('renders code block with text', () => {
    render(<CodeContent data={"console.log('test')"} />);
    expect(screen.getByText("console.log('test')")).toBeInTheDocument();
  });

  it('applies correct language class', () => {
    render(<CodeContent data={"let x = 1;"} language="js" />);
    const code = screen.getByText("let x = 1;");
    expect(code.closest('pre')).toHaveClass('prism-code');
  });
}); 