import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types'; // Import kiểu

interface IFormRegisterData {
    phoneNumber: string,
    password: string,
    confirmPassword: string,
}

const RegisterScreen: React.FC = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { handleSubmit, reset, control, watch, formState: { errors } } = useForm<IFormRegisterData>();
    const registerUser = async (data: IFormRegisterData) => {
        // try {
        //     const formData = new FormData();
        //     // formData.append('email', data.email);
        //     formData.append('phoneNumber', data.phoneNumber);
        //     formData.append('password', data.password);
        //     if (data.password !== data.confirmPassword) {
        //         Alert.alert('Error', 'Passwords do not match');
        //         return;
        //     }
        //     const response = await axios.post('http://192.168.1.67:3000/api/register', formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });

        //     Alert.alert('Success', response.data.message);
        //     reset(); // Reset form fields after successful registration
        //     navigation.navigate("Login")
        // }
        try {
            const response = await axios.post('http:/192.168.1.67:3000/api/register', {
                phoneNumber: data.phoneNumber,
                password: data.password,
            });

            Alert.alert('Success', response.data.message);
            reset(); // Reset form fields after successful registration
            navigation.navigate("Login");
        }
        catch (error: unknown) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            Alert.alert('Error', axiosError.response?.data?.message || 'An unknown error occurred');
        }
    };
    const passworded = watch('password');
    return (
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 24, textAlign: "center" }}>RegisterUser</Text>
            {/* <Controller control={control} name='email' rules={{ required: "Email is required" }} render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />
            )} /> */}
            <Controller control={control} name='phoneNumber' rules={{
                required: "Phone Number is required",
                minLength: {
                    value: 10,
                    message: "Phone Number is invalid",
                },
                maxLength: {
                    value: 10,
                    message: "Phone Number is invalid",
                },
                pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone Number is invalid",
                },
                // required: "Phone Number is required",
            }} render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} placeholder="Phone Number" onBlur={onBlur} onChangeText={onChange} value={value} keyboardType="phone-pad" />
            )} />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}
            <Controller control={control} name="password" rules={{
                required: 'Password is required', 
                pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: "Password must contain at least one uppercase letter and one number, and be at least 8 characters long"
                }
            }} render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} placeholder="Password" secureTextEntry onBlur={onBlur} onChangeText={onChange} value={value} />
            )} />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            <Controller control={control} name="confirmPassword" rules={{
                required: 'Confirm Password is required', validate: (value) => value === passworded || 'Passwords do not match',
            }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onBlur={onBlur} onChangeText={onChange} value={value} />
                )} />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            <Button title="Register" onPress={handleSubmit(registerUser)} />
        </View>
    )
}
const styles = StyleSheet.create({
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 4, },
    errorText: { color: 'red', marginBottom: 10, },
});


export default RegisterScreen