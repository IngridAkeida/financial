import { Movies } from "../types/movies";

export const getMoviesList = async () => {
  try{
    const response = await fetch('https://reactnative.dev/movies.json');
    const data = await response.json();
    if(data.movies) {
      return data.movies as Movies[];
    }
    return [];
  } catch (error) {
    return false;
  }
}