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
import { Picker } from '@react-native-picker/picker';

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
        handleConvert(value);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar a taxa de conversão.');
      }
    };
    fetchConversionRate();
  }, [currency1, currency2]);

  const handleConvert = (inputValue: string) => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setConvertedValue('');
      return;
    }
    const result = (parseFloat(inputValue) * conversionRate).toFixed(2);
    setConvertedValue(result);
  };

  return (
    <LinearGradient
      colors={['#05d9f5', '#006977', '#05d9f5']}
      style={styles.container}
    >
      <View style={styles.wrap}>
        <Text style={styles.title}>Conversor de Moeda</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={value}
            onChangeText={(text) => {
              setValue(text);
              handleConvert(text);
            }}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={currency2}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setCurrency2(itemValue);
              handleConvert(value); 
            }}
          >
            {currencies.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Resultado"
            value={convertedValue}
            editable={false}
          />
          <Picker
            selectedValue={currency1}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setCurrency1(itemValue);
              handleConvert(value); 
            }}
          >
            {currencies.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => handleConvert(value)}>
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
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff61',
    padding: 16,
    borderRadius: 8,
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
  picker: {
    height: 50,
    width: 150,
    backgroundColor: '#fff',
  },
});

export default CurrencyConverter;
