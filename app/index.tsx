import { router } from "expo-router";
import { Button, SafeAreaView, StyleSheet, Text} from "react-native";

export default function Home() {
  const handleButton = () => {
    router.push('./about?name=John');
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
