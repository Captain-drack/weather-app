import axios from "axios";

// Define the structure of an article as per NewsAPI response
export interface Article {
  url: string;
  title: string;
  description: string;
  author?: string; // optional, can be undefined
  content?: string;
  publishedAt?: string;
  urlToImage?: string;
  source?: { id: string | null; name: string }; // Adjust according to actual API response
}

// Define the structure of the NewsAPI response
interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// Fetch weather-related news from NewsAPI
export const fetchWeatherNews = async (): Promise<Article[]> => {
  const apiKey = process.env.REACT_APP_WEATHER_NEWS_API_KEY; // Ensure your API key is correctly set in your .env file
  const url = `https://newsapi.org/v2/everything?q=weather&apiKey=${apiKey}`;

  try {
    const response = await axios.get<ApiResponse>(url);
    console.log(response.data.articles, "-=-=-news data");
    const articles = response.data.articles.map((apiArticle: any): Article => ({
      // Map each 'apiArticle' to an 'Article' object, ensuring fields match the 'Article' interface
      url: apiArticle.url,
      title: apiArticle.title,
      description: apiArticle.description,
      author: apiArticle.author || undefined, // Convert 'null' to 'undefined' if needed
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
