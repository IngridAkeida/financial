import { SafeAreaView, StyleSheet, Text} from "react-native";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});
