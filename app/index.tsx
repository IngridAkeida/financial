import { router } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text, View} from "react-native";
import { useEffect, useState } from "react";
import { Movies } from "../types/movies";
import { getMoviesList } from "../services/movies";

export default function Home() {
  const [loading, setLoading ] = useState(true);
  const [movies, setMovies] = useState<Movies[]>([]);

  const getMovies = async () => {
    setLoading(true);
    const moviesList = await getMoviesList();
    setMovies(moviesList);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, []);

  const handleButton = () => {
    //jeito mais simples
    // router.push('./about?name=John&age=30'); 

    //jeito mais completo
    const params = new URLSearchParams();
    params.set('name', 'John');
    params.set('age', '30');
    router.push(`/about?${params.toString()}`);
  };

    
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Is para Sobre (com params)"
      onPress={handleButton}/>
      {loading && 
        <Text>Loading...</Text>
      }
      
      {!loading && movies.length === 0 &&
        <Text>No movies found</Text>
      }

      <View>
        <Text style={styles.h1}>Movies</Text>
        <Text>Qt. of Movies: {movies.length}</Text>
        <Text>
          {!loading && movies.length > 0 && movies.map((movie) => 
            `${movie.title} - ${movie.releaseYear}`
          ).join('\n')}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize:30,
    textAlign: 'center',  
  }
});
