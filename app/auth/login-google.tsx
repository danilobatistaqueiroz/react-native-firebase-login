import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  isSuccessResponse,
  isNoSavedCredentialFoundResponse,
  User,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';


export default function LoginGoogle() {

  const [state, setState] = React.useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '166480933010-hcqrgppv9jtp0dvg5mbaecql5f0uto2n.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  }, []);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { type, data } = await GoogleSignin.signIn();
      if (type === 'success') {
        console.log({ data });
        setState({ userInfo: data, error: undefined });
      } else {
        // sign in was cancelled by user
        setTimeout(() => {
          Alert.alert('cancelled');
        }, 500);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        console.log('error', error.message);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            Alert.alert(
              'in progress',
              'operation (eg. sign in) already in progress',
            );
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // android only
            Alert.alert('play services not available or outdated');
            break;
          default:
            Alert.alert('Something went wrong: ', error.toString());
        }
        setState({
          error,
        });
      } else {
        alert(`an error that's not related to google sign in occurred`);
      }
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setState({ userInfo: response.data });
      } else {
        console.log('sign in was cancelled by user');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('operation (eg. sign in) already in progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Android only, play services not available or outdated');
            break;
          default:
            console.error('some other error happened', error);
        }
      } else {
        console.log("an error that's not related to google sign in occurred", error);
      }
    }
  };

  return (
    <View>
      <Text>Google login</Text>
      <Button title="Login" onPress={() => signIn()} />
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Light}
        onPress={_signIn}
        accessibilityLabel={'sign in'}
      />
    </View>
  );

}