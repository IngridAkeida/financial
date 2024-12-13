import {Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Btn } from "../components/button";

export default function index() {
  const handleStart = () => {
    router.replace('/about');
  }
  return (
    <LinearGradient colors={['#00a1b6', '#006977', '#00a1b6']} style={styles.container}>
      <Image source={require('../assets/money/logo.png')} style={styles.logo} resizeMode="cover"/>
      <View>
        <Text style={styles.h1}>Take Control</Text>
        <Text style={styles.h2}>quotes around the World</Text>
        <Btn label="Let's Start!" onPress={handleStart}/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'Roboto',
  },
  logo:{
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  h1: {
    fontSize: 50,
    fontWeight: 'semibold',
    textAlign: 'center',
    marginBottom: -6,
    color: '#fff',
  },
  h2: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
    fontStyle: 'italic',
    fontWeight: 'light',
  },
  buttonStart: {
    backgroundColor: '#fff',
    color: '#00a1b6',
    borderRadius: 10,
  }
});
