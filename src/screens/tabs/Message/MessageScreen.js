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
  Pressable
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
// import { TextInput } from 'react-native-gesture-handler';

export default function MessageScreen({ navigation }) {
  useLogout();
  const flatListRef = useRef(null);
  ///
  const {store, updateStore} = useAuth();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("")
  const [prevMsg, setPrevMsg] = useState("")
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);


  const create_session = () =>{
    setLoading(true);
    get_session_id((res,success)=>{
      if(success){
        setSession(res?.data);
        setMessage("");
        setMessages([])
        setPrevMsg("");
        updateStore({ session: res?.data})
      }else{
        console.log("ss->", JSON.stringify(res.response.config, null, 2));
        console.log("code ->", res.status)
      }
      
      setLoading(false);
    })
  }
  //console.log("***", JSON.stringify(store, null, 2))

  useEffect(() =>{
    
    if(store?.session?.id){
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
  const predefinedMessage = (message)=>{
    setMessage(message);
  }
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
    }catch(e){
      console.log("share error ", e);
    }
    console.log("share...");
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
    console.log("regenerate...");
  }


  const ws = useRef(null);
  useEffect(() =>{
    if(!session.id)return;

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

  }, [messages, session]);

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
    }else{
      console.log("problem..");
    }
    
  }

 

  useFocusEffect(
    useCallback(() =>{
      return () =>{
        console.log("disconnecting")
        ws.current?.close();
      }
    }, [])
  )
  // console.log("msg = ", JSON.stringify(messages, null, 2))
  // console.log("session->", JSON.stringify(session, null, 2))
  // Auto-scroll when new message is added
  useEffect(() => {
    if (flatListRef.current) {
     // flatListRef.current.scrollToEnd({ animated: true });
    }

  }, [messages]);

  const handleSendMessage = (newMessage) => {
    console.log("message", newMessage);
    sendMessage()
    // setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: 'white' }}>
      <ReusableNavigation
        leftComponent={() => <BackButton navigation={navigation} />}
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
              onPress={() => create_session()}
            >
              <Image
                source={require('../../../../assets/img/newChat.png')}
                style={{ height: 25, width: 25, resizeMode: 'contain' }}
              />
            </Pressable>
          </View>
        )}
        backgroundStyle={{ backgroundColor: '#fff' }}
      />
      {/* <Feedback
        visible={true}
        onClose={() => {}}
      /> */}
      {/* <RatingMessage
        visible={true}
        onClose={() => {}}
      /> */}
      {/* <LostConnection/> */}

      <MessageWrapper 
        messages={messages}
        flatListRef={flatListRef}
        handleSendMessage={handleSendMessage}
        onChange={(text) => setMessage(text)}
        message={message}
        methods = {{
          handleBookmark,
          handleCopy,
          handleRegenerate,
          handleShare
        }}
      />
      
      {loading && <Indicator visible={loading} onClose={()=>setLoading(false)}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}
    </SafeAreaView>
  );
}


const MessageWrapper = ({flatListRef, messages,onChange, handleSendMessage, message, methods}) => {
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
              paddingBottom: 100, // leave space for input
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            
          />

          {/* Pass handler to ChatInput for sending */}
          {/* <ChatInput onSendMessage={handleSendMessage} /> */}
          {messages.length<=0 && <View style={{
            // height: 200,
            width:"100%",
            backgroundColor:'#fff',
            padding:20,
            alignItems: 'center',
            // shadowColor: '#000',
            // shadowOffset: { width: 0, height: 3 },
            // shadowOpacity: 1,
            // elevation: 5, 
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
          </View>}
          <View style={styles.inputContainer}>
              {/* <Image
                source={require("../../../../assets/img/24-addfile.png")}
                style={styles.inputIcon}
              /> */}
              <TextInput
                style={styles.inputField}
                multiline={true}
                numberOfLines={2}
                value={message}
                onChangeText={e=>onChange(e)}
                placeholder={"what's on your heart? Ask anything - lets find and inspired answer.."}
                placeholderTextColor={'#607373'}
              />
              
              <Pressable 
                onPress={()=>console.log("recording")}
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
          </View>
        </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
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