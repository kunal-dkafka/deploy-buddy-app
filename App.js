import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/ssh-ec2/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instanceName: 'my-instance',
          githubUsername: username,
          githubToken: token,
        }),
      });
        const text = await response.text();
          try {
            const data = JSON.parse(text);  // Attempt to parse as JSON
            setResponse(JSON.stringify(data, null, 2));
          } catch (jsonError) {
            // Handle the case where the response is not JSON
            console.error('Response is not JSON:', text);
            Alert.alert('Error', 'Received an unexpected response from the server.');
}

//      const data = await response.json();
//      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>GitHub Token</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your GitHub token"
        value={token}
        onChangeText={setToken}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {response ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>Response:</Text>
          <Text style={styles.responseText}>{response}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  responseLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseText: {
    fontSize: 14,
    color: '#333',
  },
});
