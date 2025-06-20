import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // for arrows
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useLayoutDimention from '../hooks/useLayoutDimention';
import { getStyles } from './QuestionSliderStyle';

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
    question: "Hello holding you back from confidently living and sharing your faith?",
    options: [
      "I  unsure how to respond to questions or doubts about my faith",
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
  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)
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
        alignItems:'center',
        marginBottom: hp("3%")
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


