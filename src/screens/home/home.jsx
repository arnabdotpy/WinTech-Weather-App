import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

const Home = () => {
  const [location, setLocation] = useState('India');
  const [weather, setWeather] = useState({});

  const API_KEY = 'ADD_YOUR_API_KEY_HERE';
  let api = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;

  const getWeather = () => {
    axios.get(api)
      .then((res) => {
        setWeather(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Weather Forecast</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter Location'
            placeholderTextColor="#aaa"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <TouchableOpacity style={styles.button} onPress={() => getWeather()}>
            <Text style={styles.buttonText}>Get Weather</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 100}}>
        <View style={styles.weatherContainer}>
          <Text style={styles.location}>{weather?.location?.name}</Text>
          <Text style={styles.time}>{weather?.location?.localtime}</Text>
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperature}>{weather?.current?.temp_c}°C</Text>
            <Text style={styles.condition}>{weather?.current?.condition?.text}</Text>
            <Image
              source={{ uri: `https:${weather?.current?.condition?.icon}` }}
              style={styles.weatherIcon}
            />
          </View>
          <View style={styles.additionalInfo}>
            <Text style={styles.infoText}>Wind: {weather?.current?.wind_kph} km/h</Text>
            <Text style={styles.infoText}>Humidity: {weather?.current?.humidity}%</Text>
            <Text style={styles.infoText}>Pressure: {weather?.current?.pressure_mb} mb</Text>
            <Text style={styles.infoText}>Visibility: {weather?.current?.vis_km} km</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232931', // Dark background color
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // White text color
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#fff', // White text color
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  weatherContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // White text color
    textAlign: 'center',
  },
  time: {
    fontSize: 18,
    marginBottom: 20,
    color: '#ccc', // Light text color
    textAlign: 'center',
  },
  temperatureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff', // White text color
    textAlign: 'center',
  },
  condition: {
    fontSize: 24,
    textTransform: 'capitalize',
    color: '#ccc', // Light text color
    textAlign: 'center',
  },
  weatherIcon: {
    height: 100,
    width: 100,
    marginVertical: 10,
  },
  additionalInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
});

export default Home;
