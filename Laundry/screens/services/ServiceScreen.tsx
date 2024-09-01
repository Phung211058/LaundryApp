import { View, Text, ScrollView, Pressable, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type ServiceScreenRouteProp = RouteProp<RootStackParamList, 'Service'>;


const ServiceScreen: React.FC = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route = useRoute<ServiceScreenRouteProp>();
  const {selectedService} = route.params;
  const weight = [
    { id: 1, weight: "1 - 5kg" },
    { id: 2, weight: "5 - 10kg" },
    { id: 3, weight: "10 - 15kg" },
    { id: 4, weight: "over 15kg" },
  ];
  const [selectedWeightOption, setSelectedWeightOption] = useState<string | null>(null);
  // Hàm xử lý khi chọn wight
  const handleWeightSelect = (weight: string) => {
    setSelectedWeightOption(weight);
  };
  const flavour = [
    { id: 1, name: "No flavour ", price: 1 }, //oải hương
    { id: 2, name: "Lavender ", price: 3 }, //oải hương
    { id: 3, name: "Citrus ", price: 3 }, // hương cam, chanh
    { id: 4, name: "Fresh Linen", price: 3 }, // hương vải
    { id: 5, name: "Ocean Breeze", price: 2 }, // gió biển
    { id: 6, name: "Vanilla", price: 3 }, // hương vani
    { id: 7, name: "Rose", price: 2 }, // hoa hổng
    { id: 8, name: "Eucalyptus", price: 2 }, // khuynh diệp
    { id: 9, name: "Pine", price: 2 }, // cây thông
    { id: 10, name: "Cotton", price: 2 }, // cotton
    { id: 11, name: "Spice", price: 2 }, // gia vị
  ];
  const [selectedFlavourOption, setSelectedFlavourOption] = useState<string | null>(null);
  // Hàm xử lý khi chọn flavour
  const handleFlavourSelect = (flavour: string) => {
    setSelectedFlavourOption(flavour);
  };
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  // Hàm để hiển thị DatePicker
  const showDatepicker = () => {
    setShow(true);
  };
  // Hàm để xử lý sự kiện khi chọn ngày
  const onChange = (event: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  // Định dạng ngày để hiển thị
  const formatDate = (date: Date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };
  // Kiểm tra xem đã chọn đủ weight, flavour và time chưa
  const isButtonVisible = selectedWeightOption && selectedFlavourOption && date;
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Weight */}
        <Text style={{ fontSize: 20, marginHorizontal: 10, marginVertical: 5 }}>Cateogry</Text>
        <View style={{ backgroundColor: "white", flexDirection: "row", borderRadius: 10, alignItems: "center", padding: 8 }}>
          {weight.map((weight) => (
            <Pressable key={weight.id} style={[
              styles.optionWeight,
              selectedWeightOption === weight.weight && styles.selectedWeightOption
            ]}
              onPress={() => setSelectedWeightOption(weight.weight)}
            >
              <Text style={styles.text}>{weight.weight}</Text>
            </Pressable>
          ))}
        </View>
        {/* Flavour */}
        <Text style={{ fontSize: 20, marginHorizontal: 10, marginVertical: 5, }}>Flavour</Text>
        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 8, flexWrap: "wrap", flexDirection: "row" }}>
          {flavour.map((option) => (
            <Pressable key={option.id} style={[
              styles.optionFlavour,
              selectedFlavourOption === option.name && styles.selectedFlavourOption
            ]}
              onPress={() => setSelectedFlavourOption(option.name)}
            >
              <Text style={styles.text}>{option.name}</Text>
            </Pressable>
          ))}
        </View>
        {/* Time */}
        <View style={{ flexDirection: "row", backgroundColor: "white", borderRadius: 10, padding: 8, marginTop: 15 }}>
          <Text style={{ fontSize: 20, marginHorizontal: 10, marginVertical: 5, }}>Time</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
            <TouchableOpacity onPress={showDatepicker} style={{ borderWidth: 0.6, borderRadius: 20, marginLeft: 25 }}>
              <Text style={{ fontSize: 18, marginHorizontal: 10, marginVertical: 5 }}>Selected date</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, marginTop: 20, marginHorizontal: 10, color: "green" }}> {formatDate(date)}</Text>
          </View>

          {/* <Button onPress={showDatepicker} title="Select Date" /> */}
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              minimumDate={new Date()} // Chỉ cho phép chọn từ ngày hôm nay trở đi
              onChange={onChange}
            />
          )}
        </View>
        {isButtonVisible && (
          <Pressable style={{
            backgroundColor: "#088F6F", padding: 10, margin: 15, borderRadius: 10, alignItems: "center",
          }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 16 }}>Weight: {selectedWeightOption}</Text>
              <Text style={{ color: "white", fontSize: 16 }}>Flavour: {selectedFlavourOption}</Text>
              <Text style={{ color: "white", fontSize: 16 }}>Time: {formatDate(date)}</Text>
            </View>
            <Pressable onPress={() => navigation.navigate("Address", {
              selectedWeight: selectedWeightOption,
              selectedFlavour: selectedFlavourOption, selectedTime: formatDate(date), 
              selectedService: selectedService,
            })}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white", marginTop: 10 }}>Proceed to pick up</Text>
            </Pressable>
          </Pressable>
        )}
      </View>
      <Text style={{ textAlign: "center" }}>Our staff will arrive promptly and provide a price based on the quantity and weight of your items. </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  optionWeight: {
    flex: 1,
    height: "80%",
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    // justifyContent: "center"
  },
  selectedWeightOption: {
    borderColor: 'red',
  },
  selectedFlavourOption: {
    borderColor: 'blue',
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  optionFlavour: {
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
});

export default ServiceScreen