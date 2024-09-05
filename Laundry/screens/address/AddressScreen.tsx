import { View, Text, Pressable, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../authentication/AuthContext'; // Đường dẫn đến file AuthContext
import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types'; // Import kiểu

interface User {
  name: string;
  phone: string;
  city: string;
  district: string;
  commune: string;
  detailAddress: string;
  date: Date;
}

type AddressScreenRouteProp = RouteProp<RootStackParamList, 'Address'>;

const AddressScreen: React.FC = () => {
  const route = useRoute<AddressScreenRouteProp>();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { accountId } = useAuth();
  if (accountId === null || accountId === 'null') {
    console.log("Invalid accountId");
    return; // Không thực hiện fetch khi accountId không hợp lệ
  }
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.67:3000/api/user/${accountId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [accountId]);
  const {selectedType, selectedCategory, selectedFlavour, selectedTime, selectedBusiness, selectedService, selectedWeight, totalPrice } = route.params;
  const [isCurrentAddressVisible, setIsCurrentAddressVisible] = useState(false);
  const [isAnotherAddressVisible, setIsAnotherAddressVisible] = useState(false);
  // xử lý hiển thị khi nhấn current address
  const handlePressCurrentAddress = () => {
    setIsCurrentAddressVisible(!isCurrentAddressVisible);
    setIsAnotherAddressVisible(false);
  };
  // xử lý hiển thị khi nhấn another address
  const handlePressAnotherAddress = () => {
    setIsAnotherAddressVisible(!isAnotherAddressVisible); // Toggle the visibility of the address
    setIsCurrentAddressVisible(false);
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [borough, setBorough] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  // Kiểm tra đã điền đủ thông tin yêu cầu chưa
  const isFormComplete = () => {
    return (
      phoneNumber.trim() !== '' &&
      city.trim() !== '' &&
      district.trim() !== '' &&
      borough.trim() !== '' &&
      detailAddress.trim() !== ''
    );
  };
  // điều kiện hiển thị button complete
  const shouldShowCompleteButton = isCurrentAddressVisible || (isAnotherAddressVisible && isFormComplete());
  const [user, setUser] = useState<User>();
  const handleCreateOrder = async () => {
    if (!user?.name || !user?.phone || !user?.city || !user?.district || !user?.commune || !user?.detailAddress) {
    Alert.alert('Error', 'Please ensure all fields are filled out correctly.');
    return;
  }
    try {
      const orderData = {
        accountId: accountId,
        name: user?.name,
        phone: user?.phone,
        city: user?.city,
        district: user?.district,
        commune: user?.commune,
        detailAddress: user?.detailAddress,
        selectedType: selectedType,
        selectedCategory: selectedCategory,
        selectedWeight: selectedWeight,
        selectedFlavour: selectedFlavour,
        selectedTime: selectedTime,
        totalPrice: totalPrice,
        selectedBusiness: selectedBusiness,
        selectedService: selectedService,
        orderDate: new Date(), 
      };
      console.log(orderData)
      const response = await axios.post(`http://192.168.1.67:3000/api/createOrder`, orderData);
      if (response.status === 200) {
        navigation.navigate("OrderFinish", {
          name: user?.name, phone: user?.phone, city: user?.city, district: user?.district, commune: user?.commune, detailAddress: user?.detailAddress,
          selectedType: selectedType, selectedBusiness: selectedBusiness, selectedService: selectedService,
          selectedCategory: selectedCategory, selectedWeight: selectedWeight, selectedFlavour: selectedFlavour, selectedTime: selectedTime,
          totalPrice: totalPrice
        })
      }
    } catch (error) {
      // console.error('Error logging in:', error);
      const axiosError = error as { response?: { data?: { message?: string } } };
      Alert.alert('Error', axiosError.response?.data?.message || 'An unknown error occurred');
    }
  };

  return (
    <ScrollView>
      <View style={{
        backgroundColor: "#088F6F", padding: 10, margin: 15, borderRadius: 10, alignItems: "center",
      }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {selectedBusiness ? <Text style={{ color: "white", fontSize: 16 }}>Category: {selectedCategory}</Text> : null}
          {selectedService ? <Text style={{ color: "white", fontSize: 16 }}>Weight: {selectedWeight}</Text> : null}
          <Text style={{ color: "white", fontSize: 16 }}>Flavour: {selectedFlavour || "Chưa chọn"}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>Time: {selectedTime}</Text>
          {!totalPrice ? (null) : (
            <Text style={{ color: "white", fontSize: 16 }}>Total Price: {totalPrice}</Text>
          )}
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 20, marginHorizontal: 10, marginVertical: 5, }}>Address</Text>
        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 8, }}>
          {/* Current address */}
          <Pressable onPress={handlePressCurrentAddress} style={[
            !isCurrentAddressVisible ? styles.currentAddress : styles.currentAddressSelected
          ]}>
            <Text style={{ fontSize: 18 }}>Your current address</Text>
            {!isCurrentAddressVisible ? (
              <AntDesign name="circledowno" size={24} color="black" />
            ) : (
              <AntDesign name="upcircleo" size={24} color="black" />
            )}
          </Pressable>
          {isCurrentAddressVisible && (
            <View style={{ marginTop: 10 }}>
              <Text>City: {user?.city}</Text>
              <Text>District: {user?.district}</Text>
              <Text>Commune: {user?.commune}</Text>
              <Text>Detail Address: {user?.detailAddress}</Text>
            </View>
          )}
          {/* Another address */}
          <Pressable onPress={handlePressAnotherAddress} style={[
            !isAnotherAddressVisible ? styles.currentAddress : styles.currentAddressSelected
          ]}>
            <Text style={{ fontSize: 18 }}>Another address</Text>
            {!isAnotherAddressVisible ? (
              <AntDesign name="circledowno" size={24} color="black" />
            ) : (
              <AntDesign name="upcircleo" size={24} color="black" />
            )}
          </Pressable>
          {isAnotherAddressVisible && (
            <View style={{ marginTop: 10 }}>
              <View style={{}}>
                <TextInput style={{ borderBottomWidth: 0.7, fontSize: 16, marginVertical: 5 }} placeholder='Phone Number' value={phoneNumber} onChangeText={setPhoneNumber} />
              </View>
              <View style={{}}>
                <TextInput style={{ borderBottomWidth: 0.7, fontSize: 16, marginVertical: 5 }} placeholder='City' value={city} onChangeText={setCity} />
              </View>
              <View style={{ marginVertical: 5 }}>
                <TextInput style={{ borderBottomWidth: 0.7, fontSize: 16, marginVertical: 5 }} placeholder='District' value={district} onChangeText={setDistrict} />
              </View>
              <View style={{ marginVertical: 5 }}>
                <TextInput style={{ borderBottomWidth: 0.7, fontSize: 16, marginVertical: 5 }} placeholder='Borough/Commune' value={borough} onChangeText={setBorough} />
              </View>
              <View style={{ marginVertical: 5 }}>
                <TextInput style={{ borderBottomWidth: 0.7, fontSize: 16, marginVertical: 5 }} placeholder='Detail address' value={detailAddress} onChangeText={setDetailAddress} />
              </View>
            </View>
          )}
        </View>
        {shouldShowCompleteButton && (
          <Pressable onPress={handleCreateOrder} style={{ padding: 10, backgroundColor: 'green', marginHorizontal: 75, marginVertical: 15, borderRadius: 20 }}>
            <Text style={{ fontSize: 18, color: 'white', textAlign: "center" }}>Hoàn thành</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  currentAddress: {
    flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 5
  },
  currentAddressSelected: {
    flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 5, borderWidth: 1, borderColor: "#ccc"
  },
  anotherAdress: {
    flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 5
  },
  anotherAdressSelected: {
    flex: 1, flexDirection: "row", justifyContent: "space-between", marginVertical: 5, borderWidth: 1, borderColor: "#ccc",
  }
});

export default AddressScreen