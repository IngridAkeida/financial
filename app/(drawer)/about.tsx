import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Currencies } from '../../services/coinName';
import { LinearGradient } from 'expo-linear-gradient';

const CurrencyConverter = () => {
  const [value, setValue] = useState(''); 
  const [currency1, setCurrency1] = useState('USD'); 
  const [currency2, setCurrency2] = useState('BRL');
  const [conversionRate, setConversionRate] = useState(0); 
  const currencies = Currencies.map((curr) => curr.code);
  const currency = `${currency1}${currency2}`;

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${currency}`);
        const data = await response.json();
        const rate = data[`${currency}`].bid;
        setConversionRate(rate);
      } catch (error) {
        // Alert.alert('Erro', 'Não foi possível buscar a taxa de conversão.');
      }
    };
    fetchConversionRate();
  }, [currency]); 

  const handleConvert = () => {
    if (!value) {
      Alert.alert('Erro', 'Por favor, insira um valor.');
      return;
    }
    
    const convertedValue = (parseFloat(value) * conversionRate).toFixed(2); 
    Alert.alert('Resultado', `Valor em ${currency}: R$ ${convertedValue}`);
  };

  return (
    <LinearGradient colors={['#00a1b6', '#006977', '#00a1b6']} style={styles.container}>
      <Text style={styles.title}>Conversor de Moeda</Text>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder="Valor"
          value={value}
          onChangeText={setValue} 
          keyboardType="numeric"
        />
        <Picker
          selectedValue={currency}
          style={styles.picker}
          onValueChange={(itemValue: string) => setCurrency1(itemValue)}
        >
          {currencies.map((curr) => (
            <Picker.Item key={curr} label={curr} value={curr} />
          ))}
        </Picker>
      </View>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder="Valor"
          value={value}
          onChangeText={setValue} 
          keyboardType="numeric"
        />
        <Picker
          selectedValue={currency}
          style={styles.picker}
          onValueChange={(itemValue: string) => setCurrency2(itemValue)}
        >

          
          {currencies.map((curr) => (
            <Picker.Item key={curr} label={curr} value={curr} />
          ))}
        </Picker>
      </View>
      <Button title="Converter" onPress={handleConvert} />
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
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    width: '50%',
    height: 40,
    borderRadius: 4,
  },
  picker: {
    width: '50%',
    backgroundColor: '#f9f9f9',
    margin: 8,
    borderRadius: 4,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});

export default CurrencyConverter;
