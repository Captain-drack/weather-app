import React, { useState, useEffect } from "react";
import { fetchWeatherNews } from "../Services/newsServices";
import {
  Typography,
  Link,
  CardMedia,
  CardContent,
  Card,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";

interface Article {
  url: string;
  title: string;
  description: string;
  author?: string | null;
  content?: string;
  publishedAt?: string;
  urlToImage?: string;
}

const WeatherNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    fetchWeatherNews()
      .then((articles: Article[]) => setArticles(articles))
      .catch(console.error);
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  return (
    <div style={{ color: "#fff" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Weather Related News
      </Typography>
      <Grid container spacing={2}>
        {currentArticles.map((article, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card sx={{ backgroundColor: "#ffffff40", mb: 2 }}>
              {article.urlToImage && (
                <CardMedia
                  component="img"
                  height="140"
                  image={article.urlToImage}
                  alt={article.title}
                />
              )}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    color: "white",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    width: "100%",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "white",
                      textDecoration: "none",
                      display: "block",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {article.title}
                  </Link>
                </Typography>
                <Typography variant="body2" color="white">
                  {article.description}
                </Typography>
                {article.author && (
                  <Typography
                    variant="body2"
                    sx={{ color: "white", mt: 1, fontWeight: "bold" }}
                  >
                    {article.author}
                  </Typography>
                )}
                {article.publishedAt && (
                  <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} alignItems="center" sx={{ marginY: 5 }}>
        <Pagination
          count={Math.ceil(articles.length / articlesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          sx={{
            ul: {
              "& .MuiPaginationItem-root": {
                color: "white", // Change text color
              },
              "& .Mui-selected": {
                backgroundColor: "#ffffff90", // Change selected page color
              },
              "& .MuiPaginationItem-ellipsis": {
                color: "white", // Change ellipsis color
              },
            },
          }}
          color="primary" // Or any other color from your theme
        />
      </Stack>
    </div>
  );
};

export default WeatherNews;
