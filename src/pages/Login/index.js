import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import API from '../../API/Api'
import AsyncStorage from '@react-native-community/async-storage';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      token: "",
      userId: "",
      isloading: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin() {
    this.setState({ 'isloading': true })
    API.Login({
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      console.log(res.data)
      if (res.data.message == 'login successfull') {
        this.setState({ 'isloading': false })
        AsyncStorage.setItem('userData', res.data.user.id.toString())
        AsyncStorage.setItem('userToken', res.data.user.api_token).then((value)=>{
         value ? '': this.props.navigation.navigate('Home') 
        })
        AsyncStorage.setItem('userEmail', res.data.user.email)
        AsyncStorage.setItem('userName', res.data.user.name)
      
      }
    })
  }
  handleChange(event) {
    this.setState({ 'email': event.target.value })
    console.log(event.target.value)
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 150, height: 150 }} source={require('../../assets/Soys-logo-png.png')} />
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ 'email': text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ 'password': text })} />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogin}>
          {
            this.state.isloading ? <ActivityIndicator size="large" color='white' /> :
              <Text style={styles.loginText}>LOGIN</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('Home')
        }}>


          <Text style={styles.continueText}>Continue without login</Text>
        </TouchableOpacity>


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