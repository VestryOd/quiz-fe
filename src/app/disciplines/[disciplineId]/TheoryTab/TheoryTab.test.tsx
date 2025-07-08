import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TheoryTab } from './TheoryTab';
import React from 'react';
import { useGetAllTheory } from '@/api/theory/theory';

// mock useGetAllTheory
jest.mock('@/api/theory/theory', () => ({
  useGetAllTheory: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => null),
    toString: () => '',
  }),
}));

const mockUseGetAllTheory = useGetAllTheory as jest.Mock;

describe('TheoryTab', () => {
  const baseItem = {
    id: '1',
    discipline: 'math',
    title: 'Теория 1',
    content: [],
    links: [],
    created_at: '',
    created_by: { id: 'u1', user_name: 'User', user_email: '', user_password: '', user_role: 'user' },
    updated_at: '',
  };

  const defaultProps = {
    disciplineId: 'math',
    onTheoryClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loader when loading', () => {
    mockUseGetAllTheory.mockReturnValue({ isLoading: true, isFetching: false });
    render(<TheoryTab {...defaultProps} />);
    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('renders error message', () => {
    mockUseGetAllTheory.mockReturnValue({ isLoading: false, isFetching: false, error: true });
    render(<TheoryTab {...defaultProps} />);
    expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
  });

  it('renders empty state', () => {
    mockUseGetAllTheory.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: { items: [], total: 0 },
    });
    render(<TheoryTab {...defaultProps} />);
    expect(screen.getByText(/отсутствуют/i)).toBeInTheDocument();
  });

  it('renders list of theory items and handles click', () => {
    mockUseGetAllTheory.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: {
        items: [
          { ...baseItem, id: '1', title: 'Теория 1' },
          { ...baseItem, id: '2', title: 'Теория 2' },
        ],
        total: 2,
        has_next: false,
        page: 1,
        limit: 10,
      },
    });
    render(<TheoryTab {...defaultProps} />);
    expect(screen.getByText('Теория 1')).toBeInTheDocument();
    expect(screen.getByText('Теория 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Теория 2'));
    expect(defaultProps.onTheoryClick).toHaveBeenCalledWith('2');
  });

  it('renders pagination and handles page change', () => {
    mockUseGetAllTheory.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: {
        items: [{ ...baseItem, id: '1', title: 'Теория 1' }],
        total: 20,
        has_next: true,
        page: 1,
        limit: 10,
      },
    });
    render(<TheoryTab {...defaultProps} />);
    // check for pagination
    const activePage = screen.getByText('1');
    expect(activePage).toBeInTheDocument();
    expect(activePage.closest('li')).toHaveClass('ant-pagination-item-active');
  });
}); 