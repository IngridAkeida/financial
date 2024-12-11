import { Movies } from "../types/movies";

export const getMoviesList = async () => {
  const response = await fetch('https://reactnative.dev/movies.json');
  const data = await response.json();
  if(data.movies) {
    return data.movies as Movies[];
  }
  return [];
}