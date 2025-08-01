import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';

export default function VoiceMessageBubble({setRecordings, recordings}) {

    const player = useAudioPlayer(recordings.uri);
    const [durations,setDuration] = useState("0:00")

    useEffect(()=>{
        let durations = "0:00"
    if((recordings.currentTime)/1000 < 60) {
        durations = "0:"+ (recordings.currentTime)/1000;
    }else if((recordings.currentTime)/(1000*60) < 60){
        let min = (recordings.currentTime)/(1000*60);
        let sec = (recordings.currentTime)%(1000*60);
        durations = min+":"+sec;
    }else{
        let hour = (recordings.currentTime)/(1000*60*60);
        let min = ( (recordings.currentTime)%(1000*60*60) ) / (1000*60);
        let sec = ( (recordings.currentTime)%(1000*60*60) ) % (1000*60);
        durations = hour+":"+min+":"+sec;
    }
    setDuration(durations)

    console.log(recordings, "888");
    }, [])




  return (
    <View style={styles.container}>
      {/* Close Icon */}
      <TouchableOpacity onPress={() => setRecordings(null)} style={styles.closeButton}>
        <Entypo name="cross" size={24} color="#1C1B1F" />
      </TouchableOpacity>

      {/* Audio Player */}
      <View style={styles.audioContainer}>
        {/* Play Button */}
        <TouchableOpacity style={styles.playButton}>
          <FontAwesome name="play" size={15} color="#000" />
        </TouchableOpacity>

        {/* Waveform (Fake Bars) */}
        <View style={styles.waveform}>
          {Array.from({ length: 33    }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.bar,
                { height: 8 + (index % 3) * 4 },
              ]}
            />
          ))}
        </View>

        {/* Red Dot + Duration */}
        <View style={styles.durationWrapper}>
          <View style={styles.redDot} />
          <Text style={styles.durationText}>{durations}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    width: "85%"
  },
  closeButton: {
    marginRight: 14,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#BFD5D0',
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flex: 1,
  },
  playButton: {
    // backgroundColor: '#0B172A',
    // borderRadius: 20,
    // width: 24,
    // height: 24,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 8,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  bar: {
    width: 2,
    backgroundColor: '#7FA7A0',
    borderRadius: 1,
    marginHorizontal: 1,
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E54C45',
    marginRight: 4,
  },
  durationText: {
    fontSize: 14,
    color: '#0B172A',
    fontWeight: '500',
  },
});
