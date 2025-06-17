import React, { useState } from 'react';
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


const denominationOptions = [
  'Catholic',
  'Protestant',
  'Baptist',
  'Nondenominational',
  'Methodist',
];

const bibleVersion = [
  'Revised Standard Version Catholic Edition [RSVCE]',
  'New International Version (NIV)',
  'Christian Standard Bible (CSB)'
];

const PersonalInfo = () => {
  const navigation = useNavigation()
  const [selectedDenomination, setSelectedDenomination] = useState('Catholic');
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedBibleVersion, setSelectedBibleVersion] = useState('Revised Standard Version Catholic Edition [RSVCE]');
  const [bibleModalVisible, setBibleModalVisible] = useState(false);



  const [name, setName] = useState('Alice');
  const [dob, setDob] = useState('21.12.2001');
  const [email, setEmail] = useState('example@gmail.com');









  const [tone, setTone] = useState('Clear and Hopeful');
  const [faithGoal, setFaithGoal] = useState('Confidence to share my beliefs');
  const [Answer, setAnswer] = useState('In-Depth answers');








  const handleSelect = (option) => {
    setSelectedDenomination(option);
    // setModalVisible(false);


  };

  const handleSelect1 = (option) => {
    setSelectedBibleVersion(option);
    // setBibleModalVisible(false);












  };





  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollContainer}
      enableOnAndroid={true}
      extraScrollHeight={190}
      keyboardShouldPersistTaps="handled"

    >

      <View style={{
        alignItems:'center',
        paddingVertical:20
      }}>
        <Image 
          source={require("../../../../assets/img/avatar.png")}
          style={{
            height:110,
            width:110,
            objectFit:'contain'
          }}
        />
        <View style={{
          flexDirection:'row',
          alignItems:'center',
          marginTop:20,
          marginBottom: 15
        }}>
          <Text style={{
            fontFamily:'NunitoSemiBold',
            fontSize:16,
            color:'#996F44',
            marginRight:10
          }}>Change photo</Text>
          <Image
            source={require("../../../../assets/img/PencilSimple.png")}
            style={{
              height:16,
              width:16,
              objectFit: 'contain'
            }}
          />















        </View>
      </View>

      <View style={styles.inputFieldCard}>
        <InfoRow label="Name" value={name} onChange={setName} />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <InfoRow label="Date of birth" value={dob} onChange={setDob} />
        <InfoRow label="Email" value={email} onChange={setEmail} />
      </View>

      <View style={styles.card}>
        <DropdownRow
          label="Denomination"
          value={selectedDenomination}
          onPress={() => setModalVisible(true)}
        />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <DropdownRow
          label="Bible"
          value={selectedBibleVersion}
          onPress={() => setBibleModalVisible(true)}
        />
      </View>

      <View style={styles.inputFieldCard}>
        <InfoRow label="Tone" value={tone} onChange={setTone} />
        <View style={{height:1, backgroundColor:'#dce3e4'}}/>
        <InfoRow label="Faith Goal" value={faithGoal} onChange={setFaithGoal} />
        <InfoRow label="Answer depth" value={Answer} onChange={setAnswer} />
      </View>

      <View style={{margin:20}}>
        <CommonButton
          btnText={"Edit Info"}
          bgColor={deepGreen}
          navigation={navigation}
          route={""}
          txtColor={"white"}
          handler={() => {}}
          bold='bold'
          opacity={1}
        />
      </View>

      <DorpdownModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        handleChage={handleSelect}
        options={denominationOptions}
        selectedItem={selectedDenomination}
      />
      <DorpdownModal
        isVisible={bibleModalVisible}
        onClose={() => setBibleModalVisible(false)}
        handleChage={handleSelect1}
        options={bibleVersion}
        selectedItem={selectedBibleVersion}
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

const DorpdownModal = ({ isVisible, onClose, handleChage, options, selectedItem }) => (
  <Modal
    visible={isVisible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <FlatList
          data={options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => handleChage(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
              <View style={[
                styles.radioCircle,
                selectedItem === item && styles.radioSelected,
              ]} />
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={styles.selectBtn}
          onPress={onClose}
        >
          <Text style={styles.selectBtnText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
    backgroundColor:'#fff'
  },
  card: {
    backgroundColor: '#edf4f5',
    paddingVertical:6,
    paddingHorizontal:20,
    borderRadius: 12,
    marginHorizontal:20,
    marginVertical:15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    // borderBottomWidth: 1,
    // borderColor: '#dce3e4',

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
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'flex-end',

  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',


    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {

    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#639aa9',
    marginLeft: 10,
  },
  radioSelected: {
    backgroundColor: '#639aa9',
  },
  selectBtn: {
    backgroundColor: '#96b8b9',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 12,
  },
  selectBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  inputFieldCard: {
    backgroundColor: '#f0f6f7',
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal:20,
    elevation: 0,
  },
  inputFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    
    paddingBottom: 5,
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