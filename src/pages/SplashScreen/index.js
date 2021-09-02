import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import API from '../../API/Api'
import AsyncStorage from '@react-native-community/async-storage';
export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
 componentDidMount(){
    setTimeout(() => {
        // setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
        AsyncStorage.getItem('userToken').then((value) =>
          this.props.navigation.navigate(
            value === null ? 'Login' : 'Home'
          ),
        );
      }, 5000);
 }
  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 150, height: 150 }} source={require('../../assets/Soys-logo-png.png')} />
       <ActivityIndicator size="large" color='red' /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fafafa",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "#5d5d5d"
  },
  forgot: {
    color: "#5d5d5d",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  continueText: {
    color: "#5d5d5d"
  }
});