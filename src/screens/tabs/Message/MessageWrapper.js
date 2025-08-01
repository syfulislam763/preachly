import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReusableNavigation from '../../../components/ReusabeNavigation';
import BackButton from '../../../components/BackButton';
import Conversations from './Conversations';
// import ChatInput from './ChatInput';
import LostConnection from './LostConnection';
import CustomModal from '../../../components/CustomModal';
import RatingMessage from './RatingMessage';
import Feedback from './Feedback';
import { get_session_id, bookmark_message, get_message_by_session_id } from '../TabsAPI';
import Indicator from '../../../components/Indicator'
import { WEBSOCKET_URL } from '../../../context/Paths';
import {useAuth} from '../../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import Share from 'react-native-share'
import useLogout from '../../../hooks/useLogout';
import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { setIsAudioActiveAsync } from 'expo-audio';
import { finish_share, finish_conversation } from '../TabsAPI';
import { useRoute } from '@react-navigation/native';
import voiceRecord from './voiceRecord';
import VoiceMessageBubble from './VoiceMessageBubble';
import RecordingUI from './RecordingUI';

const MessageWrapper = ({
  flatListRef, 
  messages,
  onChange, 
  onPredefinedMsg, 
  handleSendMessage, 
  message, 
  methods,
  startRocording,
  stopRecording,
  recorderState,
  recordings,
  setRecordings
}) => {
    
    const intervalRef = useRef(null);
    const [seconds, setSeconds] = useState(0);


    const startTimer = () => {
        if(intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev+1);
            console.log("hi, run")
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setSeconds(0);
    }


  return <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View 
        style={{ flex: 1 }}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Conversations
                type={item.type}
                message={item.message}
                verseLink={item.verseLink}
                methods={methods}
                message_id={item.message_id}
                item={item}
              />
          
            )}
            contentContainerStyle={{
              paddingTop: 15,
              paddingHorizontal: 12,
              paddingBottom: 20, // leave space for input
            }}
            // ListFooterComponent={() => {
            //   return message?null:<DummyQuestion onChange={onPredefinedMsg}/>
            // }}
            ListEmptyComponent={() => {
              return <DummyQuestion onChange={onPredefinedMsg}/>
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            
          />

          
          <View style={styles.inputContainer}>
              {/* <Image
                source={require("../../../../assets/img/24-addfile.png")}
                style={styles.inputIcon}
              /> */}
            {(recorderState.isRecording && !recordings)?
            //   <VoiceMessageBubble/>
                <RecordingUI
                    duration={seconds}
                    onCancel={()=> {
                        stopRecording()
                        stopTimer();
                    }}
                    onMicPress={()=>{
                        stopRecording()
                        stopTimer();
                    }}
                />
              :recordings?<>

                <VoiceMessageBubble durations={recorderState.durationMillis} recordings={recordings} setRecordings={setRecordings}/>
                <Pressable 
                    onPress={()=>handleSendMessage(message)}
                >
                    <Image
                    //source={require("../../../../assets/img/24-microphone.png")}
                    source={require("../../../../assets/img/send_message.png")}
                    style={styles.inputIcon}
                    />
                </Pressable>

              </> :<>
                {}
                <TextInput
                    style={styles.inputField}
                    multiline={true}
                    numberOfLines={2}
                    value={message}
                    onChangeText={e=>onChange(e)}
                    placeholder={"What's on your heart? Ask anything - lets find and inspired answer.."}
                    placeholderTextColor={'#607373'}
                />
            
                <Pressable 
                    onPress={()=> {
                        startRocording()
                        startTimer()
                    }}
                >
                    
                    <Image
                    source={require("../../../../assets/img/24-microphone.png")}
                    style={styles.inputIcon}
                    />
                </Pressable>

                <Pressable 
                    onPress={()=>handleSendMessage(message)}
                >
                    <Image
                    //source={require("../../../../assets/img/24-microphone.png")}
                    source={require("../../../../assets/img/send_message.png")}
                    style={styles.inputIcon}
                    />
                </Pressable>

            
            </>
            
            }
              
              
              {/* {!recorderState.isRecording?
                  <Pressable onLongPress={()=>startRocording()} onPress={()=>startRocording()}><Text>start</Text></Pressable>:
                  <Pressable onPress={()=>stopRecording()}><Text>stop</Text></Pressable>
                } */}
              
          </View>
        </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
}


export default MessageWrapper



const DummyQuestion = ({onChange}) => {
  return <View style={{
   
    marginTop: "100%",
    width:"100%",
    backgroundColor:'#fff',
    padding:20,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }}>
    <Text style={{
      color:"#0B172A",
      fontFamily:'NunitoBold',
      fontSize: 18,
      paddingVertical: 20,
    }}>What do you want to ask?</Text>
    <View style={{
      
    }}>
      <Pressable onPress={()=>onChange("Why does God allow suffering and evil in the world?")}>
        <Text style={styles.commonQuestion}>Why does God allow suffering and evil in the world?</Text>
      </Pressable>
      <Pressable onPress={() => onChange("How can we trust the Bible when it’s written by humans?")}>
        <Text style={styles.commonQuestion}>How can we trust the Bible when it’s written by humans?</Text>
      </Pressable>
      <Pressable onPress={() => onChange("How can Jesus be both fully God and fully man?")}>
        <Text style={styles.commonQuestion}>How can Jesus be both fully God and fully man?</Text>
      </Pressable>
      <Pressable onPress={() => onChange(`Can’t people be good without believing in God?`)}>
        <Text style={styles.commonQuestion}>Can’t people be good without believing in God?</Text>
      </Pressable>
      <Pressable onPress={() => onChange(`How can I trust the church when it’s full of scandalsand corruption?`)}>
        <Text style={styles.commonQuestion}>How can I trust the church when it’s full of scandalsand corruption?</Text>
      </Pressable>
    </View>
  </View>
}




const styles = StyleSheet.create({
  commonQuestion:{
    color:'#0B172A',
    fontFamily:'NunitoSemiBold',
    fontSize: 15,
    backgroundColor:'#FDF2D8',
    paddingVertical:5,
    paddingHorizontal:10,
    marginBottom:10,
    borderRadius: 20,
  },
  inputContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:10
  },
  inputField: {
    borderWidth:1,
    width: '75%',
    borderColor:'#ACC6C5',
    borderRadius: 30,
    paddingVertical:10,
    paddingHorizontal: 20
  },
  inputIcon:{
    height:30,
    width:30,
    objectFit:'contain'
  },
})
