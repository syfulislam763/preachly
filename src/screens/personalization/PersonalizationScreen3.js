import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, lightgreen1, primaryText } from '../../components/Constant';
import SelectableCard from '../../components/SelectableCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import useLayoutDimention from '../../hooks/useLayoutDimention';
import { getStyles } from './PersonalizationScreen3Style';
import { tone_preference } from './PersonalizationAPIs';
import { useNavigation } from '@react-navigation/native';
import Indicator from '../../components/Indicator';
import { isValid } from 'date-fns';

const data = [
  {
    title: 'Clear and Hopeful',
    description: `Simple, direct, and encouraging. Speaks to God’s love and faithfulness in an easily understood way.`,
    quote: `"God allows us to choose because He loves us deeply. Even in our struggles, His grace is always enough.”`,
    icon: require("../../../assets/img/24-leaf.png"),
    id: 1,
    is_active: true
  },
  {
    title: `Dynamic and Powerful`,
    description: `Emotive, bold, and filled with vivid imagery. Designed to inspire and energize`,
    quote: `“Sin may exist, but so does God’s unstoppable power to redeem, restore, and turn every story into a victory.”`,
    icon: require("../../../assets/img/24-sunset.png"),
    id: 2,
    is_active: true
  },
  {
    title: `Practical and Everyday`,
    description: `Grounded and solution-oriented, focusing on how faith applies to daily life`,
    quote: `“Sometimes life feels messy, but God uses even our mistakes to shape us and teach us how to walk in His ways.”`,
    icon: require("../../../assets/img/24-leaf.png"),
    id: 3,
    is_active: true
  },


  {
    title: `Encouraging and Purposeful`,
    description: `Focuses on meaning and growth through challenges, using affirming and positive language`,
    quote:`“It’s not always easy to understand, but God allows challenges so we can grow stronger in faith and closer to Him.”`,
    icon: require("../../../assets/img/24-leaf.png"),
    id: 5,
    is_active: true
  },
  {
    title: `Uplifting and Optimistic`,
    description: `Highlights hope and joy even in adversity, emphasizing God’s ongoing provision`,
    quote: `“Even in a broken world, God’s love shines through. His plan for good will always outweigh the pain we see now.”`,
    icon: require("../../../assets/img/24-sunset.png"),
    id: 6,
    is_active: true
  },
  {
    title: `Scholarly and Rational`,
    description: `Appeals to logic and reason, using well-structured arguments and historical/theological insights.`,
    quote: `“Sin entered through humanity’s choices, but God’s plan through Jesus shows us the depth of His justice and mercy.”`,
    icon: require("../../../assets/img/24-leaf.png"),
    id: 4,
    is_active: true
  },

  {
    title: `Warm and Relatable`,
    description: `Conversational, empathetic, and emotionally resonant. Speaks to the heart with compassion.`,
    quote: `“That’s a tough question—it’s okay to wrestle with it. What matters
most is knowing God is with you, no matter what.”`,
    icon: require("../../../assets/img/24-sunset.png"),
    id: 7,
    is_active: true
  },
  {
    title: `Passionate and Empowering`,
    description: `Focused on spiritual growth and perseverance, emphasizing strength and action`,
    quote: `“Sin doesn’t define us—God’s purpose does. You have the power to
walk boldly in the freedom He’s given you.”`,
    icon: require("../../../assets/img/24-leaf.png"),
    id: 8,
    is_active: true
  },
];

export default function PersonalizationScreen3() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [id, setId] = useState(null);
  const navigation = useNavigation();
  const {isSmall, isMedium, isLarge, isFold} =  useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const payload = {
      "tone_preference_option": id
    };
    setIsLoading(true);
    tone_preference(payload, (response, success) => {
      setIsLoading(false);
      if (success) {
        navigation.navigate("Personalization4");
      } else {
        console.error("Error submitting tone preference:", response);
      }
    });

  }


  return (
    <View style={styles.container}>

      <View>
        <View style={{}}>
          <ProgressBar progress={14.28 * 4} />
        </View>

        <Text style={styles.title}>What tone speaks to you?</Text>

        <Text style={styles.text}>
          Personalize how you receive inspired answers and insights to fit your journey
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{ padding: 0 }}
          showsVerticalScrollIndicator={false}
        >
          {data.map((item, idx) => (
            <SelectableCard
              key={idx}
              title={item.title}
              description={item.description}
              quote={item.quote}
              selected={selectedIndex === idx}
              onSelect={(index) => {
                setSelectedIndex(index);
                setId(item.id);
              }}
              index={idx}
              icon={item.icon}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <CommonButton
          btnText={"Select Tone"}
          bgColor={deepGreen}
          navigation={navigation}
          route={""}
          handler={handleSubmit}
          txtColor={primaryText}
          bold='bold'
          opacity={selectedIndex !== null ? 1 : 0.5}
          disabled={selectedIndex === null}
        />
        <Text style={styles.footerText}>
          Not sure? You can change your tone later in your profile settings
        </Text>
      </View>
      {isLoading &&  <Indicator visible={isLoading} onClose={() => setIsLoading(false)} >
        <ActivityIndicator size="large"  />
       </Indicator>}
    </View>
  );
}

