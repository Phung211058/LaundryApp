import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types'; // Import kiểu
import { useAuth } from '../authentication/AuthContext';

interface IFromLoginData {
    phoneNumber: string,
    password: string,
}

const LoginScreen: React.FC = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<IFromLoginData>();
    const { setAccountId } = useAuth();

    const loginUser = async (data: IFromLoginData) => {
        try {
            const response = await axios.post('http://192.168.1.67:3000/api/login', data); // Chỉnh sửa đường dẫn phù hợp với backend của bạn
            console.log('User logged in:', response.data);
            setAccountId(response.data.accountId);
            navigation.navigate("AppTabs")
        } catch (error) {
            // console.error('Error logging in:', error);
            const axiosError = error as { response?: { data?: { message?: string } } };
            Alert.alert('Error', axiosError.response?.data?.message || 'An unknown error occurred');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20, }}>
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center', }}>Login</Text>
            <Controller control={control} name="phoneNumber"
                rules={{
                    required: "Phone number is required",
                    minLength: { value: 10, message: "Phone number is invalid" },
                    maxLength: { value: 10, message: "Phone number is invalid" },
                    pattern: { value: /^[0-9]{10}$/, message: "Phone Number is invalid", }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.input} placeholder="PhoneNumber" onBlur={onBlur} onChangeText={onChange} value={value} keyboardType="phone-pad" />
                )} />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>}

            <Controller control={control} name="password"
                rules={{
                    required: "Password is required",
                }} render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.input} placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} secureTextEntry />
                )} />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            <Pressable style={{
                marginHorizontal: 50, borderRadius: 18, marginBottom: 20, marginTop: 15,
                paddingVertical: 5, justifyContent: "center", backgroundColor: "#007bff",
                // iOS shadow
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                // Android elevation
                elevation: 8,
            }} onPress={handleSubmit(loginUser)}>
                <Text style={{ fontSize: 20, color: "#fff", textAlign: "center" }}>Login</Text>
            </Pressable>
            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <Pressable style={{
                    alignSelf: 'flex-start',
                }} onPress={() => navigation.navigate("Register")}>
                    <Text style={{ fontSize: 20, color: "#007bff", textAlign: "center", textDecorationLine: "underline" }}>Register</Text>
                </Pressable>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, },
    errorText: { color: 'red', marginBottom: 10, },
});

export default LoginScreen;
