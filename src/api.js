import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "a79f68d5351aa49e6b1a879f49d037f6",
    language: "ko-kr",
  },
});

export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  topRated: () => api.get("movie/top_rated"),
  latest: () => api.get("movie/latest"),
  upComming: () => api.get("movie/upcoming"),
  movieDetail: (id) => api.get(`movie/${id}`),
  video: (id) => api.get(`movie/${id}/videos`),
};
