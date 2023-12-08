import { StyleSheet, TextInput, Button, Alert, } from 'react-native';
import { useState, useEffect } from 'react'
import axios from 'axios'

import { Text, View } from '../../components/Themed';
import { GetCurrentWeather } from '../../types/weather'

export default function TabOneScreen() {
  const [location, setLocation] = useState("Palembang")
  const [currentLocation, setCurrentLocation] = useState("Palembang")
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<null | GetCurrentWeather>(null)
  const url = `http://api.weatherstack.com/current?access_key=1978b6b7f2e1aa203a1c53cf9232b335&query=${location}`
  useEffect(() => {
    onPressButton()
  }, [])

  const onPressButton = async () => {

    try {
      setIsLoading(true)
      setCurrentLocation(location)
      const { data, status } = await axios.get<GetCurrentWeather>(url, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (status < 400) {
        console.log(data);

        setWeatherData(data)
      }
    } catch (error) {
      Alert.alert("API Error")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.info}>API URL : {url}</Text>
      <Text style={styles.title}>Current Location : {currentLocation}</Text>
      <TextInput style={styles.input} placeholder='Change Location' onChangeText={(text) => setLocation(text)} />
      <View style={styles["button-container"]}>
        <Button color={"gray"} title='Change' onPress={onPressButton} />
      </View>
      {isLoading && <Text>Loading...</Text>}
      {weatherData && <View style={styles['weather-container']}>

        <Text style={styles['weather-name']}>{weatherData.location.name}</Text>
        <Text style={styles['weather-location']}>{weatherData.location.region}, {weatherData.location.country}</Text>
        <Text style={styles['weather-temperature']}>
          {weatherData.current.temperature}°C
        </Text>
        <Text style={styles['weather-description']}>{weatherData.current.weather_descriptions[0]}</Text>
        <Text style={styles['weather-time']}>{weatherData.location.localtime}</Text>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  info: {
    color: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    textAlign: 'center',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  "button-container": {
    marginTop: 10
  },
  "weather-container": {
    marginVertical: 100
  },
  "weather-name": {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold'
  },
  "weather-location": {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  "weather-temperature": {
    textAlign: 'center',
    fontSize: 52,
    fontWeight: 'bold',
    marginTop: 50,
  },
  "weather-description": {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
  },
  "weather-time": {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  }
});
