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
import { finish_share, finish_conversation, send_voice_message } from '../TabsAPI';
import { useRoute } from '@react-navigation/native';
import VoiceMessageBubble from './VoiceMessageBubble';
import MessageWrapper from './MessageWrapper';
import { startRecording, stopRecording} from './voiceRecord_';

export default function MessageScreen() {
  //useLogout();
  const flatListRef = useRef(null);
  const [isFeedback, setIsFeedback] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0)
  ///
  const {store, updateStore, updateSession, session} = useAuth();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("")
  const [prevMsg, setPrevMsg] = useState("")

  const [isNewSession, setIsNewSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [recordings, setRecordings] = useState(null);
  const [audio, setAudio] = useState(null);
  const [recordingState, setRecordingState] = useState(false);
  

  const [recordStartTime, setRecordStartTime] = useState(0)
  const [isTest, setIsTest] = useState(false);

  const [doneOne, setDoneOne] = useState(false);
  const [doneTwo, setDoneTwo] = useState(false);



  const handleStopRecording = async () => {
    const data = await stopRecording(recordings, setRecordings);
    setAudio(data);
    setRecordingState(false);
  }
  const handleStartRecording = async () => {
    const res = await startRecording();
    setRecordings(res.recording)
    setRecordingState(true);
    setAudio(null)
  }

  const create_session = (cb = ()=>{}) =>{
    setLoading(true);
    get_session_id((res,success)=>{
      if(success){
        console.log("created new session")
        //setSession(res?.data);
        setMessage("");
        setMessages([])
        setPrevMsg("");
        setRecordings(null)
        //setIsNewSession(true)
        updateSession({ ...res.data, isNewSession: true})
        setDoneOne(true)
        cb();
      }else{
        console.log("ss->", JSON.stringify(res.response.config, null, 2));
        console.log("code ->", res.status)
      }
      
      setLoading(false);
    })
  }
  //console.log("***", JSON.stringify(store, null, 2))

  useEffect(() =>{
    console.log(session, "session")
    if((session?.id)){
      setLoading(true);
      
      get_message_by_session_id(session?.id, (res, success) => {
        if(success){
          let msgs = res?.data?.messages?.map(item => {
            
            return (item.is_user && !item.has_voice )?{
                id: item?.id,
                message_id: item?.id,
                type: 'user',
                verseLink: "",
                message: item?.content
              }: item.has_voice? 
                {
                  id: item?.id,
                  message_id: item?.id,
                  type: 'audio',
                  verseLink: "",
                  message: item?.content,
                  uri: item.voice_file
                }
              : {
              id: item?.id,
              message_id: item?.id,
              type: 'bot',
              verseLink: "",
              message: item?.content,
              bookmark:item.bookmark
            }
          });

          let temp = []
          for(let i=0;i<msgs.length;){
            if(msgs[i].type == "audio"){
              temp.push(msgs[i]);
              i += 2;
            }else{
              temp.push(msgs[i]);
              i++;
            }
            
          }

          console.log(JSON.stringify({}, null, 2), "etm")

          setMessages(temp);
          //setSession(session);
          setLoading(false);
          //setIsNewSession(false);
          setDoneOne(true)
          updateSession({isNewSession: false})
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


    return () =>{
      
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
      session_id: session?.id,
      type: "message"
    }
    if(ws.current && prevMsg.trim()){
      ws.current.send(JSON.stringify(payload))
    }

  }

  const ws = useRef(null);
  useEffect(() =>{
    if(!session?.id)return () => {}

    const wsURL = WEBSOCKET_URL+`/ws/chat/${session?.id}/?token=${store?.access}`;
    ws.current = new WebSocket(wsURL);

    ws.current.onopen = () => {
      setDoneTwo(true)
      console.log("socket connected...");
    }

    ws.current.onmessage = (e) =>{
      try{
        const data = JSON.parse(e.data);
        const res = {
          id: Date.now(),
          message_id: data?.message_id,
          type: 'bot',
          verseLink: "",
          message: data?.content,
          bookmark:false,
        }
        if(data?.type === "typing"){
          res.message = "typing..."
          setMessages(prev => [...prev, res])
        }
        if(data?.type === "message"){
          
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
  }, [store]);

  const handleSendPredefinedMessage = (message) => {
    const payload = {
      message: message,
      session_id: session?.id,
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
      
    }
  }
 
  const sendMessage = () =>{
    const payload = {
      message: message,
      session_id: session?.id,
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
    
    return ()=>{
     
    }
  }, [messages]);

  const handleSendMessage = (newMessage) => {
    if(audio){
      const payload = new FormData();
      const temp = audio.file.split("/")
      const voice_file = {
        uri: audio.file,
        name: audio.name,
        type: 'audio/'+ temp[temp.length-1].split(".")[1]
      }
      payload.append("voice_file", voice_file)
      payload.append("session_id", session?.id)


      const res = {
        id: Date.now(),
        message_id: Date.now(),
        type: 'user',
        verseLink: "",
        message: "",
        bookmark:false,
      }
      res.message = "sending..."
      setMessages(prev => [...prev, res])
     
      
      send_voice_message(payload, (res, success) => {
        if(success){
          const data = {
            id: Date.now(),
            message_id: res?.data.message_id,
            type: 'audio',
            verseLink: "",
            message: res?.data?.transcript,
            bookmark:false,
            uri: res?.data?.voice_url
          }
          const payload = {
            message: res?.data?.transcript,
            session_id: session?.id,
            type: "message"
          }
          ws.current.send(JSON.stringify(payload))
          setMessages(prev => [...prev.filter(item=> item.message != "sending..."), data])
          setAudio(null);
          setMessage("")
        }else{
          setMessages(prev => [...prev.filter(item=> item.message != "sending...")])
          setAudio(null);
          setMessage("")
          console.log("err ", JSON.stringify(res, null, 2));
        }
      })
  

    }else{
      sendMessage()
    }

    

  };

  const handleGoBack = () => {
    setIsFeedback(true);
  }


  useEffect(() => {

    if(doneOne && doneTwo){
      console.log("yes i am ready")
      if( (session?.id) && (route.params?.question) && ws.current){
        handleSendPredefinedMessage(route.params?.question)
      }
    }

  }, [doneOne, doneTwo])

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
        recorderState={recordingState}
        setRecordingState={setRecordingState}
        startRocording = {handleStartRecording}
        stopRecording={handleStopRecording}
        recordings={audio}
        setRecordings={setAudio}
        isTest={isTest}
        setIsTest={setIsTest}
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
              
              create_session(() => {
                setFeedback(res)
                setIsFeedback(false);
              })
            })
          }else{
            
            create_session(() => {
              setFeedback(res);
              setIsFeedback(false);
            })
            
          }
          
        }}
      />}
      
      {loading && <Indicator visible={loading} onClose={()=>setLoading(false)}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}
    </SafeAreaView>
  );
}