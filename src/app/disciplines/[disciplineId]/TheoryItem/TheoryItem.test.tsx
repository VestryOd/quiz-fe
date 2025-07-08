import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TheoryItem } from './TheoryItem';
import React from 'react';
import { RoleTypes } from '@/api/model/roleTypes';
import { TheoryItemTypes } from '@/api/model/theoryItemTypes';

describe('TheoryItem', () => {
  const baseTheory = {
    id: '1',
    discipline: 'math',
    title: 'Теорема Пифагора',
    content: [],
    links: [],
    created_at: '',
    created_by: { id: 'u1', user_name: 'User', user_email: '', user_password: '', user_role: RoleTypes.user },
    updated_at: '',
  };

  it('renders only title in previewMode', () => {
    render(<TheoryItem item={{ ...baseTheory, title: 'Preview Title' }} previewMode />);
    expect(screen.getByText('Preview Title')).toBeInTheDocument();
    // should be paragraphs, lists and etc
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders text, code, list, and table blocks in full mode', () => {
    const theory = {
      ...baseTheory,
      content: [
        { id: 'c1', content_type: TheoryItemTypes.text, order: 2, content_data: 'Текстовый блок', parentId: '', content_image: '' },
        { id: 'c2', content_type: TheoryItemTypes.code, order: 1, content_data: "console.log('test')", parentId: '', content_image: '' },
        { id: 'c3', content_type: TheoryItemTypes.list, order: 3, content_data: ['A', 'B'], parentId: '', content_image: '' },
        { id: 'c4', content_type: TheoryItemTypes.table, order: 4, content_data: [['1', '2'], ['3', '4']], parentId: '', content_image: '' },
      ],
    };
    render(<TheoryItem item={theory} />);
    // check for sorting: code (order 1) should be first
    const code = screen.getByText("console.log('test')");
    const text = screen.getByText('Текстовый блок');
    const listItem = screen.getByText('A');
    const tableCell = screen.getByText('4');
    expect(code).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
    expect(tableCell).toBeInTheDocument();
  });

  it('renders nothing for empty content', () => {
    render(<TheoryItem item={baseTheory} />);
    // only title
    expect(screen.getByText('Теорема Пифагора')).toBeInTheDocument();
  });
}); 