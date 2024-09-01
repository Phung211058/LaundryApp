import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, Animated, Image, TouchableOpacity } from 'react-native';
import AppNavigation from '../navigation/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp  } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; // Import kiểu
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// type NavigationProp = NavigationProp<RootStackParamList, 'Home'>;

const StartScreen: React.FC = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  // Sử dụng useRef để giữ giá trị của animated value
  const spinValue = useRef(new Animated.Value(0)).current;

  // Hàm để khởi động animation
  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1, // Quay từ 0 đến 1 (một vòng tròn)
        duration: 2000, // Thời gian quay trong 2 giây
        useNativeDriver: true, // Sử dụng Native Driver để tối ưu hiệu suất
      })
    );

    spinAnimation.start(); // Bắt đầu quay

    return () => spinAnimation.stop(); // Dừng animation khi component unmount
  }, [spinValue]);

  // Mapping giá trị từ 0 -> 1 thành các góc quay từ 0 -> 360 độ
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "whitesmoke" }}>
      <ScrollView>
        <View >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 30 }}>
            <Text style={{ color: "coral", fontSize: 44 }}>Phoenix </Text>
            <Text style={{ color: "cyan", fontSize: 42 }}>Laundry</Text>
          </View>

          <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "center", marginVertical: 40 }}>
            <Text style={{ fontSize: 24, color: "gray" }}>Welcome to laundry app</Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <Image style={{ width: 200, height: 280, }} source={{ uri: 'https://st2.depositphotos.com/1526816/6946/v/450/depositphotos_69464127-stock-illustration-washing-machine-with-front-door.jpg' }} />
            <Animated.Image
              source={{ uri: 'https://media.istockphoto.com/id/481547058/vector/washing-machine-door.jpg?s=612x612&w=0&k=20&c=u6xRDH4u33RoWKM3LGJ_8L7qFtDsUh8ANnC8tT3vgDE=' }} // Thay YOUR_IMAGE_URL bằng URL của hình ảnh máy giặt
              style={[styles.image, { transform: [{ rotate: spin }] }]} // Áp dụng animation
            />
          </View>

          <TouchableOpacity style={{
            backgroundColor: '#007bff', borderRadius: 100, paddingVertical: 10, marginHorizontal: 70, marginTop: 40,
            elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 6
          }} onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: 20, textAlign: "center", color: "#fff" }}>Get Start</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 145, height: 145, borderRadius: 100, position: "absolute", }
});

export default StartScreen;
