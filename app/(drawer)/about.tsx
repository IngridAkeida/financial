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
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const CurrencyConverter = () => {
  const [value, setValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [currency1, setCurrency1] = useState('');
  const [currency2, setCurrency2] = useState('');
  const [conversionRate, setConversionRate] = useState(0);
  const currenciesCode = currencies.map((curr) => curr.code);
  const [values, setValues] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const currencyPair = `${currency1}-${currency2}`;
        const response = await fetch(
          `https://economia.awesomeapi.com.br/json/last/${currencyPair}`
        );
        const data = await response.json();
        const rate = data[currencyPair]?.bid || 0;
        console.log(rate, currencyPair, data, data[currencyPair]);
        setConversionRate(parseFloat(rate));
        handleConvert(value);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar a taxa de conversão.');
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
              <Picker
                selectedValue={currency2}
                style={styles.drop}
                onValueChange={(itemValue) => {
                  setCurrency2(itemValue);
                  handleConvert(value);
                }}
              >
                {currencies.map((curr) => (
                  <Picker.Item key={curr.code} label={`${curr.code} - ${curr.name}`} value={curr.code} />
                ))}
              </Picker>
            </View>
            <View style={styles.row}>
              <Text style={styles.title2}>To</Text>
              <Picker
                selectedValue={currency1}
                style={styles.drop}
                onValueChange={(itemValue) => {
                  setCurrency1(itemValue);
                  handleConvert(value);
                }}
              >
                {currencies.map((curr) => (
                  <Picker.Item key={curr.code} label={`${curr.code} - ${curr.name}`} value={curr.code} />
                ))}
              </Picker>
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
          </View>
          <View style={styles.col}>
          
            <TextInput
              style={styles.input}
              placeholder="Result"
              value={convertedValue}
              editable={false}
            />

          </View>
          <TouchableOpacity style={styles.btn} onPress={() => handleConvert(value)}>
            <Text style={styles.btnText}>Converter</Text>
          </TouchableOpacity>
        </View>
        <View>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={currencies}
        search
        maxHeight={300}
        labelField="name"
        valueField="code"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={values}
        onChange={item => {
          setValues(item.code);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
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
  },
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff61',
    width: '90%',
    height: '90%',
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
    width: 300,
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
