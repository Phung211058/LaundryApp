import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRoute, RouteProp, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParamList } from '../../navigation/types';
// import { ,  } from 'react-native-gesture-handler';
import { useAuth } from '../authentication/AuthContext';

// interface Order {
//   name: String, phone: String, city: String, district: String, commune: String, detailAddress: String,
//   selectedType: String, selectedService?: string, selectedBusiness?: string
//   selectedCategory?: String, selectedWeight?: String, selectedFlavour: String, selectedDate: String,
// }
type OrderScreenRouteProp = RouteProp<RootStackParamList, 'OrderFinish'>;
const OrderFinishScreen: React.FC = () => {
  const route = useRoute<OrderScreenRouteProp>();
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const navigation1 = useNavigation<RootStackNavigationProp>();
  const { accountId } = useAuth();
  const { name, phone, city, district, commune, detailAddress,
    selectedType, selectedCategory, selectedWeight, selectedFlavour, selectedTime, selectedService, selectedBusiness, totalPrice } = route.params;
    const handleNavigateToOrder = () => {
    };
  return (
    <ScrollView>
    <View style={{ flex: 1, marginHorizontal: 25 }}>
      <Text style={{ fontSize: 24, textAlign: "center", color: "green", marginTop: 15 }}>Order has been placed</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>Name:   </Text>
        <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{name}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>Phone Number:   </Text>
        <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{phone}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>City:   </Text>
        <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{city}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>District:   </Text>
        <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{district}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 4 }}>Commune:   </Text>
        <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{commune}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Detail Address:   </Text>
        <Text style={{ fontSize: 22, alignSelf: "flex-start" }}>{detailAddress}</Text>
      </View>
      {selectedType == "Service" ? (<>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Type:   </Text>
        <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{selectedType}  -  {selectedService}</Text>
      </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Weight:   </Text>
          <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{selectedWeight}</Text>
        </View>
      </>) : (<>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Type:   </Text>
        <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{selectedType}  -  {selectedBusiness}</Text>
      </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Category:   </Text>
          <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{selectedCategory}</Text>
        </View>
      </>)}

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Flavour:   </Text>
        <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{selectedFlavour}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Time:   </Text>
        <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>{selectedTime}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ fontSize: 18, color: "gray", alignSelf: "flex-start", marginTop: 6 }}>Total Price:   </Text>
        <Text style={{ fontSize: 27, alignSelf: "flex-start", color: "brown" }}>{totalPrice}$</Text>
      </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 20 }}>
          <Pressable style={{ paddingVertical: 8, paddingHorizontal: 40, borderRadius: 20, backgroundColor: "white", borderWidth: 0.5 }}>
            <Text style={{ fontSize: 24, textAlign: "center" }}>History</Text>
          </Pressable>
          <Pressable style={{ paddingVertical: 8, paddingHorizontal: 30, borderRadius: 20, backgroundColor: "black", }}
           >
            <Text style={{ fontSize: 24, color: "white"}}>New Order</Text>
          </Pressable>
        </View>
    </View>
  </ScrollView>
  )
  
}

export default OrderFinishScreen