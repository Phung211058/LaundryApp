import React from 'react'
import { Pressable, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StartScreen from '../screens/StartScreen';
import { RootStackParamList } from './/types';
import BusinessScreen from '../screens/business/BusinessScreen';
import ServiceScreen from '../screens/services/ServiceScreen';
import AddressScreen from '../screens/address/AddressScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';
import { Ionicons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
// import Feather from '@expo/vector-icons/Feather';
import ProfileScreen from '../screens/about/ProfileScreen';

const BottomTab = createBottomTabNavigator();

// Header Right Button Component
const HeaderRightButton = () => (
  <Pressable
    onPress={() => {
      // Xử lý sự kiện khi nhấn vào biểu tượng Setting
      console.log('Setting icon pressed');
    }}
    style={{ marginRight: 15 }}
  >
    <Ionicons name="settings-outline" size={32} color="black" />
  </Pressable>
);

const getIcon = (routeName: string, color: string, size: number) => {
  switch (routeName) {
    case 'Home':
      return <Ionicons name="home" size={32} color={color} />;
    case 'Notification':
      return <Ionicons name="notifications" size={24} color={color} />;
    case 'Order':
      return <FontAwesome5 name="file-invoice-dollar" size={24} color={color} />;
    case 'Message':
      return <AntDesign name="message1" size={24} color={color} />; // Sử dụng Ionicons cho tab Service
    case 'Profile':
      return <Ionicons name="person" size={24} color={color} />;
    default:
      return <Ionicons name="home" size={32} color={color} />; // Giá trị mặc định
  }
};

// Tùy chỉnh tab bar button để đặt tab "Home" ở giữa
const CustomTabBarButton = (props: any) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      {props.children}
    </TouchableOpacity>
  );
};

const AppTabs: React.FC = () => (
  <BottomTab.Navigator
    initialRouteName="Home" // Chỉ định tab mặc định là "Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => getIcon(route.name, color, size),
      tabBarActiveTintColor: 'dodgerblue',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        height: 60,
        paddingBottom: 5,
      },
      tabBarButton: (props) => {
        if (route.name === 'Home') {
          return <CustomTabBarButton {...props} />;
        }
        return <TouchableOpacity {...props} />;
      },
    })}
  >
    <BottomTab.Screen name="Order" component={ProfileScreen} />
    <BottomTab.Screen name="Message" component={ProfileScreen} />
    <BottomTab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <BottomTab.Screen name="Notification" component={ProfileScreen} />
    <BottomTab.Screen name="Profile" component={ProfileScreen} options={{ headerTitleAlign: "center", headerStyle: { backgroundColor: "whitesmoke" }, headerRight: () => <HeaderRightButton /> }} />
  </BottomTab.Navigator>
);
const Stack = createNativeStackNavigator();

const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='AppTabs'
      screenOptions={{
        headerStyle: { backgroundColor: 'skyblue' },
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20, color: '#fff' },
      }}
    >
      {/* Màn hình không có BottomTabNavigator */}
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
      <Stack.Screen name="Business" component={BusinessScreen} />

      {/* Màn hình có BottomTabNavigator */}
      <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigation;