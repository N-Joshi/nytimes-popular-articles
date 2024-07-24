import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { fetchArticles } from '../api/newYorkTimesApi';
import ArticlesList from '../components/ArticlesList';

jest.mock('../api/newYorkTimesApi');

describe('ArticlesList', () => {
  beforeEach(() => {
    (fetchArticles as jest.Mock).mockClear();
  });

  test('renders ArticlesList and displays header', () => {
    render(
      <Router>
        <ArticlesList />
      </Router>
    );
    expect(screen.getByText('Most Popular Articles')).toBeInTheDocument();
  });

  it('renders a list of articles', async () => {
    // Arrange
    (fetchArticles as jest.Mock).mockResolvedValue([
      {
        id: 1,
        title: 'Mock Article 1',
        abstract: 'Abstract of Mock Article 1',
        url: 'http://example.com/1',
        byline: 'Author 1',
        published_date: '2024-01-01',
        media: [
          {
            'media-metadata': [
              {},
              {},
              { url: 'https://example.com/image1.jpg' },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Mock Article 2',
        abstract: 'Abstract of Mock Article 2',
        url: 'http://example.com/2',
        byline: 'Author 2',
        published_date: '2024-01-02',
        media: [
          {
            'media-metadata': [
              {},
              {},
              { url: 'https://example.com/image2.jpg' },
            ],
          },
        ],
      },
    ]);

    // Act
    render(
      <Router>
        <ArticlesList />
      </Router>
    );

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Mock Article 1')).toBeInTheDocument();
    });
  });

  test('handles empty articles list', async () => {
    (fetchArticles as jest.Mock).mockResolvedValue([]);

    render(
      <Router>
        <ArticlesList />
      </Router>
    );

    await waitFor(() =>
      expect(screen.queryByText('Article 1')).not.toBeInTheDocument()
    );
  });
});
