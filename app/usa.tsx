import { Image, SafeAreaView, StyleSheet, Text} from "react-native";

export default function Usa() {

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        style={styles.image}
        source={require('../assets/money/dolar.png')}
        resizeMode="contain"
      />
      
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
  }
});
