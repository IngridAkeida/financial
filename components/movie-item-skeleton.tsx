import { StyleSheet, View, Text } from "react-native";

export const MovieItemSkeleton = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.skeletonH2}></Text>
      <Text style={styles.skeletonLaunchDate}></Text>
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
  skeletonH2: {
    height:30,
    borderRadius: 10,
    backgroundColor: '#ddd',
  }, 
  skeletonLaunchDate: {
    height: 15,
    borderRadius: 10,
    backgroundColor: '#ddd',
  }
});
