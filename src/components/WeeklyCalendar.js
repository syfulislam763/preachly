import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

const WeeklyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  // Generate 7 days starting from Sunday of current week
  const startOfWeek = dayjs().startOf('week'); // Sunday
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = startOfWeek.add(i, 'day');
    return {
      key: date.format('YYYY-MM-DD'),
      day: date.format('dd')[0], // First letter of day
      date: date.date(),
    };
  });

  const renderItem = ({ item }) => {
    const isSelected = selectedDate === item.key;
    const isToday = item.key === dayjs().format('YYYY-MM-DD');

    return (
      <TouchableOpacity
        style={styles.dayContainer}
        onPress={() => setSelectedDate(item.key)}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
          {item.day}
        </Text>
        <View
          style={[
            styles.dateCircle,
            isSelected
              ? styles.selectedDateCircle
              : isToday
              ? styles.todayDateCircle
              : styles.defaultDateCircle,
          ]}
        >
          <Text
            style={[
              styles.dateText,
              isSelected
                ? styles.selectedDateText
                : isToday
                ? styles.todayDateText
                : styles.defaultDateText,
            ]}
          >
            {item.date}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={weekDays}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ gap: 12 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    backgroundColor: '#fff',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    color: '#6B8E8E',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 4,
  },
  selectedDayText: {
    color: '#004d40',
    fontWeight: '700',
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDateCircle: {
    backgroundColor: '#004d40',
  },
  todayDateCircle: {
    borderWidth: 2,
    borderColor: '#6B8E8E',
    backgroundColor: '#fff',
  },
  defaultDateCircle: {
    backgroundColor: '#f5f8f7',
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todayDateText: {
    color: '#004d40',
    fontWeight: 'bold',
  },
  defaultDateText: {
    color: '#333',
    fontWeight: '600',
  },
});

export default WeeklyCalendar;
