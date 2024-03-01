import axios from "axios";

export interface Article {
  url: string;
  title: string;
  description: string;
  author?: string; 
  content?: string;
  publishedAt?: string;
  urlToImage?: string;
  source?: { id: string | null; name: string }; 
}
interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const fetchWeatherNews = async (): Promise<Article[]> => {
  const apiKey = process.env.REACT_APP_WEATHER_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=weather&apiKey=${apiKey}`;

  try {
    const response = await axios.get<ApiResponse>(url);
    console.log(response.data.articles, "-=-=-news data");
    const articles = response.data.articles.map((apiArticle: any): Article => ({
      url: apiArticle.url,
      title: apiArticle.title,
      description: apiArticle.description,
      author: apiArticle.author || undefined,
      content: apiArticle.content,
      publishedAt: apiArticle.publishedAt,
      urlToImage: apiArticle.urlToImage,
    }));
    return articles;
  } catch (error) {
    console.error("Failed to fetch general weather news:", error);
    throw error;
  }
};
