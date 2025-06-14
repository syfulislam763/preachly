import React, { useRef, useState, useEffect } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReusableNavigation from '../../../components/ReusabeNavigation';
import BackButton from '../../../components/BackButton';
import Conversations from './Conversations';
import ChatInput from './ChatInput';

export default function MessageScreen({ navigation }) {
  const flatListRef = useRef(null);

  const [messages, setMessages] = useState([
    { id: '1', type: 'user', message: 'I don’t believe in God' },
    {
      id: '2',
      type: 'bot',
      verseLink: 'Psalm 14:7',
      onYes: () => console.log('Yes clicked'),
      onNo: () => console.log('No clicked'),
    },
  ]);

  // Auto-scroll when new message is added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
            <Image
              source={require('../../../../assets/img/newChat.png')}
              style={{ height: 25, width: 25, resizeMode: 'contain' }}
            />
          </View>
        )}
        backgroundStyle={{ backgroundColor: '#fff' }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Conversations
                  type={item.type}
                  message={item.message}
                  verseLink={item.verseLink}
                  onYes={item.onYes}
                  onNo={item.onNo}
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
            <ChatInput onSendMessage={handleSendMessage} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
