import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    AsyncStorage,
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');

    const spotId = navigation.getParam('id');

    async function handlerSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(
            `/spots/${spotId}/bookings`,
            { date },
            { headers: { user_id } }
        );

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handlerCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity style={styles.button} onPress={handlerSubmit}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handlerCancel}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 40
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 15
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
