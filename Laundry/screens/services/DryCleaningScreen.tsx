import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Carousel from 'react-native-reanimated-carousel';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RootStackParamList } from '../../navigation/types'; // Import kiểu

const DryCleaningScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  return (
    <View>
      <Text>DryCleaningScreen</Text>
      {/* Business establishments 1 */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {/* Hotel */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7 }}>
          <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "powderblue", padding: 12, marginBottom: 10 }}
            onPress={() => navigation.navigate("Business")}>
            <FontAwesome5 name="hotel" size={28} color="indigo" />
          </Pressable>
          <View>
            <Text style={{ textAlign: "center" }}>Hotel</Text>
          </View>
        </View>
        {/* Restaurant */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7, }}>
          <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "ghostwhite", padding: 12, marginBottom: 10 }}
            onPress={() => navigation.navigate("Business")}>
            <Ionicons name="restaurant" size={28} color="gray" />
          </Pressable>
          <View>
            <Text style={{ textAlign: "center" }}>Restaurant</Text>
          </View>
        </View>
        {/* Factory */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7 }}>
          <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "gold", padding: 10, marginBottom: 10 }}
            onPress={() => navigation.navigate("Business")}>
            <MaterialIcons name="factory" size={32} color="black" />
          </Pressable>
          <View>
            <Text style={{ textAlign: "center" }}>Factory</Text>
          </View>
        </View>
      </View>
      {/* Business establishments 2 */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
        {/* Spa */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7 }}>
          <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "bisque", padding: 12, marginBottom: 10 }}
            onPress={() => navigation.navigate("Business")}>
            <FontAwesome5 name="spa" size={28} color="peru" />
          </Pressable>
          <View>
            <Text style={{ textAlign: "center" }}>Spa</Text>
          </View>
        </View>
        {/* Hospital */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7, }}>
          <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "skyblue", padding: 12, marginBottom: 10 }}
            onPress={() => navigation.navigate("Business")}>
            <FontAwesome5 name="hospital-alt" size={28} color="azure" />
          </Pressable>
          <View>
            <Text style={{ textAlign: "center" }}>Hospital</Text>
          </View>
        </View>
        {/* Gym */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7 }}>
          <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "powderblue", padding: 7, marginBottom: 10 }}
            onPress={() => navigation.navigate("Business")}>
            <MaterialCommunityIcons name="weight-lifter" size={36} color="black" />
          </Pressable>
          <View>
            <Text style={{ textAlign: "center" }}>Gym</Text>
          </View>
        </View>
      </View>

      {/* Wet Cleaning */}
      <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7 }}>
        <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "skyblue", padding: 7, marginBottom: 10 }}
          onPress={() => navigation.navigate("Wet")}>
          <MaterialIcons name="water-drop" size={36} color="white" />
        </Pressable>
        <View>
          <Text style={{ textAlign: "center" }}>Wet Cleaning</Text>
        </View>
      </View>
      {/* Dry Cleaning */}
      <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7, }}>
        <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "ghostwhite", padding: 7, marginBottom: 10 }}
          onPress={() => navigation.navigate("Dry")}>
          <MaterialCommunityIcons name="water-off-outline" size={36} color="skyblue" />
        </Pressable>
        <View>
          <Text style={{ textAlign: "center" }}>Dry Cleaning</Text>
        </View>
      </View>
      {/* Lingerie Washing */}
      <View style={{ flex: 1, flexDirection: "column", alignItems: 'center', marginHorizontal: 7 }}>
        <Pressable style={{ borderWidth: 0.5, borderRadius: 50, backgroundColor: "powderblue", padding: 7, marginBottom: 10 }}
          onPress={() => navigation.navigate("Lengerie")}>
          <Fontisto name="swimsuit" size={36} color="darkorchid" />
        </Pressable>
        <View>
          <Text style={{ textAlign: "center" }}>Lingerie Washing</Text>
        </View>
      </View>
    </View>
  )
}

export default DryCleaningScreen