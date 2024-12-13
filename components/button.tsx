import { Pressable, StyleSheet, Text } from 'react-native';
type ButtonProps = {
  label: string;
  onPress: () => void;
}

export const Btn = ({label, onPress}:ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c0e864',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  }
});