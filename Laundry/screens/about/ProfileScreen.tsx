import { View, Text, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { useAuth } from '../authentication/AuthContext'; // Đường dẫn đến file AuthContext
import UpdateProfileModal from './UpdateProfileModal';
//https://www.behance.net/gallery/138690713/User-profile-Design

interface User {
  name: string;
  phoneNumber: string;
  address: {
    city: string;
    district: string;
    borough: string;
    detailAddress: string;
  };
}

const ProfileScreen: React.FC = ({ route }: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái để điều khiển modal
  // const accountId = route.params?.accountId; // Lấy accountId từ params
  console.log("Hello")
  const { accountId } = useAuth();
  console.log(accountId);
  if (accountId === null || accountId === 'null') {
    console.log("Invalid accountId");
    return; // Không thực hiện fetch khi accountId không hợp lệ
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.67:3000/api/user/${accountId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
    fetchUserData();
  }, [accountId]);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginLeft: 15, marginBottom: 5 }}>Name</Text>
        <View style={{ backgroundColor: "#ebebf2", padding: 10, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18, paddingLeft: 15 }}>{user?.name || "No data"}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginLeft: 15, marginBottom: 5 }}>Phone Number</Text>
        <View style={{ backgroundColor: "#ebebf2", padding: 10, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18, paddingLeft: 15 }}>{user?.phoneNumber || "No data"}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginLeft: 15, marginBottom: 5 }}>City</Text>
        <View style={{ backgroundColor: "#ebebf2", padding: 10, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18, paddingLeft: 15 }}>{user?.address?.city || "No data"}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginLeft: 15, marginBottom: 5 }}>Borough</Text>
        <View style={{ backgroundColor: "#ebebf2", padding: 10, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18, paddingLeft: 15 }}>{user?.address?.borough || "No data"}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, marginLeft: 15, marginBottom: 5 }}>Detail Address</Text>
        <View style={{ backgroundColor: "#ebebf2", padding: 10, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18, paddingLeft: 15 }}>{user?.address?.detailAddress || "No data"}</Text>
        </View>
      </View>

      {/* <Pressable onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </Pressable> */}
      <Pressable onPress={handleOpenModal} style={{
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
      }}>
        <Text style={{
          color: '#fff',
          fontSize: 16,
        }}>Edit Profile</Text>
      </Pressable>
      <Pressable>
        <UpdateProfileModal visible={modalVisible} onClose={handleCloseModal} />
        <Text>Update</Text>
      </Pressable>
    </View>
  )
}

export default ProfileScreen