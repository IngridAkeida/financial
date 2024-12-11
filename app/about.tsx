import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet, Text} from "react-native";

type Query = {
  name?: string;
}

export default function About() {
  
  const { name } = useLocalSearchParams<Query>();

  return (
    <SafeAreaView style={styles.container}>
      <Text>about {name} </Text>
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
