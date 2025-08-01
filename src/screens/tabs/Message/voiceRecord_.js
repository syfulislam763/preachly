import React, { useState } from "react";
import { Audio } from "expo-av";


const voiceRecord_ = () => {

    const [recording, setRecording] = useState(null);

    async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status == 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        console.log(recording, "j")
      }
    } catch (err) {
      console.log('Recording error', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const { sound_, status } = await recording.createNewLoadedSoundAsync();
    const newRecording = {
      sound: sound_,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    };

    const {sound} = await Audio.Sound.createAsync(
        {uri: newRecording.file}, {shouldPlay: true}
    )

    console.log("sound", sound);
    console.log("sound_", sound_)
  
    
  }




  return {
    startRecording,
    stopRecording
  }



}


export default voiceRecord_