import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types'; // Import kiểu

interface IFromLoginData {
    phoneNumber: string,
    password: string,
}

const LoginScreen: React.FC = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<IFromLoginData>();

    const onSubmit = async (data: IFromLoginData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', data); // Chỉnh sửa đường dẫn phù hợp với backend của bạn
            console.log('User logged in:', response.data);
            // Thực hiện điều hướng hoặc lưu trữ token sau khi đăng nhập thành công
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, }}>
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center', }}>Login</Text>
            {/* <Controller control={control} rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />
            )} name="email" />
            {errors.email && <Text style={styles.errorText}>Email is required.</Text>} */}

            <Controller control={control} rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} placeholder="PhoneNumber" onBlur={onBlur} onChangeText={onChange} value={value} />
            )} name="phoneNumber" />
            {errors.phoneNumber && <Text style={styles.errorText}>Phone number is required.</Text>}

            <Controller control={control} rules={{ required: true }} render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.input} placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry />
            )} name="password" />
            {errors.password && <Text style={styles.errorText}>Password is required.</Text>}
            <Pressable style={{ paddingHorizontal: 30, borderWidth: 1, borderRadius: 30, marginBottom: 20 }} onPress={handleSubmit(onSubmit)}>
                <Text style={{ fontSize: 20 }}>Login</Text>
            </Pressable>
            <Pressable style={{ paddingHorizontal: 30, borderWidth: 1, borderRadius: 30, marginBottom: 20 }} onPress={() => navigation.navigate("Register")}>
                <Text style={{ fontSize: 20 }}>Register</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, },
    errorText: { color: 'red', marginBottom: 10, },
});

export default LoginScreen;
