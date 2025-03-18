import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { appThemes } from '../themes/appThemes';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/auth/register', {
                username,
                email,
                password,
            });
            alert('Registro exitoso');
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
            alert('Error en el registro');
        }
    };

    return (
        <View
        style={
            appThemes.globalContainer
        }
        >
            <Text>Register</Text>
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Register" onPress={register} />
        </View>
    );
};

export default RegisterScreen;