import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Currencies } from '../../services/coinName';
import { LinearGradient } from 'expo-linear-gradient';

const CurrencyConverter = () => {
  const [value, setValue] = useState('');
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('BRL');
  const [conversionRate, setConversionRate] = useState(0);
  const currencies = Currencies.map((curr) => curr.code);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const currency = `${currency1}-${currency2}`;
        const response = await fetch(
          `https://economia.awesomeapi.com.br/json/last/${currency}`
        );
        const data = await response.json();
        const rate = data?.bid;
        if (rate) {
          setConversionRate(parseFloat(rate));
        } else {
          setConversionRate(0);
          // Alert.alert('Erro', 'Não foi possível buscar a taxa de conversão.');
        }
      } catch (error) {
        // Alert.alert('Erro', 'Não foi possível buscar a taxa de conversão.');
      }
    };
    fetchConversionRate();
  }, [currency1, currency2]);

  // Handle conversion
  const handleConvert = () => {
    if (!value || isNaN(value)) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido.');
      return;
    }
    const convertedValue = (parseFloat(value) * conversionRate).toFixed(2);
    Alert.alert('Resultado', `O valor convertido é: ${currency2} ${convertedValue}`);
  };

  return (
    <LinearGradient colors={['#05d9f5', '#006977', '#05d9f5']} style={styles.container}>
      <Text style={styles.title}>Conversor de Moeda</Text>
      <View>
        <TouchableOpacity style={styles.btn} onPress={handleConvert}>
          <Text style={styles.btnText}>Converter</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f9f9f9a2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  dropdown: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    elevation: 2,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  btn: {
    width: '90%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#006977',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CurrencyConverter;
