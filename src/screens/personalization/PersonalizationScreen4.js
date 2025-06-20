import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonButton from '../../components/CommonButton';
import { deepGreen, primaryText } from '../../components/Constant';
import useLayoutDimention from '../../hooks/useLayoutDimention';
import { getStyles } from './PersonalizationScreen4Style';

export default function PersonalizationScreen({navigation}) {

  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)

  return (
    <View style={styles.container}>
      
      <View>
        <View style={{}}>
          <ProgressBar progress={14.28*5} />
        </View>

        <Text style={styles.title}>How familiar are you with the Bible</Text>


        <View style={styles.imageContainer}>
            <Image 
              source={require("../../../assets/img/NoneSelector.png")}
              style={styles.img}
            />
            <Image 
              source={require("../../../assets/img/littleSelector.png")}
              style={styles.img}
            />
            <Image 
              source={require("../../../assets/img/lotSelector.png")}
              style={styles.img}
            />
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.text}>A great foundation! Let's go deeper</Text>
            <View style={{height:15}}></View>
            <Text style={styles.text}>You have some knowledge, and we'll build on it!</Text>
        </View>

        <View style={{alignItems:'center'}}>
            <Text style={styles.subtitle}>In-Depth Responses</Text>

            <Text style={styles.semitext}>Preachly's answers will include context connections, and deeper insights to enrich your understanding</Text>
        </View>



      </View>

      <CommonButton
          btnText={"Continue"}
          bgColor={deepGreen}
          navigation={navigation}
          route={"Personalization5"}
          txtColor={primaryText}
          bold='bold'
          opacity={1}
      />
    </View>
  );
}
