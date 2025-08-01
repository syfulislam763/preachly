import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RecordingUI = ({ duration = '0:21', onCancel, onMicPress }) => {
  return (
    <View style={styles.container}>
      {/* Left - Duration with Red Dot */}
      <View style={styles.durationContainer}>
        <View style={styles.redDot} />
        <Text style={styles.durationText}>{duration}s</Text>
      </View>

      {/* Center - Cancel */}
      <TouchableOpacity onPressOut ={onCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      {/* Right - Mic Button */}
      <TouchableOpacity onPressOut={onMicPress}>
        <View style={styles.micOuter}>
          <View style={styles.micMiddle}>
            <View style={styles.micInner}>
              <MaterialCommunityIcons name="microphone" size={24} color="white" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    width:"100%"
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginRight: 6,
  },
  durationText: {
    fontSize: 16,
    color: '#0B172A',
  },
  cancelText: {
    textDecorationLine: 'underline',
    color: '#0B6E6E',
    fontSize: 16,
    fontWeight: '500',
  },
  micOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#B8E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micMiddle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5CBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007A7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecordingUI;
