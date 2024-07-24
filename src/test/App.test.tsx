// App.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import App from '../components/App';
import ArticleDetail from '../components/ArticleDetail';
import ArticlesList from '../components/ArticlesList';

jest.mock('../components/ArticlesList', () => () => (
  <div>Articles List Component</div>
));
jest.mock('../components/ArticleDetail', () => () => (
  <div>Article Detail Component</div>
));

describe('App Component', () => {
  test('renders ArticlesList component at root path', () => {
    render(<App />);

    expect(screen.getByText('Articles List Component')).toBeInTheDocument();
  });

  test('renders ArticleDetail component for /article/:id path', async () => {
    render(
      <MemoryRouter initialEntries={['/article/1']}>
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText('Article Detail Component');
  });
});
