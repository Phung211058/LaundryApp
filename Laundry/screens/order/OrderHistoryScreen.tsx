import { View, Text, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext';

interface Ordered {
  _id: string;
  name: string;
  phone: string;
  city: string;
  district: string;
  commune: string;
  detailAddress: string;
  selectedType: string,
  selectedCategory: string,
  selectedWeight: string,
  selectedFlavour: string,
  selectedTime: string,
  selectedService: string,
  selectedBusiness: string,
  totalPrice: string
}

const OrderHistoryScreen: React.FC = ({ route }: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  // const [ordered, setOrdered] = useState<Ordered[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const { accountId } = useAuth();
  if (accountId === null || accountId === 'null') {
    console.log("Invalid accountId");
    return; // Không thực hiện fetch khi accountId không hợp lệ
  }
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.1.67:3000/api/orders/${accountId}`);
        setOrders([...response.data]); // Lưu danh sách đơn hàng
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (accountId) {
      fetchOrders(); // Chỉ gọi API nếu userId tồn tại
    }
  }, [accountId]);
  useEffect(() => {
    console.log('Current orders:', orders); // Xem đơn hàng sau khi cập nhật state
  }, [orders]);

  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 15 }}>
        <Text style={{ paddingTop: 10, fontSize: 20, color: "chocolate", textAlign: "center" }}>Order History</Text>
        {orders.map((order: any) => (
          <Pressable key={order._id} style={{ backgroundColor: "white", elevation: 6, borderRadius: 10, marginTop: 20 }}
            onPress={() => navigation.navigate("OrderDetail", { orderId: order._id })}>
            <Text style={{ fontSize: 15, paddingHorizontal: 15, borderBottomWidth: 0.5, padding: 7 }}> Date: {order.selectedTime}</Text>
            <View style={{ paddingHorizontal: 20, justifyContent: "space-between", flexDirection: "row", padding: 7 }}>
              <Text style={{ fontSize: 15, alignSelf: "flex-start" }}>{order.selectedType}</Text>
              <Text style={{ fontSize: 15, alignSelf: "flex-start" }}>{order.selectedType == "Business" ? (order.selectedBusiness) : (order.selectedService)}</Text>
              <Text style={{ fontSize: 20, alignSelf: "flex-start", fontWeight: "600", color: "brown" }}>{order.totalPrice}$</Text>
            </View>
          </Pressable>
        ))}
      </View>

    </ScrollView>
  )
}

export default OrderHistoryScreen