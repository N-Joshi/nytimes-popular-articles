import axios from 'axios';

import type { Article } from '../types/Articles';

export const API_KEY = '';
export const BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed';

export const fetchArticles = async (period: number = 1): Promise<Article[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${period}.json?api-key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    return [];
  }
};

export const fetchArticleById = async (id: number): Promise<Article | null> => {
  try {
    const articles = await fetchArticles();
    return articles.find((article) => article.id === id) || null;
  } catch (error) {
    return null;
  }
};
