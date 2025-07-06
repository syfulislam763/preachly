import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import CustomSelect from '../../components/CustomSelect';
import SelectableCard from '../../components/SelectableCard';
import QuestionSlider from '../../components/QuestionSlider';
import { onboarding_options } from './PersonalizationAPIs';
import Indicator from '../../components/Indicator';
import { denomination } from './PersonalizationAPIs';
import { useNavigation } from '@react-navigation/native';
const denominations = [
   {
        "id": 0,
        "name": "None",
        "is_active": true
    },
    {
        "id": 11,
        "name": "Other",
        "is_active": true
    },
    {
        "id": 10,
        "name": "Orthodox",
        "is_active": true
    },
    {
        "id": 9,
        "name": "Adventist",
        "is_active": true
    },
    {
        "id": 8,
        "name": "Evangelical",
        "is_active": true
    },
    {
        "id": 7,
        "name": "Lutheran",
        "is_active": true
    },
    {
        "id": 6,
        "name": "Pentecostal",
        "is_active": true
    },
    {
        "id": 5,
        "name": "Methodist",
        "is_active": true
    },
    {
        "id": 4,
        "name": "Nondenominational",
        "is_active": true
    },
    {
        "id": 3,
        "name": "Baptist",
        "is_active": true
    },
    {
        "id": 2,
        "name": "Protestant",
        "is_active": true
    },
    {
        "id": 1,
        "name": "Catholic",
        "is_active": true
    }
]

export default function PersonalizationScreen1() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const handleDenomination = () => {
        setLoading(true);
        const payload = {
            "denomination_option": selectedItem.id
        }
        denomination(payload, (data, success) => {
            setLoading(false);
            if (success) {
                console.log("Denomination saved successfully", data);
                navigation.navigate("Personalization2");
            } else {
                console.error("Error saving denomination", data);
            }
        });
     
    }

  return (
    <View style={styles.container}>
      
      <View style={{}}>
        <ProgressBar progress={14.28*2}/>
        
        <Text style={styles.title}>Select your denomination</Text>

        <CustomSelect
          items={denominations}
          placeholder='Select Denomination'
          onSelect={(item) => {
            setSelectedItem(item)
          }}
        />

      </View>

      <View style={{paddingBottom:45}}>
        <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={""}
          txtColor={primaryText}
          bold='bold'
          handler={handleDenomination}
          opacity={selectedItem === null ? 0.5 : 1}
          disabled={selectedItem === null}
      />
      </View>
      {loading && <Indicator visible={loading} onClose={() => setLoading(false)}>
        <ActivityIndicator size="large" />
      </Indicator>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1,backgroundColor:'#fff',justifyContent:'space-between', padding:10},
  title: {fontFamily:'DMSerifDisplay', fontSize:32, padding: 42, textAlign:'center', color:'#0B172A', lineHeight:35},
 
})