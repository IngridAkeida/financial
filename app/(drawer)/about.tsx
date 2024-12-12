import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text} from "react-native";

type Query = {
  name?: string;
  age?: string;
}

export default function About() {
  
  const { name, age } = useLocalSearchParams<Query>();

  return (
    <SafeAreaView style={styles.container}>
      <Text>about {name} - { age } </Text>
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
