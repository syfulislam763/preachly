import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, lightgreen1, primaryText } from '../../components/Constant';
import SelectableCard from '../../components/SelectableCard';
const data = [
        {
        title: 'Practical and Everyday',
        description: 'Grounded and solution-oriented, focusing on how faith applies to daily life',
        quote: 'Sometimes life feels messy, but God uses even our mistakes to shape us and teach us how to walk in His ways',
        icon: require("../../../assets/img/24-leaf.png")
        },
        {
        title: 'Practical and Logical ',
        description: 'Grounded and solution-oriented, focusing on how faith applies to daily life',
        quote: 'Sometimes life feels messy, but God uses even our mistakes to shape us and teach us how to walk in His ways',
        icon: require("../../../assets/img/24-sunset.png")
        },
        {
        title: 'Practical and Everyday',
        description: 'Grounded and solution-oriented, focusing on how faith applies to daily life',
        quote: 'Sometimes life feels messy, but God uses even our mistakes to shape us and teach us how to walk in His ways',
        icon: require("../../../assets/img/24-leaf.png")
        },
        
        
    ];
export default function PersonalizationScreen3({navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  

  return (
    <View style={styles.container}>
      
      <View>
        <View style={{}}>
          <ProgressBar progress={14.28*4} />
        </View>

        <Text style={styles.title}>What tone speaks to you?</Text>

        <Text style={styles.text}>Personalize how you receive inspired answers and insights to fit your journey</Text>



         <ScrollView contentContainerStyle={{ padding: 0 }}>
          {data.map((item, idx) => (
            <SelectableCard
              key={idx}
              title={item.title}
              description={item.description}
              quote={item.quote}
              selected={selectedIndex === idx}
              onSelect={setSelectedIndex}
              index={idx}
              icon={item.icon}
            />
          ))}
        </ScrollView>

        

       
      </View>

      <View>
          <CommonButton
            btnText={"Select Tone"}
            bgColor={deepGreen}
            navigation={navigation}
            route={"Personalization4"}
            txtColor={primaryText}
            bold='bold'
            opacity={1}
          />
          <Text style={styles.footerText}>Not sure? You can change your tone later in your profile settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#fff', justifyContent:'space-between', paddingHorizontal: 20, paddingBottom: 60, paddingTop:10},
  title: {fontFamily:'DMSerifDisplay', fontSize:30, textAlign:'center', flexWrap:'wrap', paddingTop: 35, paddingBottom: 25, paddingHorizontal: 15, color:'#0B172'},
  text: {fontFamily:'NunitoSemiBold', fontSize:18, color: '#2B4752', textAlign:'center', flexWrap:'wrap', paddingBottom: 50, paddingHorizontal: 0},
  footerText:{color: "#90B2B2", fontFamily:'NunitoSemiBold', fontSize:16, paddingVertical:10, paddingHorizontal: 30, textAlign:'center'}
})