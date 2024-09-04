import { View, Text, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native'
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
  
  const [user, setUser] = useState<User | null>(null);
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
  const { selectedCategory, selectedFlavour, selectedTime, selectedBusiness, selectedService, selectedWeight } = route.params;
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

  return (
    <ScrollView>
      <View style={{
        backgroundColor: "#088F6F", padding: 10, margin: 15, borderRadius: 10, alignItems: "center",
      }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
        {selectedBusiness ? <Text style={{ color: "white", fontSize: 16 }}>Category: {selectedCategory}</Text> : null}
        {selectedService ? <Text style={{ color: "white", fontSize: 16 }}>Weight: {selectedWeight}</Text> : null}
          {/* <Text style={{ color: "white", fontSize: 16 }}>Category: {selectedCategory || "Chưa chọn"}</Text> */}
          <Text style={{ color: "white", fontSize: 16 }}>Flavour: {selectedFlavour || "Chưa chọn"}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>Time: {selectedTime}</Text>
        </View>
        {/* <View>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "white", marginTop: 10 }}>Proceed to pick up</Text>
        </View> */}
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
              // Thực hiện khi điều kiện đúng
              <AntDesign name="circledowno" size={24} color="black" />
            ) : (
              // Thực hiện khi điều kiện sai
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
          <Pressable onPress={() => navigation.navigate("Home") } style={{ padding: 10, backgroundColor: 'green', marginHorizontal: 75, marginVertical: 15, borderRadius: 20 }}>
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