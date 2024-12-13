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
        console.log(currency1, currency2, rate);
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
    <LinearGradient colors={['#05d9f5', '#006977', '#05d9f5']} style={styles.container}>
      <Text style={styles.title}>Conversor de Moeda</Text>
      <View style={styles.content}>
        <View style={styles.wrap}>
          <Picker
              selectedValue={currency}
              style={styles.picker}
              onValueChange={(itemValue: string) => setCurrency1(itemValue)}
            >
              {currencies.map((curr) => (
                <Picker.Item key={curr} label={curr} value={curr} />
              ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={value}
            onChangeText={setValue} 
            keyboardType="numeric"
          />
        </View>
        <View style={styles.wrap}>
          <Picker
            selectedValue={currency}
            style={styles.picker}
            onValueChange={(itemValue: string) => setCurrency2(itemValue)}
          >
            {currencies.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={value}
            onChangeText={setValue} 
            keyboardType="numeric"
          />
        </View>
        <View style={styles.btn}>
          <Button title="Converter" onPress={handleConvert} color="#fff"/>
        </View>
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
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 2,
    margin: 2,
    width: '45%',
    height: 40,
    borderRadius: 4,
  },
  picker: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    margin: 2,
    borderRadius: 4,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
  },
  content: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f9f9f9a2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '90%',
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#006977',
    marginBottom: 10,
  },
});

export default CurrencyConverter;
