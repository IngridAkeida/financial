import { router } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text} from "react-native";
import { useEffect, useState } from "react";

export default function Home() {

  const [movies, setMovies] = useState([]);

  const getProducts = async () => {
    const response = await fetch('http://site.com.products');
    const data = await response.json();
    console.log(data);
  }

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
      <Text>Home</Text>
      <Button title="Is para Sobre (com params)"
      onPress={handleButton}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});
