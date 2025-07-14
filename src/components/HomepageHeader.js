import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons'; // Use `react-native-vector-icons` if not using Expo




const HomepageHeader = () => {





  return (
    <View style={styles.container}>
      {/* Left: Profile Picture and Greeting */}
      <View style={styles.leftSection}>
        <View>
          <Image
            source={require('../../assets/img/avatar.png')} 
            style={styles.avatar}
          />
        </View>
        <View>
          <Text style={styles.welcome}>Welcome back,</Text>
          <Text style={styles.welcome}>Alice!</Text>
        </View>
      </View>

      {/* Right: Icons */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
            <Image
                source={require('../../assets/img/24-calendar.png')} 
                style={{
                    height:26,
                    width:26,
                    objectFit:'contain'
                }}
            />
        </TouchableOpacity>

        <TouchableOpacity style={styles.countButton}>
            <Image
                source={require('../../assets/img/Fire.png')} 
                style={{
                    height:18,
                    width:18,
                    objectFit:'contain'
                }}
            />
          <Text style={styles.countText}>0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomepageHeader;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  welcome: {
    fontSize: 18,
    color: '#0B172A',
    fontFamily:'NunitoSemiBold'
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#0F172A',
    borderRadius: 999,
  },
  countText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '500',
  },
});

