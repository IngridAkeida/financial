import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Alert, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
        const currencyPair = `${currency1}${currency2}`;
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${currencyPair}`);
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
    if (!value) {
      Alert.alert('Erro', 'Por favor, insira um valor.');
      return;
    }

    const convertedValue = (parseFloat(value) * conversionRate).toFixed(2);
    Alert.alert('Resultado', `O valor convertido é: ${currency2} ${convertedValue}`);
  };

  return (
    <LinearGradient colors={['#05d9f5', '#006977', '#05d9f5']} style={styles.container}>
      <Text style={styles.title}>Conversor de Moeda</Text>
      <View style={styles.content}>
        <View style={styles.wrap}>
          <Picker
            selectedValue={currency1}
            style={styles.picker}
            onValueChange={(itemValue) => setCurrency1(itemValue)}
          >
            {currencies.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>

          <Picker
            selectedValue={currency2}
            style={styles.picker}
            onValueChange={(itemValue) => setCurrency2(itemValue)}
          >
            {currencies.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>

        </View>
        <View style={styles.wrap2}>
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />
        </View>
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
  picker: {
    width: '45%',
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
  },
  input: {
    width: '45%',
    height: 40,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    paddingHorizontal: 8,
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
