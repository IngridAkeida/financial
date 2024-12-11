import { StyleSheet, Text, View } from "react-native";
import { Movies } from "../types/movies";

type Props = {
  movie: Movies;
}

export const MovieItem = ( {movie}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.h2} >Movie: {movie.title}</Text>
      <Text style={styles.launchDate}>Year: {movie.releaseYear}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f9c',
    borderRadius: 10,
  },
  h2: {
    fontSize:20,
    textAlign: 'center',
    fontWeight: 'bold',
  }, 
  launchDate: {
    fontSize: 15,
    textAlign: 'center',
  }
});
