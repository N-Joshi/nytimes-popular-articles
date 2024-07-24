import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchArticles } from '../api/newYorkTimesApi';
import type { Article } from '../types/Articles';

function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    }
    loadArticles();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Most Popular Articles
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item key={article.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <CardActionArea
                component={Link}
                to={`/article/${article.id}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {article.media &&
                  article.media[0] &&
                  article.media[0]['media-metadata'][2] && (
                    <CardMedia
                      component="img"
                      image={article.media[0]['media-metadata'][2].url}
                      alt={article.title}
                      sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                    />
                  )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.byline}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.published_date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArticlesList;
