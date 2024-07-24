import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Route, Routes,MemoryRouter } from 'react-router-dom';
import ArticleDetail from '../components/ArticleDetail';
import { fetchArticleById } from '../api/newYorkTimesApi';
import type { Article } from '../types/Articles';

jest.mock('../api/newYorkTimesApi', () => ({
  fetchArticleById: jest.fn(),
}));

const mockArticle: Article = {
  id: 1,
  title: 'Sample Article',
  abstract: 'This is a sample abstract.',
  byline: 'By Author',
  published_date: '2024-07-24',
  url: 'https://example.com',
  media: [
    {
      'media-metadata': [
        { url: '' },
        { url: '' },
        { url: 'https://example.com/image.jpg' }
      ]
    }
  ]
};

describe('ArticleDetail', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('displays loading spinner while loading', () => {
    (fetchArticleById as jest.Mock).mockResolvedValueOnce(mockArticle);

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
        </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays article details when loaded', async () => {
    (fetchArticleById as jest.Mock).mockResolvedValueOnce(mockArticle);

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Sample Article')).toBeInTheDocument();
      expect(screen.getByText('This is a sample abstract.')).toBeInTheDocument();
      expect(screen.getByText('By Author')).toBeInTheDocument();
      expect(screen.getByText('2024-07-24')).toBeInTheDocument();
      expect(screen.getByText('Read more')).toHaveAttribute('href', 'https://example.com');
    });

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('displays article not found message when no article is found', async () => {
    (fetchArticleById as jest.Mock).mockResolvedValueOnce(null);

    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Article not found')).toBeInTheDocument();
    });
  });
});
