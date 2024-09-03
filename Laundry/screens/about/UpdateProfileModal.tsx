import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext'; // Đường dẫn tới AuthContext

interface User {
  name: string;
  phone: string;
  address: {
    city: string;
    district: string;
    borough: string;
    detailAddress: string;
  };
}

const UpdateProfileModal: React.FC<{ visible: boolean, onClose: () => void }> = ({ visible, onClose }) => {
  const { accountId } = useAuth(); // Lấy accountId từ context
  const [formData, setFormData] = useState<User>({
    name: '',
    phone: '',
    address: {
      city: '',
      district: '',
      borough: '',
      detailAddress: ''
    }
  });

  useEffect(() => {
    if (accountId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://192.168.1.67:3000/api/user/${accountId}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      };
      fetchUserData();
    }
  }, [accountId]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!accountId) {
      Alert.alert('Error', 'No account ID found');
      return;
    }

    try {
      await axios.put(`http://192.168.1.67:3000/api/user/${accountId}`, formData);
      Alert.alert('Success', 'Profile updated successfully');
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      console.error('Error updating profile', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Update Profile</Text>
          <TextInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="City"
            value={formData.address?.city} // Optional chaining
            onChangeText={(text) => handleChange('address.city', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="District"
            value={formData.address?.district} // Optional chaining
            onChangeText={(text) => handleChange('address.district', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Borough"
            value={formData.address?.borough} // Optional chaining
            onChangeText={(text) => handleChange('address.borough', text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Detail Address"
            value={formData.address?.detailAddress} // Optional chaining
            onChangeText={(text) => handleChange('address.detailAddress', text)}
            style={styles.input}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default UpdateProfileModal;
