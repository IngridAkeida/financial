import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { currencies } from '../../services/coinName';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';

const CurrencyConverter = () => {
  const [value, setValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [currency1, setCurrency1] = useState('');
  const [currency2, setCurrency2] = useState('');
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const currencyPair = `${currency1}-${currency2}`;
        const response = await fetch(
          `https://economia.awesomeapi.com.br/json/last/${currencyPair}`
        );
        const data = await response.json();
        if(data[`${currency1}${currency2}`]) {
          const rate = data[`${currency1}${currency2}`].bid;
          setConversionRate(parseFloat(rate));
          handleConvert(value);
          console.log(rate);
        } 
        return 0;
      } catch (error) {
        return 0;
      }
    };
    fetchConversionRate();
  }, [currency1, currency2]);

  const handleConvert = (inputValue: string) => {
    if (!inputValue || isNaN(Number(inputValue)) || conversionRate === 0) {
      setConvertedValue('');
      return;
    }
    const result = (parseFloat(inputValue) * conversionRate).toFixed(2);
    setConvertedValue(result);
  };

  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient
        colors={['#05d9f5', '#006977', '#05d9f5']}
        style={styles.container}
      >
        <View style={styles.wrap}>
          <Text style={styles.title}>Conversor de Moeda</Text>
          <View style={styles.col}>
            <View style={styles.row}>
              <Text style={styles.title2}>From</Text>
              <Dropdown
                value={currency2}
                data={currencies.map((curr) => ({
                  label: curr.name,
                  value: curr.code,
                }))}
                labelField="label"
                valueField="value"
                onChange={(item) => {
                  setCurrency2(item.value);
                  handleConvert(value);
                }}
                style={styles.drop}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Value"
              value={value}
              onChangeText={(text) => {
                setValue(text);
                handleConvert(text);
              }}
              keyboardType="numeric"
            />
            <View style={styles.row}>
              <Text style={styles.title2}>To</Text>
              <Dropdown
                value={currency1}
                data={currencies.map((curr) => ({
                  label: curr.name,
                  value: curr.code,
                }))}
                labelField="label"
                valueField="value"
                onChange={(item) => {
                  setCurrency1(item.value);
                  handleConvert(value);
                }}
                style={styles.drop}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => handleConvert(value)}>
            <Text style={styles.btnText}>Converter</Text>
          </TouchableOpacity>
          <View style={styles.col}>
          <Text style={styles.text}>
            {convertedValue ? `${convertedValue} ${currency2}` : "Insira valores para converter"}
          </Text>
          </View>
        </View>
        <View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 750,
  },
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff61',
    width: '90%',
    height: '50%',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#f9f9f940',
    borderRadius: 4,
    height: 50,
  },
  input: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    borderColor: '#ddd',
    height: 50,
    marginVertical: 4,
    paddingLeft: 10,
  },
  drop: {
    width: '70%',
    backgroundColor: '#ffffffca',
    borderRadius: 4,
    marginVertical: 4,
    marginRight: 4,
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
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: 240,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    width: 200,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CurrencyConverter;
