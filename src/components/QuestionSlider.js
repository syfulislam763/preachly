import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // for arrows

const questions = [
  {
    id: '1',
    question: "What’s holding you back from confidently living and sharing your faith?",
    options: [
      "I feel unsure how to respond to questions or doubts about my faith",
      "I struggle to find the right words to share scripture effectively",
      "I feel I need a deeper connection to God’s word before I can inspire others",
    ],
  },
   {
    id: '2',
    question: "What’s holding you back from confidently living and sharing your faith?",
    options: [
      "I feel unsure how to respond to questions or doubts about my faith",
      "I struggle to find the right words to share scripture effectively",
      "I feel I need a deeper connection to God’s word before I can inspire others",
    ],
  },
   {
    id: '3',
    question: "What’s holding you back from confidently living and sharing your faith?",
    options: [
      "I feel unsure how to respond to questions or doubts about my faith",
      "I struggle to find the right words to share scripture effectively",
      "I feel I need a deeper connection to God’s word before I can inspire others",
    ],
  },
  // Add more questions here
];

export default function QuestionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelect = (index) => {
    setSelectedOptions((prev) => ({ ...prev, [currentIndex]: index }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderRadio = (option, index) => {
    const isSelected = selectedOptions[currentIndex] === index;
    return (
      <TouchableOpacity
        key={index}
        style={styles.radioRow}
        onPress={() => handleSelect(index)}
      >
        <View style={styles.radioOuter}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{questions[currentIndex].question}</Text>
      </View>

      {questions[currentIndex].options.map(renderRadio)}

      <View style={{
        alignItems:'center'
      }}>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={goPrev} disabled={currentIndex === 0}>
            <AntDesign name="left" size={24} color={currentIndex === 0 ? '#d3e0dd' : '#a1b7b2'} />
          </TouchableOpacity>

          <View style={styles.dots}>
            {questions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity onPress={goNext} disabled={currentIndex === questions.length - 1}>
            <AntDesign name="right" size={24} color={currentIndex === questions.length - 1 ? '#d3e0dd' : '#a1b7b2'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  questionBox: {
    backgroundColor: '#fff4dd',
    padding: 15,
    borderRadius: 20,
    marginBottom: 25,
  },
  questionText: {
    fontSize: 17,
    fontFamily:'NunitoBold',
    color: '#0B172A',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioOuter: {
    height: 28,
    width: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#0b5c53',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    height: 19,
    width: 19,
    borderRadius: 50,
    backgroundColor: '#0b5c53',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#0B172A',
    fontFamily:'NunitoSemiBold'
  },
  navigation: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%'
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#c2d8d5',
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#0b5c53',
  },
});
