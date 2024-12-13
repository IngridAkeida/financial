import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Currencies } from '../../services/coinName';
import { LinearGradient } from 'expo-linear-gradient';

const CurrencyConverter = () => {
  const [value, setValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('BRL');
  const [conversionRate, setConversionRate] = useState(0);
  const currencies = Currencies.map((curr) => curr.code);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const currencyPair = `${currency1}${currency2}`;
        const response = await fetch(
          `https://economia.awesomeapi.com.br/json/last/${currencyPair}`
        );
        const data = await response.json();
        const rate = data[currencyPair]?.bid || 0;
        setConversionRate(parseFloat(rate));
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar a taxa de conversão.');
      }
    };
    fetchConversionRate();
  }, [currency1, currency2]);

  const handleConvert = () => {
    if (!value || isNaN(Number(value))) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido.');
      return;
    }
    const result = (parseFloat(value) * conversionRate).toFixed(2);
    setConvertedValue(result);
  };

  return (
    <LinearGradient
      colors={['#05d9f5', '#006977', '#05d9f5']}
      style={styles.container}
    >
      <Text style={styles.title}>Conversor de Moeda</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Value"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />

      </View>
      <View style={styles.row}>
        <Text style={styles.convertedValue}>{convertedValue || 'Resultado'}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleConvert}>
        <Text style={styles.btnText}>Converter</Text>
      </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '90%',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    width: 120,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 14,
    textAlign: 'center',
  },
  convertedValue: {
    flex: 1,
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'left',
    marginRight: 8,
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