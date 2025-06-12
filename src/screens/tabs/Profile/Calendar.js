import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, Image, StyleSheet } from 'react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import ReusableNavigation from '../../../components/ReusabeNavigation';
import BackButton from '../../../components/BackButton';
import Reward from '../../../components/Reward';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomModal from '../../../components/CustomModal';
import CommonButton from '../../../components/CommonButton';
import { deepGreen, primaryText } from '../../../components/Constant';

const screenWidth = Dimensions.get('window').width;
const calendarPadding = 10;
const daySize = (screenWidth - calendarPadding * 2) / 7 - 4;

const Day = ({ day, selectedDate, currentMonth, onSelect, markedDates }) => {
  const isToday = isSameDay(day, new Date());
  const isSelected = isSameDay(day, selectedDate);
  const inCurrentMonth = isSameMonth(day, currentMonth);
  const isMarked = markedDates?.some(marked => isSameDay(marked, day));
  

  let bgColor = 'transparent';
  if (isSelected) bgColor = '#004d40';
  else if (isMarked) bgColor = '#ffe0b2';

  return (
    <TouchableOpacity
      onPress={() => onSelect(day)}
      style={{
        width: 40,
        height: 40,
        borderRadius: daySize / 2,
        backgroundColor: bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7.5,
        opacity: inCurrentMonth ? 1 : 0.4
      }}
    >
      <Text style={{ color: isSelected ? 'white' : '#3F5862', fontFamily:'NunitoSemiBold', fontSize:18 }}>{format(day, 'd')}</Text>
    </TouchableOpacity>
  );
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 2));
  const navigation = useNavigation()
  const markedDates = [new Date(2025, 0, 1), new Date(2025, 0, 15), new Date(2025, 0, 27)];

  const renderHeader = () => (
    <View style={{ width: screenWidth - calendarPadding * 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 0, paddingVertical: 25 }}>
      <Text style={{ fontSize: 32, fontFamily:'DMSerifDisplay', color:'#0B172A', marginLeft: 25  }}>{format(currentMonth, 'MMMM, yyyy')}</Text>
      <View style={{ flexDirection: 'row', marginRight:0 }}>
        <TouchableOpacity onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <Image
            source={require("../../../../assets/img/CaretLeft.png")}
            style={{height:26, width:26, objectFit:'contain', marginRight:20}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentMonth(addMonths(currentMonth, 1))} >
          <Image
            source={require("../../../../assets/img/CaretRight.png")}
            style={{height:26, width:26, objectFit:'contain'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
        {days.map((day, idx) => (
          <Text key={idx} style={{ width: 55, textAlign: 'center', fontFamily:'NunitoSemiBold',color:'#90B2B2', fontSize:14 }}>{day.toUpperCase()}</Text>
        ))}
      </View>
    );
  };

  const generateCalendar = () => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let date = start;
    while (date <= end) {
      days.push(date);
      date = addDays(date, 1);
    }
    return days;
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#fff',}}>
      <ReusableNavigation
        leftComponent={() => <BackButton navigation={navigation}/>}
        middleComponent={() => (<Text style={{
          fontFamily: 'NunitoBold',
          color: '#0b172A',
          fontSize: 18
        }}>Calendar</Text>)}
        RightComponent={() => <Reward count={2} handler={() => setModalVisible(true)}/>}
        backgroundStyle={{backgroundColor:'#fff'}}
      />

      {renderHeader()}
      {renderDaysOfWeek()}
      <View style={{height:10}}></View>
      <FlatList
        data={generateCalendar()}
        keyExtractor={(item) => item.toISOString()}
        numColumns={7}
        style={{backgroundColor:'white',maxHeight:340}}
        renderItem={({ item }) => (
          <Day
            day={item}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onSelect={setSelectedDate}
            markedDates={markedDates}
          />
        )}
        scrollEnabled={false}
        contentContainerStyle={{ alignItems: 'center', }}
      />

      <View style={{backgroundColor:'white',  paddingHorizontal:20}}>
        <Text style={{
          fontFamily:'NunitoExtraBold',
          fontSize:20,
          color:'#0B172A',
        }}>Weekly Check-In Reminder</Text>
        <Image
          source={require("../../../../assets/img/weeklyStreakBg.png")}
          style={{
            height: 170,
            width:"100%",
            objectFit:'contain',
          }}
        />
      </View>
        {modalVisible && <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          headerStyle={{paddingHorizontal:20}}
        >
          <View style={{
            alignItems:'center',
            paddingVertical: 0,
            paddingHorizontal:20
          }}>
            <View style={{marginBottom:20}}>
              <Text style={styles.title}>Your streak</Text>
              <Text style={styles.title}>is heating up!</Text>
            </View>

            <View>
              <Text style={styles.text}>You've checked in for <Text style={{fontFamily:'NunitoExtraBold'}}>2 days</Text> straight! </  Text> 
              <Text style={styles.text}>Keep the momentum going -- stay consistent, stay inspired, and unlock new titiles along the way.</Text>
            </View>

            <Image 
              source={require("../../../../assets/img/imgModal.png")}
              style={{
                height:200,
                width:200,
                objectFit:'contain',
              }}
            />
            <View style={{height:20}}></View>
            <CommonButton
              btnText={"Homepage"}
              bgColor={deepGreen}
              navigation={navigation}
              route={""}
              txtColor={primaryText}
              bold='bold'
              opacity={1}
            />
            <View style={{height:20}}></View>
            <Text style={styles.footerText}>Back</Text>
            
          </View>
        </CustomModal>}
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  title:{
    fontFamily:'DMSerifDisplay',
    fontSize:32,
    textAlign:'center',
    color:'#0B172A'
  },
  text:{
    fontFamily:'NunitoSemiBold',
    fontSize: 16,
    color:'#2B4752',
    textAlign:'center',
    paddingHorizontal: 20
  },
  footerText:{
    color: '#90B2B2',
    fontFamily:'NunitoBold',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#90B2B2'
  }
})


