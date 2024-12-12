import { Image, SafeAreaView, StyleSheet, Text} from "react-native";

export default function Usa() {

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        style={styles.image}
        source={require('../assets/money/dolar.png')}
        resizeMode="contain"
      />
      <Text style={styles.title}>USA</Text>
      <Text style={styles.h2}>The dollar is worth</Text>
      <Text style={styles.currency}>R$ 99,99</Text>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#0b1c2d',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 180,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  h2: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  currency: {
    color: '#fff',
    fontSize: 52,
    textAlign: 'center',
    marginBottom: 50,
  },
});
