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
  ActivityIndicator,
  Keyboard
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CommonButton from '../../../components/CommonButton';
import { deepGreen, lightgreen1 } from '../../../components/Constant';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {get_profile_info, update_profile_info} from '../../auth/AuthAPI'
import { 
  post_onboarding_user_data
 } from '../../personalization/PersonalizationAPIs';
 import ProfileImage from './PersonalInfoUtils/ProfileImage';
 import DropdownModal from './PersonalInfoUtils/DropdownModal';
 import useLayoutDimention from '../../../hooks/useLayoutDimention';
 import { getStyles } from './PersonalInfoUtils/PersonalInfoStyle';
 import useStaticData from '../../../hooks/useStaticData';
 import useLogout from '../../../hooks/useLogout'
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import Indicator from '../../../components/Indicator';


const PersonalInfo = () => {
  useLogout()
  const {
    denominations,
    bible_versions,
    tone_preference_data,
    faith_journey_reasons,
    bible_familiarity_data
  } = useStaticData()
  const {store, updateStore} = useAuth()
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
  const [img, setImg] = useState(null);
  const [imageData, setImageData] = useState({})

  const [selectedBibleVersion, setSelectedBibleVersion] = useState({});
  const [selectedDenomination, setSelectedDenomination] = useState({});
  const [tone, setTone] = useState({});
  const [faithGoal, setFaithGoal] = useState({});
  const [Answer, setAnswer] = useState({});
  const [loading, setLoading] = useState(false)

  const handleSelect = (option) => {
    Keyboard.dismiss();
    setSelectedDenomination(option);
    // setModalVisible(false);
  };

  const handleSelect1 = (option) => {
    Keyboard.dismiss();
    setSelectedBibleVersion(option);
    // setBibleModalVisible(false)
  };
  const handleTone = (option) => {
    Keyboard.dismiss();
    setTone(option)
  }
  const handleFaithGoal = (option) => {
    Keyboard.dismiss();
    setFaithGoal(option)
  }
  const handleAnswer = (option) => {
    Keyboard.dismiss();
    setAnswer(option)
  }


  const handleSaveUserInfo = () => {
    //navigation.goBack()
    const payload  = {
      journey_reason: {
        "journey_reason": faithGoal?.id
      },
      denomination: {
        "denomination_option": selectedDenomination?.id
      },
      tone_preference: {
        "tone_preference_option": tone?.id
      },
      bible_familiarity: {
        "bible_familiarity_option": Answer?.id
      },
      bible_version: {
        "bible_version_option": selectedBibleVersion?.id
      }
    }
    const oldEmail = store?.profileSettingData?.userInfo?.email;
    const oldDOB = store?.profileSettingData?.userInfo?.date_of_birth;
    const oldName = store?.profileSettingData?.userInfo?.name;
    const oldImage = store?.profileSettingData.userInfo?.profile_picture;

    const profileInfo_payload = new FormData();

    if(oldEmail != email)
      profileInfo_payload.append("email", email);

    if(oldDOB != dob)
      profileInfo_payload.append("date_of_birth", dob);

    if(oldName != name)
      profileInfo_payload.append("name", name);
    
    if(oldImage != img)
      profileInfo_payload.append("profile_picture", {
        uri: imageData?.uri,
        name: imageData?.fileName,
        type: imageData?.mimeType
      })
    

    // const profileInfo_payload = {
    //   email: email,
    //   name: name,
    // }

    console.log("profile info->", profileInfo_payload)
    console.log("onboarding -> ", payload)

    // return 0;
 
    setLoading(true)
    post_onboarding_user_data(payload, (res, success) => {
      if(success){
        update_profile_info(profileInfo_payload, (response, isOk) => {
          if(isOk){            
            const profileSettingData = {
              userInfo:{...response?.data} || {},
              denomination: selectedDenomination || {},
              bible_version: selectedBibleVersion || {},
              tone_preference: tone || {},
              faith_reason: faithGoal || {},
              bible_familiarity: Answer || {},
            }
            const oldEmail = store?.profileSettingData?.userInfo?.email
            setLoading(false)

            if(oldEmail != email){
              profileSettingData['userInfo'] = {...response?.data?.profile, email: response?.data?.temp_email}
              
              navigation.navigate("ConfirmEmail", {email: email, change:true, profileSettingData})
            }else{
              console.log("----", profileSettingData.userInfo.profile_picture)
              updateStore({profileSettingData})
              navigation.goBack()
            }

          }else{
            console.log(profileInfo_payload)
            console.log("update profile -> ",response.message)
            setLoading(false)
          }
        })
      }else{
        console.log("update onboarding -> ", res)
        setLoading(false)
      }
    })
     


  }


  useEffect(() => {
    setName(store?.profileSettingData?.userInfo?.name)
    setDob(store?.profileSettingData?.userInfo?.date_of_birth)
    setEmail(store?.profileSettingData?.userInfo?.email)
    setImg(store?.profileSettingData?.userInfo?.profile_picture)
    setSelectedDenomination(store?.profileSettingData?.denomination)
    setSelectedBibleVersion(store?.profileSettingData?.bible_version)
    setTone(store?.profileSettingData?.tone_preference)
    setFaithGoal(store?.profileSettingData?.faith_reason)
    setAnswer(store?.profileSettingData?.bible_familiarity)
    
  }, [store, route.params])

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

      <ProfileImage
          onChange={(image) => {
            setImg(image.uri)
            setImageData(image)
          }}
          disabled={!editMode}
          uri={img}
      />

      <View style={styles.inputFieldCard}>
        <InfoRow label="Name" value={name} onChange={setName} isEditable={editMode} />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <InfoRow isDate={true} isEditable={editMode} label="Date of birth" value={dob} onChange={setDob} />
        <InfoRow isEditable={editMode} label="Email" value={email} onChange={setEmail} />
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
          value={selectedBibleVersion?.name}
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
          value={faithGoal?.name}
          onPress={() => setFaithGoalVisible(editMode)}
        />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <DropdownRow
          label="Answer Depth"
          value={Answer?.name}
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

              handleSaveUserInfo()
            
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
      
      {loading && <Indicator visible={loading} onClose={() => setLoading(false)}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}
    </KeyboardAwareScrollView>
  );
};

const InfoRow = ({ label, value, onChange, isEditable=true,isDate=false}) => (
  <View style={styles.inputFieldRow}>
    <Text style={styles.inputFieldLabel}>{label}</Text>
    <TextInput
      style={styles.inputField}
      value={value}
      keyboardType={isDate?'numeric':'default'}
      onChangeText={onChange}
      placeholder={isDate?"dd.month.year":`Enter ${label.toLowerCase()}`}
      textAlign="right"
      editable={isEditable}
      returnKeyType="done"
    />
  </View>
);

const DropdownRow = ({ label, value, onPress }) => (
  <TouchableOpacity style={styles.row} onPress={() => {
    onPress();
    Keyboard.dismiss();
  }}>
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