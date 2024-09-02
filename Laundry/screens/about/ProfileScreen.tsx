import { View, Text } from 'react-native'
import React from 'react'
//https://www.behance.net/gallery/138690713/User-profile-Design
const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{   marginBottom: 10 }}>
        <Text style={{ fontSize: 22, marginLeft: 15, marginBottom: 5 }}>Name</Text>
        <View style={{   backgroundColor: "#ebebf2", padding: 8, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18 }}>Nguyễn Minh Phụng</Text>
        </View>
      </View>

      <View style={{   marginBottom: 10 }}>
        <Text style={{ fontSize: 22, marginLeft: 15, marginBottom: 5 }}>Name</Text>
        <View style={{   backgroundColor: "#ebebf2", padding: 8, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18 }}>Nguyễn Minh Phụng</Text>
        </View>
      </View>

      <View style={{    marginBottom: 10 }}>
        <Text style={{ fontSize: 22, marginLeft: 15, marginBottom: 5 }}>Name</Text>
        <View style={{   backgroundColor: "#ebebf2", padding: 8, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18 }}>Nguyễn Minh Phụng</Text>
        </View>
      </View>

      <View style={{   marginBottom: 10 }}>
        <Text style={{ fontSize: 22, marginLeft: 15, marginBottom: 5 }}>Name</Text>
        <View style={{   backgroundColor: "#ebebf2", padding: 8, borderRadius: 20, elevation: 2 }}>
          <Text style={{ fontSize: 18 }}>Nguyễn Minh Phụng</Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen