import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { TableContent } from './TableContent';

describe('TableContent', () => {
  it('renders table with correct rows and cells', () => {
    const data = [
      ['Header1', 'Header2'],
      ['Row1Col1', 'Row1Col2'],
      ['Row2Col1', 'Row2Col2'],
    ];
    render(<TableContent data={data} />);
    // Проверяем количество строк
    expect(screen.getAllByRole('row')).toHaveLength(3);
    // Проверяем количество ячеек
    expect(screen.getAllByRole('cell')).toHaveLength(6);
    // Проверяем содержимое
    expect(screen.getByText('Header1')).toBeInTheDocument();
    expect(screen.getByText('Row2Col2')).toBeInTheDocument();
  });

  it('applies correct class for styling', () => {
    const data = [['A', 'B']];
    render(<TableContent data={data} />);
    const cell = screen.getByText('A');
    expect(cell.className).toMatch(/td/);
  });
}); 