import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState<weatherData>();

  interface weatherData {
    cod: any,
    name: string;
    wind: any,
    main: {
      temp: number;
      humidity: number;
    };
    sys: {
      country: string;
    };
  }

  const api = {
    key: '00708b1823ff6497f263312e1a2658d2',
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  const searched = () => {

    if (search === '') {
      alert('please type somthing')
    }
    else {
      fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result: weatherData) => {
          setWeather(result);
          if (result.cod === '404') {
            alert('area not found ')
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.nav}>
      </View>
      <TextInput
        onChangeText={(text) => setSearch(text)}
        placeholder="Search an area"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={searched}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {weather && typeof weather === 'object' && (
        <View style={styles.list}>
          <Text style={{ paddingBottom: 12, }}>Location: {weather.name}  {weather.sys.country}</Text>
          <Text style={{ paddingBottom: 12, }}>temp : {weather.main.temp} c </Text>
          <Text style={{ paddingBottom: 12, }}>humidity : {weather.main.humidity} % </Text>
          <Text>wind speed : {weather.wind.speed} </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nav: {
  },
  list: {
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  input: {
    width: 200,
    borderRadius: 5,
    textAlign: 'center',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});