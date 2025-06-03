import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

const Day = ({ day, selectedDate, currentMonth, onSelect, markedDates, daySize }) => {
  const isToday = isSameDay(day, new Date());
  const isSelected = isSameDay(day, selectedDate);
  const inCurrentMonth = isSameMonth(day, currentMonth);
  const isMarked = markedDates?.some(marked => isSameDay(marked, day));

  let bgColor = 'white';
  if (isSelected) bgColor = '#004d40';
  else if (isToday) bgColor = '#e0f7fa';
  else if (isMarked) bgColor = '#ffe0b2';

  return (
    <TouchableOpacity
      onPress={() => onSelect(day)}
      style={{
        width: daySize,
        height: daySize,
        borderRadius: daySize / 2,
        // backgroundColor: '#e0f7fa',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        // opacity: inCurrentMonth ? 1 : 0.4
        opacity:1
      }}
    >
      <Text style={ isSelected? {
       
        backgroundColor: '#e0f7fa',
        width: daySize,
        height: daySize,
        borderRadius: daySize / 2,
        // backgroundColor: '#e0f7fa',
        justifyContent: 'center',
        alignItems: 'center',
     
      }: { color: 'black' }}>{format(day, 'd')}</Text>
    </TouchableOpacity>
  );
};

const Calendar = ({ width = "100%", height = '100%', daySize = 50 }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0));
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 2));

  // Example of marked dates
  const markedDates = [new Date(2025, 0, 1), new Date(2025, 0, 15), new Date(2025, 0, 27)];

  const renderHeader = () => (
    <View style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{format(currentMonth, 'MMMM, yyyy')}</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setCurrentMonth(subMonths(currentMonth, 1))} style={{ marginHorizontal: 5 }}>
          <Text style={{ fontSize: 18 }}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentMonth(addMonths(currentMonth, 1))} style={{ marginHorizontal: 5 }}>
          <Text style={{ fontSize: 18 }}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', width: width, alignSelf: 'center' }}>
        {days.map((day, idx) => (
          <Text key={idx} style={{ width: daySize, textAlign: 'center', fontFamily:'NunitoSemiBold',fontSize:14, color:'#90B2B2' }}>{day.toUpperCase()}</Text>
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

  return (
    <View style={{ width, height, padding: 10, backgroundColor:'#fff' }}>
      {renderHeader()}
      {renderDaysOfWeek()}
      <FlatList
        data={generateCalendar()}
        keyExtractor={(item) => item.toISOString()}
        numColumns={7}
        renderItem={({ item }) => (
          <Day
            day={item}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onSelect={setSelectedDate}
            markedDates={markedDates}
            daySize={daySize}
          />
        )}
        scrollEnabled={false}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};

export default Calendar;
