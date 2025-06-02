import {View, Text, TouchableOpacity} from 'react-native'

export default function MessageScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 18 }}>← Back</Text>
        </TouchableOpacity>
      </View>
      {/* Your chat UI goes here */}
      <Text style={{ padding: 20 }}>Messages</Text>
    </View>
  );
}
