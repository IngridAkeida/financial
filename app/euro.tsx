import { SafeAreaView, StyleSheet, Text} from "react-native";

export default function Euro() {

  return (
    <SafeAreaView style={styles.container}>
      <Text>about</Text>
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
