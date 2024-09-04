import { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, Pressable, Button, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import {
  Ionicons, AntDesign, FontAwesome5, Fontisto, SimpleLineIcons,
  MaterialCommunityIcons, MaterialIcons, Feather
} from '@expo/vector-icons/';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Menu, Provider } from 'react-native-paper';

// https://dribbble.com/shots/17990180--Find-Tailor-and-Dry-Cleaners-App
const HomeScreen: React.FC = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const width = Dimensions.get('window').width;
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const list = [
    { id: 1, title: 'First', image: 'https://th.bing.com/th?id=OIP.tLotgCDtzgTdwJcTiXWRCwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.6&pid=3.1&rm=2' },
    { id: 2, title: 'Second', image: 'https://dataconomy.com/wp-content/uploads/2022/10/NightCafe-AI-image-generator-7.jpg' },
    { id: 3, title: 'Third', image: 'https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg' }
  ];
  const businessEstablishments = [
    {
      id: 1, name: "Hotel",
      icon: <FontAwesome5 name="hotel" size={28} color="indigo" />,
      backgroundColor: "powderblue", price: 1.5,
    },
    {
      id: 2, name: "Restaurant",
      icon: <Ionicons name="restaurant" size={28} color="gray" />,
      backgroundColor: "ghostwhite", price: 2
    },
    {
      id: 3, name: "Factory",
      icon: <MaterialIcons name="factory" size={28} color="black" />,
      backgroundColor: "gold", price: 3,
    },
    {
      id: 4, name: "Spa",
      icon: <FontAwesome5 name="spa" size={28} color="peru" />,
      backgroundColor: "bisque", price: 1.5
    },
    {
      id: 5, name: "Hospital",
      icon: <FontAwesome5 name="hospital-alt" size={28} color="azure" />,
      backgroundColor: "skyblue", price: 3
    },
    {
      id: 6, name: "Gym",
      icon: <MaterialCommunityIcons name="weight-lifter" size={28} color="black" />,
      backgroundColor: "powderblue", price: 2
    },
  ];
  const services = [
    {
      id: 1, name: "Wet Cleaning", price: 1.5,
      icon: <MaterialIcons name="water-drop" size={36} color="white" />,
      backgroundColor: "skyblue", navigate: "Wet"
    },
    {
      id: 2, name: "Dry Cleaning", price: 2,
      icon: <MaterialCommunityIcons name="water-off-outline" size={36} color="skyblue" />,
      backgroundColor: "ghostwhite", navigate: "Dry"
    },
    {
      id: 3, name: "Lengerie", price: 2,
      icon: <Fontisto name="swimsuit" size={36} color="darkorchid" />,
      backgroundColor: "powderblue", navigate: "Lengerie"
    },
    {
      id: 4, name: "Soft Furniture", price: 3,
      icon: <MaterialCommunityIcons name="sofa-single" size={36} color="brown" />,
      backgroundColor: "powderblue", navigate: "SoftFurniture"
    },
    {
      id: 5, name: "Stain Removal", price: 4,
      icon: <FontAwesome5 name="eraser" size={36} color="lavender" />,
      backgroundColor: "skyblue", navigate: "StainRemoval"
    },
    {
      id: 6, name: "Odor Treatment", price: 3,
      icon: <MaterialCommunityIcons name="flower-pollen" size={36} color="orangered" />,
      backgroundColor: "powderblue", navigate: "OdorTreatment"
    },
  ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "whitesmoke" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}> */}
          {/* IconBar  */}
          {/* <View style={{ alignItems: "center", justifyContent: "center", height: 40, width: 40, }}>
            <SimpleLineIcons name="menu" size={26} color="black" />
          </View> */}
          {/* Notificaiton and infor */}
          {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}> */}
            {/* Notification */}
            {/* <View style={{ borderWidth: 0.6, borderRadius: 50, width: 45, height: 45, justifyContent: "center", alignItems: "center", marginRight: 15, marginTop: 3 }}>
              <Feather name="bell" size={28} color="black" style={{ color: "gray" }} />
            </View> */}
            {/* Infor  */}
            {/* <View style={{ alignSelf: 'flex-start' }}>
              <Image source={require("../assets/mine.jpg")} style={{ width: 50, height: 50, borderRadius: 50 }} />
            </View> */}
          {/* </View> */}
        {/* </View> */}
        {/* Slogan */}
        <View style={{ marginHorizontal: 30, marginTop: 15 }}>
          <Text style={{ fontSize: 18 }}>Hello Tom</Text>
          <Text style={{ fontSize: 28, fontWeight: "400" }}>Let's clean your clothes with phoenix  <FontAwesome5 name="phoenix-framework" size={28} color="coral" /></Text>
        </View>
        {/* Carousel  */}
        <View style={{ flex: 1, padding: 10, marginTop: 10, justifyContent: "center", alignItems: "center" }}>
          <Carousel width={width * 0.9} height={width / 2} autoPlay={true} data={list} scrollAnimationDuration={1500}
            // onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item }) => (
              <View style={{ flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: "center", }}>
                <Image source={{ uri: item.image }} style={{ width: '100%', height: "95%", borderRadius: 10 }} />
              </View>
            )}
          />
        </View>

        {/* Services */}
        <View style={{ justifyContent: "center", marginVertical: 20, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, padding: 10 }}>
          <Text style={{ marginLeft: 15, marginBottom: 15, fontSize: 22 }}>Services</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
            {/* Soft Furniture*/}
            {services.map((service) => (
              <View key={service.id} style={{ flexDirection: "column", alignItems: 'center', marginHorizontal: 7, marginBottom: 15, width: "27%" }}>
                <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: service.backgroundColor, padding: 7, marginBottom: 10, }}
                  onPress={() => navigation.navigate("Service", { selectedService: service.name, servicePrice: service.price })}>
                  {service.icon}
                </Pressable>
                <View>
                  <Text style={{ textAlign: "center" }}>{service.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Business establishments */}
        <View style={{ justifyContent: "center", marginVertical: 20, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, padding: 10 }}>
          <Text style={{ marginLeft: 15, marginBottom: 15, fontSize: 22 }}>Business establishments</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", }}>
            {businessEstablishments.map((establishment) => (
              <View key={establishment.id} style={{ flexDirection: "column", alignItems: 'center', marginHorizontal: 7, width: "25%", marginBottom: 15 }}>
                <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: establishment.backgroundColor, padding: 12, marginBottom: 10, }}
                  onPress={() => navigation.navigate("Business", { selectedBusiness: establishment.name, businessPrice: establishment.price })}
                >
                  {establishment.icon}
                </Pressable>
                <View>
                  <Text style={{ textAlign: "center" }}>{establishment.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* Footer */}
        <View style={{ marginVertical: 10, marginHorizontal: 10, backgroundColor: "white", borderRadius: 10, }}>
          <Pressable style={{ flexDirection: "row", padding: 10 }}>
            <Ionicons name="call-outline" size={26} color="black" />
            <Text style={{ fontSize: 24, marginLeft: 12, }}>1800 1294 </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", padding: 10, }}>
            <AntDesign name="questioncircleo" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 12, }}>Help and feedback </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", padding: 10, }}>
            <AntDesign name="questioncircleo" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 12, }}>Privacy </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", padding: 10, }}>
            <AntDesign name="questioncircleo" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 12, }}>Help and feedback </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", padding: 10, }}>
            <AntDesign name="questioncircleo" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 12, }}>Help and feedback </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", padding: 10, }}>
            <AntDesign name="questioncircleo" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 12, }}>Help and feedback </Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", padding: 10, }}>
            <AntDesign name="questioncircleo" size={24} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 12, }}>Help and feedback </Text>
          </Pressable>
        </View>

      </ScrollView >
    </SafeAreaView >
  )
}

export default HomeScreen