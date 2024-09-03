// navigation/types.ts
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Start: undefined;
    Service: {selectedService: string}; 
    Business: { selectedBusiness: string };
    Address: {selectedCategory?: string; selectedWeight?: string; selectedFlavour: string; 
        selectedTime: string; selectedBusiness?: string, selectedService?: string};
    Finish: {selectedCategory?: string; selectedWeight?: string; selectedFlavour: string; 
        selectedTime: string; selectedBusiness?: string, selectedService?: string, address: object};
    AppTabs: undefined;
};
