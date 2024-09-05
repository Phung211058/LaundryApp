import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import axios from 'axios';

interface Ordered {
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

const OrderDetailScreen: React.FC = ({ route }: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const { orderId } = route.params;
  const [order, setOrder] = useState<Ordered | null>(null);
  const fetchOrderDetailData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.67:3000/api/detailOrder/${orderId}`);
      setOrder(response.data);
    } catch (error) { console.error('Failed to fetch user data', error); }
  }
  useEffect(() => {
    fetchOrderDetailData();
  }, [orderId])
  return (
    <ScrollView>
      <View style={{ flex: 1, marginHorizontal: 25 }}>
        <Text style={{ fontSize: 24, textAlign: "center", color: "green", marginTop: 15 }}>Order has been placed</Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>Name:   </Text>
          <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{order?.name}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>Phone Number:   </Text>
          <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{order?.phone}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>City:   </Text>
          <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{order?.city}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>District:   </Text>
          <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{order?.district}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>Commune:   </Text>
          <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{order?.commune}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Detail Address:   </Text>
          <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{order?.detailAddress}</Text>
        </View>
        {order?.selectedType == "Service" ? (<>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Type:   </Text>
            <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{order?.selectedType}  -  {order?.selectedService}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Weight:   </Text>
            <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{order?.selectedWeight}</Text>
          </View>
        </>) : (<>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Type:   </Text>
            <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{order?.selectedType}   -   {order?.selectedBusiness}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Category:   </Text>
            <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{order?.selectedCategory}</Text>
          </View>
        </>)}

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Flavour:   </Text>
          <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{order?.selectedFlavour}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Time:   </Text>
          <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{order?.selectedTime}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Total Price:   </Text>
          <Text style={{ fontSize: 27, alignSelf: "flex-start", color: "brown" }}>{order?.totalPrice}$</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20, borderWidth: 0 }}>
        </View>
      </View>
    </ScrollView>
  )
}

export default OrderDetailScreen