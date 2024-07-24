import axios from 'axios';

import { fetchArticleById, fetchArticles } from '../api/newYorkTimesApi';
import type { Article } from '../types/Articles';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Functions', () => {
  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Sample Article 1',
      abstract: 'Abstract of Sample Article 1',
      byline: 'Author 1',
      published_date: '2024-07-24',
      url: 'https://example.com/article1',
      media: [],
    },
    {
      id: 2,
      title: 'Sample Article 2',
      abstract: 'Abstract of Sample Article 2',
      byline: 'Author 2',
      published_date: '2024-07-25',
      url: 'https://example.com/article2',
      media: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchArticles fetches articles successfully', async () => {
    mockedAxios.get.mockResolvedValue({ data: { results: mockArticles } });
    const period = 1;
    const articles = await fetchArticles(period);

    expect(articles).toEqual(mockArticles);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=Qlh1bEUZNnwoAR6F47AiQhDqEGsUDGdl`
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  test('fetchArticleById finds the article by id', async () => {
    mockedAxios.get.mockResolvedValue({ data: { results: mockArticles } });

    const article = await fetchArticleById(1);

    expect(article).toEqual(mockArticles[0]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Qlh1bEUZNnwoAR6F47AiQhDqEGsUDGdl`
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
