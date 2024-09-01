import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StartScreen from '../screens/StartScreen';
import { RootStackParamList } from './/types'; // Import kiểu đã khai báo
import BusinessScreen from '../screens/business/BusinessScreen';
import ServiceScreen from '../screens/services/ServiceScreen';
import AddressScreen from '../screens/address/AddressScreen';
import LoginScreen from '../screens/account/LoginScreen';
import RegisterScreen from '../screens/account/RegisterScreen';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import DryCleaningScreen from '../screens/services/DryCleaningScreen';
// import WetCleaningScreen from '../screens/services/WetCleaningScreen';
// import WashDryScreen from '../screens/services/WashDryScreen';
// import StainRemovalScreen from '../screens/services/StainRemovalScreen';
// import SoftFurnitureScreen from '../screens/services/SoftFurnitureScreen';
// import OdorTreatmentSCreen from '../screens/services/OdorTreatmentScreen';
// import LengerieWashingScreen from '../screens/services/LengerieWashingScreen';
// import LaundryIronScreen from '../screens/services/LaundryIronScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Start'
      screenOptions={{
        headerStyle: { backgroundColor: 'skyblue',},
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20,  color: '#fff', },
      }}>
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Business" component={BusinessScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      {/* <Stack.Screen name="Dry" component={DryCleaningScreen} />
      <Stack.Screen name="LaundryIron" component={LaundryIronScreen} />
      <Stack.Screen name="Lengerie" component={LengerieWashingScreen} />
      <Stack.Screen name="OdorTreatment" component={OdorTreatmentSCreen} />
      <Stack.Screen name="SoftFurniture" component={SoftFurnitureScreen} />
      <Stack.Screen name="Wet" component={WetCleaningScreen} />
      <Stack.Screen name="StainRemoval" component={StainRemovalScreen} />
      <Stack.Screen name="WashDry" component={WashDryScreen} /> */}
    </Stack.Navigator>
  )
}

export default AppNavigation