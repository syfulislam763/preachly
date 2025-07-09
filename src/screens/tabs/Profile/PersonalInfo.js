import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  Platform,
  Image,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CommonButton from '../../../components/CommonButton';
import { deepGreen, lightgreen1 } from '../../../components/Constant';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {get_profile_info, update_profile_info} from '../../auth/AuthAPI'
import { 
  get_bible_version,
  bible_version,
  get_denomination,
  denomination,
  get_tone_preference,
  tone_preference,
  get_journey_reason,
  journey_reason,
  get_bible_familiarity,
  bible_familiarity

 } from '../../personalization/PersonalizationAPIs';
 import ProfileImage from './PersonalInfoUtils/ProfileImage';
 import DropdownModal from './PersonalInfoUtils/DropdownModal';
 import useLayoutDimention from '../../../hooks/useLayoutDimention';
 import { getStyles } from './PersonalInfoUtils/PersonalInfoStyle';
 import useStaticData from '../../../hooks/useStaticData';
 import useLogout from '../../../hooks/useLogout'
import { useRoute } from '@react-navigation/native';

const PersonalInfo = () => {
  useLogout()
  const {
    denominations,
    bible_versions,
    tone_preference_data,
    faith_journey_reasons,
    bible_familiarity_data
  } = useStaticData()

  const route = useRoute()
  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)
  const navigation = useNavigation()
  const [editMode, setEditMode] = useState(false)
  
  const [modalVisible, setModalVisible] = useState(false);
  const [bibleModalVisible, setBibleModalVisible] = useState(false);
  const [toneModalVisible, setToneModalVisible] = useState(false)
  const [faithGoalVisible, setFaithGoalVisible] = useState(false)
  const [depthAnsVisible, setDepthAnsVisible] = useState(false)

  const [name, setName] = useState('Alice');
  const [dob, setDob] = useState('21.12.2001');
  const [email, setEmail] = useState('example@gmail.com');

  const [selectedBibleVersion, setSelectedBibleVersion] = useState({});
  const [selectedDenomination, setSelectedDenomination] = useState({});
  const [tone, setTone] = useState({});
  const [faithGoal, setFaithGoal] = useState({});
  const [Answer, setAnswer] = useState({});

  const handleSelect = (option) => {
    setSelectedDenomination(option);
    // setModalVisible(false);
  };

  const handleSelect1 = (option) => {
    setSelectedBibleVersion(option);
    // setBibleModalVisible(false)
  };
  const handleTone = (option) => {
    setTone(option)
  }
  const handleFaithGoal = (option) => {
    setFaithGoal(option)
  }
  const handleAnswer = (option) => {
    setAnswer(option)
  }


  useEffect(() => {
    get_denomination((res, success) => {
      if(success){
        const temp = denominations.filter(item => item.id == res.data?.denomination_option)
        setSelectedDenomination({...temp[0], is_active:true})
      }
    })
    get_bible_version((res, success) => {
      if(success){
        const temp = bible_versions.filter(item => item.id == res?.data?.bible_version_option)
        setSelectedBibleVersion({...temp[0], is_active:true})
      }else{

      }
    })
    get_tone_preference((res, success) => {
      if(success){
        const temp = tone_preference_data.filter(item => item.id === res.data.tone_preference_option)
        setTone({...temp[0], is_active:true})
      }else{

      }
    })
    get_journey_reason((res, success) => {
      if(success){
        const temp = faith_journey_reasons.filter(item => item.id === res.data.journey_reason)
        setFaithGoal({...temp[0], is_active:true})
      }else{

      }
    })
    get_bible_familiarity((res, success) => {
      if(success){
        const temp = bible_familiarity_data.filter(item => item.id === res.data.bible_familiarity_option )
        setAnswer({...temp[0], is_active:true})
      }else{

      }
    })
  }, [])

  useEffect(()=>{
    if(route.params?.editMode){
      setEditMode(true)
    }
  }, [route.params])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      enableOnAndroid={true}
      extraScrollHeight={190}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}

    >

      <ProfileImage/>

      <View style={styles.inputFieldCard}>
        <InfoRow label="Name" value={name} onChange={setName} />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <InfoRow label="Date of birth" value={dob} onChange={setDob} />
        <InfoRow label="Email" value={email} onChange={setEmail} />
      </View>

      <View style={styles.card}>
        <DropdownRow
          label="Denomination"
          value={selectedDenomination?.name}
          onPress={() => setModalVisible(editMode)}
        />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <DropdownRow
          label="Bible"
          value={selectedBibleVersion.name}
          onPress={() => setBibleModalVisible(editMode)}
        />
      </View>
      <View style={styles.card}>
        <DropdownRow
          label="Tone"
          value={tone?.name}
          onPress={() => setToneModalVisible(editMode)}
        />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <DropdownRow
          label="Faith Goal"
          value={faithGoal.name}
          onPress={() => setFaithGoalVisible(editMode)}
        />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <DropdownRow
          label="Answer Depth"
          value={Answer.name}
          onPress={() => setDepthAnsVisible(editMode)}
        />
      </View>

      <View style={{margin:20}}>
        <CommonButton
          btnText={route.params?.editMode ?"Save Info":"Edit Info"}
          bgColor={deepGreen}
          navigation={navigation}
          route={""}
          txtColor={"white"}
          handler={() => {
            if(editMode){
              navigation.goBack()
            
            }else{
              navigation.navigate("EditPersonalInfo", {editMode:true})
            }
          }}
          bold='bold'
          opacity={1}
        />
      </View>

      <DropdownModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        handleChage={handleSelect}
        options={denominations.filter(it => it.id > 0).sort((a,b) => a.id-b.id)}
        selectedItem={selectedDenomination}
      />
      <DropdownModal
        isVisible={bibleModalVisible}
        onClose={() => setBibleModalVisible(false)}
        handleChage={handleSelect1}
        options={bible_versions.filter(it => it.id > 0).sort((a,b) => a.id-b.id)}
        selectedItem={selectedBibleVersion}
      />

      <DropdownModal
        isVisible={toneModalVisible}
        onClose={() => setToneModalVisible(false)}
        handleChage={handleTone}
        options={tone_preference_data}
        selectedItem={tone}
      />
      <DropdownModal
        isVisible={faithGoalVisible}
        onClose={() => setFaithGoalVisible(false)}
        handleChage={handleFaithGoal}
        options={faith_journey_reasons}
        selectedItem={faithGoal}
      />
      <DropdownModal
        isVisible={depthAnsVisible}
        onClose={() => setDepthAnsVisible(false)}
        handleChage={handleAnswer}
        options={bible_familiarity_data}
        selectedItem={Answer}
      />
      
    </KeyboardAwareScrollView>
  );
};

const InfoRow = ({ label, value, onChange }) => (
  <View style={styles.inputFieldRow}>
    <Text style={styles.inputFieldLabel}>{label}</Text>
    <TextInput
      style={styles.inputField}
      value={value}
      onChangeText={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      textAlign="right"
      editable={true}
      returnKeyType="done"
    />
  </View>
);

const DropdownRow = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#0B172A',
    fontFamily:'NunitoBold',
    flex: 1,
  },
  valueContainer: {
    flex: 1,
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    color: '#2B4752',
    fontFamily:'NunitoBold',
    textAlign: 'right',
    
  },
 
  inputFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    
    paddingBottom: 0
  },
  inputFieldLabel: {
    fontSize: 16,
    color: '#0B172A',
    fontFamily:'NunitoBold',
    flex: 1,
  },
  inputField: {
    fontSize: 16,
    color: '#2B4752',
    fontFamily:'NunitoBold',
    flex: 1,
    padding: 8,
    textAlign: 'right',
  },
});

export default PersonalInfo;