import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import CommonButton from '../../components/CommonButton';
import { deepGreen , primaryText} from '../../components/Constant';
import { useAuth } from '../../context/AuthContext';
import useLayoutDimention from '../../hooks/useLayoutDimention';
import { getStyles } from './FinishAuthenticationStyle';


const { width, height } = Dimensions.get('window');

const FinishAuthentication = ({ navigation }) => {

  const {login} = useAuth()
  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()

  const styles = getStyles(isSmall, isMedium, isLarge, isFold)

  return (
    <View style={styles.container}>
    
      <View style={styles.textContainer}>
        <Text style={styles.successText}>You're in!</Text>
        <Text style={styles.welcomeTitle}>Welcome to Preachly</Text>
        <Text style={styles.subtitle}>
          Let's tailor your experience to help you grow in faith and confidence.
        </Text>
      </View>
        <Image
            source={require('../../../assets/img/Preachly.png')}
            style={styles.bg_image}
        />

        <View style={styles.btnContainer}>
            <CommonButton
                btnText={"Go to personalization"}
                bgColor={deepGreen}
                navigation={navigation}
                route={""}
                handler={() => login()}
                txtColor={primaryText}
                bold='bold'
                opacity={1}
            />
        </View>
      
    </View>
  );
};


export default FinishAuthentication;