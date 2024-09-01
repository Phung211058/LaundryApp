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
};

// Dry: undefined | {selectedService: string};
// LaundryIron: undefined | {selectedService: string};
// Lengerie: undefined | {selectedService: string};
// OdorTreatment: undefined | {selectedService: string};
// SoftFurniture: undefined | {selectedService: string};
// StainRemoval: undefined | {selectedService: string};
// WashDry: undefined | {selectedService: string};
// Wet: undefined | {selectedService: string}; 
// declare global {
//     namespace ReactNavigation {
//         interface RootParamList extends RootStackParamList{}
//     }
// }
