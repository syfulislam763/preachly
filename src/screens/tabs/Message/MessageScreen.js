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
import MessageWrapper from './MessageWrapper';
import voiceRecord_ from './voiceRecord_';

export default function MessageScreen() {
  useLogout();
  const flatListRef = useRef(null);
  const [isFeedback, setIsFeedback] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0)
  ///
  const {store, updateStore} = useAuth();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("")
  const [prevMsg, setPrevMsg] = useState("")
  const [session, setSession] = useState({});
  const [isNewSession, setIsNewSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [recordings, setRecordings] = useState(null);
  const [recordStartTime, setRecordStartTime] = useState(0)


  const {
    recorderState,
    audioRecorder,
    stopRecording,
    record
  } = voiceRecord();
  const {
    startRecording,
    stopRecording:stopRecording_
  } = voiceRecord_();

  const handleStopRecording = () => {
    stopRecording_();

    // stopRecording();
    // const temp = {
    //   currentTime: audioRecorder.currentTime,
    //   startedTime: recordStartTime,
    //   uri: audioRecorder.uri,
    //   id: audioRecorder.id,
    //   isRecording: audioRecorder.isRecording,
    // }
    // setRecordings(temp);
    // console.log(temp)
    // console.log(JSON.stringify(audioRecorder, null, 2), "record")
  }
  const handleStartRecording = () => {
    stopRecording()
    // record();
    // setRecordings(null);
    // setRecordStartTime(Date.now())
    // console.log(JSON.stringify(recorderState, null, 2), "state")
  }

  const create_session = () =>{
    setLoading(true);
    get_session_id((res,success)=>{
      if(success){
        setSession(res?.data);
        setMessage("");
        setMessages([])
        setPrevMsg("");
        setRecordings(null)
        setIsNewSession(true)
        updateStore({ session: res?.data, isNewSession: true})
        
      }else{
        console.log("ss->", JSON.stringify(res.response.config, null, 2));
        console.log("code ->", res.status)
      }
      
      setLoading(false);
    })
  }
  //console.log("***", JSON.stringify(store, null, 2))

  useEffect(() =>{
    
    if((store?.session?.id)){
      setLoading(true);
      
      get_message_by_session_id(store?.session?.id, (res, success) => {
        if(success){
          const msgs = res?.data?.messages?.map(item => {
            return item.is_user?{
                id: item?.id,
                message_id: item?.id,
                type: 'user',
                verseLink: "",
                message: item?.content
              }:{
              id: item?.id,
              message_id: item?.id,
              type: 'bot',
              verseLink: "",
              message: item?.content,
              bookmark:item.bookmark
            }
          });

          setMessages(msgs);
          setSession(store?.session);
          setLoading(false);
          setIsNewSession(false);
          updateStore({isNewSession: false})
          //console.log("m ->", JSON.stringify(msgs, null, 2))
        }else{
          console.log("s error->", res);
          console.log(store.session)
          setLoading(false);
        }
        
      })
   
    }else{
      create_session();
    }

  },[]);
  
  const handleCopy = async (message) =>{
    await Clipboard.setStringAsync(message);
    console.log("copy...");
  };
  const handleBookmark = (message_id) =>{
    const payload = {
      bookmark: true,
      message_id: message_id
    }
    bookmark_message(payload, (res, success) => {
      if(success){
        let temp = [];
        messages.forEach(item => {
          if(item.id == message_id){
            let x = {...item};
            x.bookmark = true;
            temp.push(x);
          }else{
            temp.push(item)
          }
        });
        setMessages(temp);
      }
    })
    console.log("book mark...");
  }
  const handleShare = async (message) =>{
    const options = {
      message: message
    }
    try{
      await Share.open(options)
      finish_share((res, success) => {
        //console.log(res);
      })
    }catch(e){

    }

  }
  const handleRegenerate = () =>{
    const payload = {
      message: "Answer this question more deeply and precisely please " + prevMsg,
      session_id: session.id,
      type: "message"
    }
    if(ws.current && prevMsg.trim()){
      ws.current.send(JSON.stringify(payload))
    }

  }


  const ws = useRef(null);
  useEffect(() =>{
    if(!session.id)return () => {}

    const wsURL = WEBSOCKET_URL+`/ws/chat/${session.id}/?token=${store?.access}`;
    ws.current = new WebSocket(wsURL);

    ws.current.onopen = () => {
      console.log("socket connected...");
    }

    ws.current.onmessage = (e) =>{
      try{
        const data = JSON.parse(e.data);
        const res = {
          id: Date.now(),
          message_id: data.message_id,
          type: 'bot',
          verseLink: "",
          message: data.content,
          bookmark:false,
        }
        if(data.type === "typing"){
          res.message = "typing..."
          setMessages(prev => [...prev, res])
        }
        if(data.type === "message"){
          
          setMessages(prev => [...prev.filter(item=> item.message != "typing..."), res])

        }
      
      }catch(err){
        console.log("message err", err)
      }
    }

    ws.current.onerror = (e) =>{
      console.log("socket error ->", e.message);
    }


    ws.current.onclose = () =>{
      console.log("socket disconnected...");
    }

    

    // if( (session?.id) && (route.params?.question) && ws.current){
    //   handleSendPredefinedMessage(route.params?.question)
    // }

    // return () =>{
    //   console.log("disconnecting")
    //   ws.current?.close();
    // }

  }, [messages, session]);

  const handleSendPredefinedMessage = (message) => {
    const payload = {
      message: message,
      session_id: session.id,
      type: "message"
    }

    if(ws.current && message.trim()){
      ws.current.send(JSON.stringify(payload));
      const res = {
        id: new Date().getTime(),
        message_id: "",
        type: 'user',
        verseLink: "",
        message: message
      }

      setMessages(prev => [...prev, res]);
      setPrevMsg(message);
      setMessage("")
      setRecordings(null);
    }else{
      console.log("problem..");
    }
  }
 

  const sendMessage = () =>{
    const payload = {
      message: message,
      session_id: session.id,
      type: "message"
    }
    console.log(payload)
    if(ws.current && message.trim()){
      ws.current.send(JSON.stringify(payload));
      const res = {
        id: new Date().getTime(),
        message_id: "",
        type: 'user',
        verseLink: "",
        message: message
      }
      setMessages(prev => [...prev, res]);
      setPrevMsg(message);
      setMessage("")
      setRecordings(null);
    }else{
      console.log("problem..");
    }
    
  }

 

  useFocusEffect(
    useCallback(() =>{
      return () =>{
        console.log("disconnecting")
        if(ws.current){
          ws.current?.close();
        }
      }
    }, [])
  )

  useEffect(() => {
    if (flatListRef.current) {
     flatListRef.current.scrollToEnd({ animated: true });
    }

  }, [messages]);

  const handleSendMessage = (newMessage) => {

    sendMessage()

  };


  const handleGoBack = () => {
    setIsFeedback(true);
  }




  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleGoBack();
        return true; // prevents default exit
      }
    );
 
    return () => backHandler.remove();
  }, []);



  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: 'white' }}>
      <ReusableNavigation
        leftComponent={() => <BackButton navigation={navigation} 
            cb={() => {
              navigation.goBack();
            }}
         />}
        middleComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../../assets/img/askPreachly.png')}
              style={{ height: 40, width: 40, resizeMode: 'contain' }}
            />
            <Text
              style={{
                fontFamily: 'NunitoSemiBold',
                fontSize: 12,
                color: '#0B172A',
                marginTop: 5,
              }}
            >
              Ask Preachly
            </Text>
          </View>
        )}
        RightComponent={() => (
          <View
            style={{
              backgroundColor: '#EDF3F3',
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Pressable
              onPress={() => {
                handleGoBack();
              }}
            >
              <Image
                source={require('../../../../assets/img/newChat.png')}
                style={{ height: 25, width: 25, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>
        )}
        backgroundStyle={{ backgroundColor: '#fff',height: 65 }}
      />
     
      {/* <LostConnection/> */}

      <MessageWrapper 
        messages={messages}
        flatListRef={flatListRef}
        handleSendMessage={handleSendMessage}
        onChange={(text) => setMessage(text)}
        onPredefinedMsg={handleSendPredefinedMessage}
        message={message}
        methods = {{
          handleBookmark,
          handleCopy,
          handleRegenerate,
          handleShare
        }}
        recorderState={recorderState}
        startRocording = {handleStartRecording}
        stopRecording={handleStopRecording}
        recordings={recordings}
        setRecordings={setRecordings}
      />

      {isRating && <RatingMessage 
        visible={isRating} 
        onClose={() => {
          setIsRating(false)
          
        }}

        rating={rating}
        setRatting={(res) =>{
           setRating(res)
          navigation.goBack();
        }}
      />}

      {isFeedback && <Feedback 
        visible={isFeedback} 
        onClose={() => setIsFeedback(false)}
        feedback={feedback}
        setFeedback={res => {
          if(res){
            finish_conversation((res, success) => {
              setFeedback(res)
              setIsFeedback(false);
              create_session()
            })
          }else{
            setFeedback(res);
            create_session()
            setIsFeedback(false);
          }
          
        }}
      />}
      
      {loading && <Indicator visible={loading} onClose={()=>setLoading(false)}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}
    </SafeAreaView>
  );
}