import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Link } from 'expo-router';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState({email:''});

  // Handle user state changes
  function onAuthStateChanged(user:any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Link href="/auth/signup-email-pass" style={styles.btn}>signup</Link>
        <Link href="/auth/login-email-pass" style={styles.btn}>logar</Link>
        <Link href="/auth/login-google" style={styles.btn}>logar com Google</Link>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button onPress={() => {auth().signOut()}} title="Logout" style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 18,
  },
  btn: {
    backgroundColor: '#99aaff',
    shadowColor: '#9900ff',
    color: 'white',
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    minHeight: 30,
    minWidth: 30,
    padding: 10,
    margin: 3,
  }
});