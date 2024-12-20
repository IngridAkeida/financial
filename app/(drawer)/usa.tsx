import {Image, SafeAreaView, StyleSheet, Text} from "react-native";
import { Btn } from "../../components/button";
import { useEffect, useState } from "react";
import { getDollarQuotes } from "../../services/dollarQuotes";

export default function Usa() {
  const [loading, setLoading] = useState(true);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const handleUpdate = async () => {
    setLoading(true);
    const dollar = await getDollarQuotes();
    setLoading(false);
    setCurrentValue(dollar);
  }

  useEffect(() => {
    handleUpdate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {!loading &&
        <>
          <Image 
            style={styles.image}
            source={require('../../assets/money/dolar.png')}
            resizeMode="contain"
          />
          <Text style={styles.title}>USA</Text>
          <Text style={styles.h2}>The dollar is worth</Text>
          <Text style={styles.currency}>R$ {currentValue.toFixed(2)}</Text>

          <Btn onPress={handleUpdate} label="Update"/>
        </>
      }

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
