// navigation/types.ts
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the Bottom Tab Navigator types
export type BottomTabParamList = {
  Order: undefined;
  Message: undefined;
  Home: undefined;
  Notification: undefined;
  Profile: undefined;
};
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Start: undefined;
    Service: { selectedType: string, selectedService: string, servicePrice: number, };
    Business: { selectedType: string, selectedBusiness: string, businessPrice: number };
    Address: {
        selectedType: string, selectedCategory?: string, selectedWeight?: string, selectedFlavour: string,
        selectedTime: string, selectedBusiness?: string, selectedService?: string, totalPrice?: number,
    };
    OrderFinish: {
        name: string, phone: string, city: string, district: string, commune: string, detailAddress: string;
        selectedType: string, selectedService?: string, selectedBusiness?: string
        selectedCategory?: string, selectedWeight?: string, selectedFlavour: string, selectedTime: string, totalPrice?: number;
    };
    AppTabs: undefined;
};
export type AppTabsNavigationProp = BottomTabNavigationProp<BottomTabParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
