import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, lightgreen1, primaryText } from '../../components/Constant';
import SelectableCard from '../../components/SelectableCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const data = [
  {
    title: 'Clear and Hopeful',
    description: `Simple, direct, and encouraging. Speaks to God’s love and faithfulness in an easily understood way.`,
    quote: `"God allows us to choose because He loves us deeply. Even in our struggles, His grace is always enough.”`,
    icon: require("../../../assets/img/24-leaf.png")
  },
  {
    title: `Dynamic and Powerful`,
    description: `Emotive, bold, and filled with vivid imagery. Designed to inspire and energize`,
    quote: `“Sin may exist, but so does God’s unstoppable power to redeem, restore, and turn every story into a victory.”`,
    icon: require("../../../assets/img/24-sunset.png")
  },
  {
    title: `Practical and Everyday`,
    description: `Grounded and solution-oriented, focusing on how faith applies to daily life`,
    quote: `“Sometimes life feels messy, but God uses even our mistakes to shape us and teach us how to walk in His ways.”`,
    icon: require("../../../assets/img/24-leaf.png")
  },


  {
    title: `Encouraging and Purposeful`,
    description: `Focuses on meaning and growth through challenges, using affirming and positive language`,
    quote:`“It’s not always easy to understand, but God allows challenges so we can grow stronger in faith and closer to Him.”`,
    icon: require("../../../assets/img/24-leaf.png")
  },
  {
    title: `Uplifting and Optimistic`,
    description: `Highlights hope and joy even in adversity, emphasizing God’s ongoing provision`,
    quote: `“Even in a broken world, God’s love shines through. His plan for good will always outweigh the pain we see now.”`,
    icon: require("../../../assets/img/24-sunset.png")
  },
  {
    title: `Scholarly and Rational`,
    description: `Appeals to logic and reason, using well-structured arguments and historical/theological insights.`,
    quote: `“Sin entered through humanity’s choices, but God’s plan through Jesus shows us the depth of His justice and mercy.”`,
    icon: require("../../../assets/img/24-leaf.png")
  },

  {
    title: `Warm and Relatable`,
    description: `Conversational, empathetic, and emotionally resonant. Speaks to the heart with compassion.`,
    quote: `“That’s a tough question—it’s okay to wrestle with it. What matters
most is knowing God is with you, no matter what.”`,
    icon: require("../../../assets/img/24-sunset.png")
  },
  {
    title: `Passionate and Empowering`,
    description: `Focused on spiritual growth and perseverance, emphasizing strength and action`,
    quote: `“Sin doesn’t define us—God’s purpose does. You have the power to
walk boldly in the freedom He’s given you.”`,
    icon: require("../../../assets/img/24-leaf.png")
  },
];

export default function PersonalizationScreen3({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

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
              onSelect={setSelectedIndex}
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
          route={"Personalization4"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
        />
        <Text style={styles.footerText}>
          Not sure? You can change your tone later in your profile settings
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: hp("2%"),
    paddingTop: hp('1%')
  },
  title: {
    fontFamily: 'DMSerifDisplay',
    fontSize: 30,
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingTop: 35,
    paddingBottom: 25,
    paddingHorizontal: 0,
    color: '#0B172'
  },
  text: {
    fontFamily: 'NunitoSemiBold',
    fontSize: 18,
    color: '#2B4752',
    textAlign: 'center',
    flexWrap: 'wrap',
    paddingBottom: hp("3%"),
    paddingHorizontal: 0
  },
  footerText: {
    color: "#90B2B2",
    fontFamily: 'NunitoSemiBold',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'center'
  }
});
