import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeeklyCalendar from '../../../components/WeeklyCalendar';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useLayoutDimention from '../../../hooks/useLayoutDimention';
import { getStyles } from './ProfileScreenStyle';




const window = Dimensions.get("window")

const ProfileScreen = () => {

  const navigation = useNavigation()

  const {isSmall, isMedium,isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={styles.headerContainer}>
          <Image
            source={require("../../../../assets/img/profileBackground.png")}
            style={styles.bgImage}
          />

          <View style={styles.profileContainer}>
            <Image 
              source={require("../../../../assets/img/userProfile.png")}
              style={styles.profileImage}
            />
            <Text style={styles.profileText}>Alice Fox</Text>
          </View>

          <View style={styles.iconContainer}>
            <Pressable 
              onPress={() => navigation.navigate("ProfileNotification")}
            >
              <Image 
                source={require("../../../../assets/img/BellSimple.png")}
                style={styles.icon}
              />
            </Pressable>
             <Pressable
              onPress={() => navigation.navigate("SettingHome")}
             >
                <Image 
                  source={require("../../../../assets/img/settingIcon.png")}
                  style={styles.icon}
                />
             </Pressable>
          </View>

      </View>

      <View style={styles.semiContainer}>
        <WeeklyCalendar/>

        <View style={styles.caption}>
      
          <Image 
              source={require("../../../../assets/img/Fire.png")}
              style={{paddingHorizontal:10}}
          />

          <Text style={{...styles.semitext, fontSize:14}}>
            You're on <Text style={{color:'#2B4752', fontFamily:'NunitoBold'}}>Day 2</Text> of growing your faith confidence!
          </Text>

        </View>

        <View style={{height:hp("1%")}}/>

        <Image
            source={require("../../../../assets/img/rooted.png")}
            style={styles.img}
        />
        <View style={{height:hp("1%")}}/>
        <Pressable 
          onPress={() => navigation.navigate("Calendar")}
        >
          <View style={styles.weeklyCheckIn}>
            <Text style={styles.menuText}>Calendar</Text>
            <Image
                source={require("../../../../assets/img/CaretRight.png")}
                style={styles.caretRight}
            />
          </View>
        </Pressable>
        <View style={{height:hp("1.5%")}}/>

        <Pressable
          onPress={() => navigation.navigate("WeeklyCheckIn")}
        >
          <View style={styles.weeklyCheckIn}>
            <View>
                <Text style={styles.menuText}>Weekly Check-In</Text>
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>Completed</Text>
                  <Image 
                    source={require("../../../../assets/img/Check.png")}
                    style={styles.caretRight}
                  />
                </View>
            </View>
            <Image
                source={require("../../../../assets/img/CaretRight.png")}
                style={styles.caretRight}
            />
          </View>
        </Pressable>

        <View style={{height:hp("1.5%")}}/>
        
        <Pressable 
          onPress={() => navigation.navigate("CurrentGoals")}
        >
          <View style={styles.weeklyCheckIn}>
            <Text style={styles.menuText}>Your Current Goals</Text>
            <Image
                source={require("../../../../assets/img/CaretRight.png")}
                style={styles.caretRight}
            />
          </View>
        </Pressable>


      </View>





    </View>
  );
};


export default ProfileScreen;