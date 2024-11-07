import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';


function login(email: string, password: string){
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account signed in!');
      router.navigate("../(tabs)/dashboard")
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}


export default function LoginEmailPass() {

  const [email, onChangeEmail] = React.useState('jane.doe@example.com');
  const [password, onChangePassword] = React.useState('SuperSecretPassword!');

  useEffect(() => {
  }, []);

  return (
    <View>
      <Text>email password login</Text>
      <TextInput placeholder="email" value={email} onChangeText={onChangeEmail} style={styles.input} />
      <TextInput secureTextEntry={true} placeholder="password" value={password} onChangeText={onChangePassword} style={styles.input} />
      <Button title="Login" onPress={() => login(email, password)} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#222',
    color: 'white',
    minHeight: 30,
    minWidth: 30,
    padding: 10,
    margin: 3,
  }
});