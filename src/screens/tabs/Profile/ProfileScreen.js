import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions, ActivityIndicator, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeeklyCalendar from '../../../components/WeeklyCalendar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useLayoutDimention from '../../../hooks/useLayoutDimention';
import { getStyles } from './ProfileScreenStyle';
import { useAuth } from '../../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import useStaticData from '../../../hooks/useStaticData';
import useLogout from '../../../hooks/useLogout'
import { useRoute } from '@react-navigation/native';
import Indicator from '../../../components/Indicator';
import { get_profile_dashboard_data } from '../TabsAPI';
import dayjs from 'dayjs';


const ProfileScreen = () => {
  useLogout()
  const route = useRoute();
  
  const {updateStore, store} = useAuth()

  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({})

  const {isSmall, isMedium,isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold);
  const [loading, setLoading] = useState(false)
  const [uri, setUri] = useState(null);

  
  const startOfWeek = dayjs().startOf('week'); // Sunday
  const [weekDays, setWeekDays] = useState([])
  
  useEffect(() => {
   
    if(route.params?.flag){
      
      navigation.navigate("Calendar")
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor("transparent");
      return () => {
        StatusBar.setTranslucent(false);
        StatusBar.setBackgroundColor("#ffffff");
      }
    }, [])
  )


  const handle_get_profile_data = () =>{
    setLoading(true);
    get_profile_dashboard_data((res, success) => {
      if(res){
        setProfileData(res?.data);

      }
      setLoading(false);
    })
  }

  useState(() =>{
    handle_get_profile_data();
  }, [])



  

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={styles.headerContainer}>
          <Image
            source={require("../../../../assets/img/profileBackground.png")}
            style={styles.bgImage}
          />

          <View style={{...styles.profileContainer}}>
            <View style={{
                width:110,
                height:110,
                borderRadius: 110/2,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#ffffff',
                objectFit:'contain',
                overflow:'hidden',
            }}>
                <Image 
                    source={store?.profileSettingData?.userInfo?.profile_picture?{uri:store?.profileSettingData?.userInfo?.profile_picture}:require("../../../../assets/img/user1.png")}
                    style={{
                        height: 110,
                        width:110,
                        objectFit:'cover',
                    }}
                />
            </View>
            {/* <Image 
              source={store?.profileSettingData?.userInfo?.profile_picture?{uri:store?.profileSettingData?.userInfo?.profile_picture}:require("../../../../assets/img/userProfile.png")}
              style={styles.profileImage}
            /> */}
            <Text style={styles.profileText}>{store?.profileSettingData?.userInfo?.name  || "User"}</Text>
          </View>

          <View style={styles.iconContainer}>
            <Pressable 
              onPress={() => navigation.navigate("ProfileNotification")}
              style={{
                position:'relative'
              }}
            >
              <Image 
                source={require("../../../../assets/img/BellSimple.png")}
                style={styles.icon}
              />
              {/* <Text style={{
                color:"#FF6C37",
                fontFamily:"NunitoExtraBold",
                position:"absolute",
                width:50,
                left:10,
                top:-4,
                zIndex:100,
              }}>12</Text> */}
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

      <View style={{...styles.semiContainer, marginTop: hp("12%")}}>
        <WeeklyCalendar/>

        <View style={styles.caption}>
      
          <Image 
              source={require("../../../../assets/img/Fire.png")}
              style={{paddingHorizontal:10}}
          />

          <Text style={{...styles.semitext, fontSize:14}}>
            You're on <Text style={{color:'#2B4752', fontFamily:'NunitoBold'}}>Day {profileData?.streak?.longest_streak}</Text> of growing your faith confidence!
          </Text>

        </View>

        <View style={{height:hp("1%")}}/>
        
        <LinearGradient
          // Button Linear Gradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={{
            width:"100%",
            height: 200,
          }}>
          <Text style={{}}>Sign in with Facebook</Text>
        </LinearGradient>

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