import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeeklyCalendar from '../../../components/WeeklyCalendar';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useLayoutDimention from '../../../hooks/useLayoutDimention';
import { getStyles } from './ProfileScreenStyle';
import { useAuth } from '../../../context/AuthContext';
import {get_profile_info, update_profile_info} from '../../auth/AuthAPI'
import { 
  
  get_onboarding_user_data
  
} from '../../personalization/PersonalizationAPIs';
import useStaticData from '../../../hooks/useStaticData';
import useLogout from '../../../hooks/useLogout'
import { useRoute } from '@react-navigation/native';
import Indicator from '../../../components/Indicator'


const ProfileScreen = () => {
  useLogout()
  const {
    denominations,
    bible_versions,
    tone_preference_data,
    faith_journey_reasons,
    bible_familiarity_data
  } = useStaticData()

  const {updateStore} = useAuth()

  const navigation = useNavigation()

  const {isSmall, isMedium,isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      /*
        data?.denomination_option
        data?.bible_version_option
        data.tone_preference_option
        data.journey_reason
        data.bible_familiarity_option

        const userInfo = res5?.data;
      */
      setLoading(true)
      get_onboarding_user_data((res, success) => {
        if(success){
          get_profile_info((res1, success1) => {
            if(success1){

              const userInfo = res1?.data
              const denomination = denominations.filter(item => item.id === res?.data?.denomination?.denomination_option)
              const bible_version = bible_versions.filter(item => item.id === res?.data?.bible_version?.bible_version_option)
              const tone_preference = tone_preference_data.filter(item => item.id === res?.data?.tone_preference?.tone_preference_option)
              const faith_reason = faith_journey_reasons.filter(item => item.id === res?.data?.journey_reason?.journey_reason)
              const bible_familiarity = bible_familiarity_data.filter(item => item.id === res?.data?.bible_familiarity?.bible_familiarity_option)


              const profileSettingData = {
                userInfo:userInfo || {},
                denomination: denomination[0] || {},
                bible_version: bible_version[0] || {},
                tone_preference: tone_preference[0] || {},
                faith_reason: faith_reason[0] || {},
                bible_familiarity: bible_familiarity[0] || {},
              }
              setLoading(false)
              updateStore({profileSettingData})
            }else{
              setLoading(false)
            }
          })
        }else{
          setLoading(false)
        }
      })





      
    }, [])
  





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



      {loading && <Indicator onClose={() => setLoading(false)} visible={loading}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}

    </View>
  );
};


export default ProfileScreen;