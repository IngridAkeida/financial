import { router } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Movies } from "../../types/movies";
import { getMoviesList } from "../../services/movies";
import { MovieItem } from "../../components/movie-item";
import { MovieItemSkeleton } from "../../components/movie-item-skeleton";

export default function Home() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movies[]>([]);

  const getMovies = async () => {
    setLoading(true);
    const moviesList = await getMoviesList();
    setLoading(false);

    if (moviesList === false) {
      setError(true);
    } else {
      setMovies(moviesList);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleButton = () => {
    //jeito mais simples
    // router.push('./about?name=John&age=30');

    //jeito mais completo
    const params = new URLSearchParams();
    params.set("name", "John");
    params.set("age", "30");
    router.push(`/about?${params.toString()}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Is para Sobre (com params)" onPress={handleButton} />
      <Text style={styles.h1}> Movies</Text>

      {loading && (
        <>
          <MovieItemSkeleton />
          <MovieItemSkeleton />
          <MovieItemSkeleton />
          <MovieItemSkeleton />
          <MovieItemSkeleton />
        </>
      )}

      {!loading && movies.length === 0 && !error && (
        <Text>No movies found</Text>
      )}

      {!loading && movies.length === 0 && error && (
        <>
          <Text>Error loading movies</Text>
          <Button title="Try again" onPress={getMovies} />
        </>
      )}

      <Text>Qt. of Movies: {movies.length}</Text>

      {!loading &&
        movies.length > 0 &&
        movies.map((movie) => <MovieItem movie={movie} key={movie.id} />)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 8,
  },
  h1: {
    fontSize: 30,
    textAlign: "center",
  },
});
