import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { ListContent } from './ListContent';

describe('ListContent', () => {
  it('renders list items', () => {
    const data = ['Item 1', 'Item 2', 'Item 3'];
    render(<ListContent data={data} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders ul element', () => {
    render(<ListContent data={['A']} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
}); 