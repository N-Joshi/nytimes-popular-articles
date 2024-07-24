import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchArticleById } from '../api/newYorkTimesApi';
import type { Article } from '../types/Articles';

function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadArticle() {
      if (id) {
        const fetchedArticle = await fetchArticleById(parseInt(id, 10));
        setArticle(fetchedArticle);
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!article) {
    return (
      <Container>
        <Typography variant="h5" color="textSecondary">
          Article not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ m: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to List
      </Button>
      <Card>
        {article.media &&
          article.media[0] &&
          article.media[0]['media-metadata'][2] && (
            <CardMedia
              component="img"
              image={article.media[0]['media-metadata'][2].url}
              alt={article.title}
              sx={{ height: 400, objectFit: 'cover' }}
            />
          )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {article.abstract}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {article.byline}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {article.published_date}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ArticleDetail;
