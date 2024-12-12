import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

export default function index() {

  const handleStart = () => {
    router.replace('/home');
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={require('../assets/sources/logo.png')} style={styles.logo} resizeMode="cover"/> */}
      <View>
        <Text style={styles.h1}> Ingrid's Store</Text>
        <Text style={styles.h2}> Here you can find everything you want!</Text>
        {/* <Button title="Let's Start!" onPress={handleStart}/> */}
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
  logo:{
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  h2: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
});
