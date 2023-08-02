import { SafeAreaView, ScrollView, KeyboardAvoidingView, Image, View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native'
import React, { useContext, useState, useRef } from 'react'
import { TextInput, Button, Headline } from 'react-native-paper';
import { UsersContext } from '../context/UsersContext';

export default function RegisterStepOne({ navigation }) {

  const scrollRef = useRef(null);
  const { RegisterUser, EmailExists, CheckValidEmail } = useContext(UsersContext);
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [firstName, SetFirstName] = useState('');
  const [lastName, SetLastName] = useState('');

  const PrevBtnHandler = () => {
    navigation.goBack()
  }

  const SignInBtnHandler = () => {
    navigation.navigate('Login');
  }

  const RegisterHandler = () => {
    if (EmailExists(email)) {
      alert('Email already exist')
    }
    else if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Input is required!');
    }
    else if (!CheckValidEmail(email)) {
      alert('Invalid email')
    }
    else {

      let user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }

      if(RegisterUser(user)){
        alert("User was created successfully!");
        navigation.navigate('Login');
      }
      else{
        alert('error');
      }
    }
  }

  const handleInputFocus = () => {
    scrollRef.current.scrollTo({ x: 0, y: 180, animated: true });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
      style={styles.container} >
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
        <SafeAreaView style={styles.container}>
          <View style={styles.imageFrame}>
            <Image
              source={require('../images/LogoPng.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.informationBox}>
            <Headline style={styles.headline}>Become a <Text style={{ color: '#1CD995' }}>Green</Text> Miles member today!</Headline>
            <View style={styles.nameContainer}>
              <TextInput
                label="First Name"
                backgroundColor="white"
                style={[styles.nameInput, styles.marginRight]}
                onChangeText={text => SetFirstName(text)}
                onFocus={handleInputFocus}
              />
              <TextInput
                label="Last Name"
                backgroundColor="white"
                style={[styles.nameInput, styles.marginLeft]}
                onChangeText={text => SetLastName(text)}
                onFocus={handleInputFocus}
              />
            </View>
            <TextInput
              label="Email"
              backgroundColor="white"
              style={styles.textInput}
              onChangeText={text => SetEmail(text)}
              keyboardType="email-address"
              onFocus={handleInputFocus}
            />
            <TextInput
              label="Password"
              backgroundColor="white"
              style={styles.textInput}
              onChangeText={text => SetPassword(text)}
              secureTextEntry
              onFocus={handleInputFocus}
            />
            <Button
              mode="outlined"
              contentStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
              }}
              style={styles.registerButton}
              onPress={RegisterHandler}
            >
              <Text style={{ fontSize: 15, color: 'black' }}>Sign up</Text>
            </Button>
            <View style={styles.linkTextContainer}>
              <Text style={{ color: 'black', fontSize: 15 }}>Already have an account? </Text>
              <TouchableOpacity style={{ padding: 0, margin: 0 }} onPress={SignInBtnHandler}>
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.skipPrevBtn} onPress={PrevBtnHandler}>
            <Text style={styles.skipPrevBtnText}>Prev</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageFrame: {
    height: 160,
    alignItems: 'center',
    backgroundColor: '#1e272e',
    justifyContent: 'center',
  },
  logo: {
    height: 80,
    width: 130,
    alignSelf: 'center'
  },
  informationBox: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  headline: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 25,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  nameInput: {
    height: 50,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  textInput: {
    borderRadius: 5,
    marginBottom: 25,
  },
  registerButton: {
    marginBottom: 25,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  linkTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  linkText: {
    color: 'blue',
    fontSize: 15
  },
  skipPrevBtn: {
    position: "absolute",
    bottom: 30,
    left:20
  },
  skipPrevBtnText: {
    color: 'black',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
});
