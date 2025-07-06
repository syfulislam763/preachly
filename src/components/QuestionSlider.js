import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // for arrows
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useLayoutDimention from '../hooks/useLayoutDimention';
import { getStyles } from './QuestionSliderStyle';


const faith_goal_questions = [
      {
        "id": 3,
        "question": "What would help you feel more equipped to achieve your faith goals?",
        "is_active": true,
        "options": [
            {
                "id": 3,
                "option": "Clear and inspired guidance rooted in scripture.",
                "is_active": true
            },
            {
                "id": 2,
                "option": "Daily scripture insights that I can share with others or reflect on.",
                "is_active": true
            },
            {
                "id": 1,
                "option": "Practical tools to respond to objections and questions about faith.",
                "is_active": true
            }
        ]
      },
      {
        "id": 2,
        "question": "How do you hope to grow in your walk with God?",
        "is_active": true,
        "options": [
            {
                "id": 6,
                "option": "I want to inspire and encourage others through my faith journey.",
                "is_active": true
            },
            {
                "id": 5,
                "option": "I want to strengthen my understanding of scripture and apply it to my life.",
                "is_active": true
            },
            {
                "id": 4,
                "option": "I want to learn how to speak about my faith with confidence and clarity.",
                "is_active": true
            }
        ]
      },
      {
        "id": 1,
        "question": "What’s holding you back from confidently living and sharing your faith?",
        "is_active": true,
        "options": [
            {
                "id": 9,
                "option": "I feel I need a deeper connection to God’s word before I can inspire others.",
                "is_active": true
            },
            {
                "id": 8,
                "option": "I struggle to find the right words to share scripture effectively.",
                "is_active": true
            },
            {
                "id": 7,
                "option": "I feel unsure how to respond to questions or doubts about my faith.",
                "is_active": true
            }
        ]
      }
  ]


export default function QuestionSlider({savedOptions, setSavedOptions}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)
  const handleSelect = (option) => {
    setSelectedOptions((prev) => [...prev, option]);
    
    setSavedOptions((prev) => [...prev, option.id]);
  };

  const goNext = () => {
    if (currentIndex < faith_goal_questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderRadio = (option, index) => {
    const isSelected = savedOptions.includes(option.id);
    return (
      <TouchableOpacity
        key={index}
        style={styles.radioRow}
        onPress={() => handleSelect(option)}
      >
        <View style={styles.radioOuter}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.optionText}>{option.option}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{faith_goal_questions[currentIndex].question}</Text>
      </View>

      {faith_goal_questions.sort((a, b) => a.id - b.id)[currentIndex].options.map(renderRadio)}

      <View style={{
        alignItems:'center',
        marginBottom: hp("3%")
      }}>
        <View style={styles.navigation}>
          <TouchableOpacity onPress={goPrev} disabled={currentIndex === 0}>
            <AntDesign name="left" size={24} color={currentIndex === 0 ? '#d3e0dd' : '#a1b7b2'} />
          </TouchableOpacity>

          <View style={styles.dots}>
            {faith_goal_questions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity onPress={goNext} disabled={currentIndex === faith_goal_questions.length - 1}>
            <AntDesign name="right" size={24} color={currentIndex === faith_goal_questions.length - 1 ? '#d3e0dd' : '#a1b7b2'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


