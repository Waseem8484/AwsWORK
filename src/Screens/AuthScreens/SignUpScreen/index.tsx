import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const SignUpScreen = ({navigation}: any) => {
  const [Email, setEmail] = React.useState<any>([]);
  const [Password, setPassword] = React.useState<any>([]);

  const SignUp = () => {};

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={Email}
        placeholder="Please Enter Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={Password}
        placeholder="Please Enter Password"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={() => SignUp()}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
});
