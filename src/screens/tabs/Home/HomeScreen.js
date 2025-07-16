import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, Image, ActivityIndicator } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import HomepageHeader from '../../../components/HomepageHeader';
import { loadAuthToken } from '../../../context/api';
import Indicator from '../../../components/Indicator';
import { useAuth } from '../../../context/AuthContext';
import useStaticData from '../../../hooks/useStaticData';
import useLogout from '../../../hooks/useLogout';
import { useRoute } from '@react-navigation/native';  
import { get_onboarding_user_data } from '../../personalization/PersonalizationAPIs';
import { get_profile_info } from '../../auth/AuthAPI';

export default function HomeScreen() {

  const [loading,setLoading] = useState(false);

  const {store, updateStore} = useAuth()
  useLogout()
  const {
    denominations,
    bible_versions,
    tone_preference_data,
    faith_journey_reasons,
    bible_familiarity_data
  } = store;

  console.log("verify store ->", JSON.stringify(store,null, 2))


  console.log("v-version->", JSON.stringify(bible_versions, null, 2))
  useEffect(() => {
       
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
            console.log("inspect->", JSON.stringify(res, null, 2))

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
    <SafeAreaView style={{flex:1, backgroundColor:'#fff', paddingHorizontal:20}}>
        <HomepageHeader/>
        <ScrollView showsVerticalScrollIndicator={false}>

          <ImageBackground
            source={require('../../../../assets/img/Background.png')}
            style={styles.bgImageContainer}
          >
            <View style={styles.bgImageWrapper}>
              <Text style={styles.bgImageCaption}>(1 Peter 3:15)</Text>
              <Text 
                style={styles.bgImageCaptionTitle}
              >“Always be prepared to give an answerto everyone who asks you to give the reason for the hope that you have”</Text>
              <View style={styles.bgImageFooter}>
                <Image 
                  source={require("../../../../assets/img/24-share.png")}
                  style={styles.bgImageFooterIcon}
                />
                <Text
                  style={styles.bgImageFooterText}
                >Share This</Text>
              </View>
            </View>
          </ImageBackground>


          <View 
            style={styles.questionContainer}
          
          >
              <View style={{
                width:'20%',
              }}>
                  <Image 
                  source={require("../../../../assets/img/Objects.png")}
                  style={styles.messageIcon}
                />
              </View>
              <View style={{
                width: "80%",
              }}>
                <Text style={styles.questionTitle1}>Have a question on your heart?</Text>
                <Text style={styles.questionTitle2}>Ask & Get Inspired Answers Now</Text>
                <Text 
                  style={styles.questionTitle3}
                >Give it a try</Text>
              </View>
          </View>
            

          <View style={styles.multiImageContainer}>
              <View style={styles.commonMultiImage}>
                <Image
                  source={require("../../../../assets/img/OpenBook.png")}
                  style={styles.multiImage}
                />
                <Text style={styles.multiText}>Explore Scriptures</Text>
              </View>
              <View style={styles.commonMultiImage}>
                <Image
                  source={require("../../../../assets/img/BrightsSun.png")}
                  style={styles.multiImage}
                />
                <Text style={styles.multiText}>Explore Scriptures</Text>
              </View>

              <View style={styles.commonMultiImage}>
                <Image
                  source={require("../../../../assets/img/ReligeousBook.png")}
                  style={styles.multiImage}
                />
                <Text style={styles.multiText}>Explore Scriptures</Text>
              </View>


          </View>

          <View>
              <Text style={{
                fontFamily:'NunitoBold',
                fontSize: 20,
                marginTop: 20,
              }}>Popular Faith Questions</Text>
          
            <ScrollView contentContainerStyle={{
              backgroundColor:'#fff'
            }} horizontal  showsHorizontalScrollIndicator={false}>
                  <Image 
                    source={require("../../../../assets/img/ThemeCard.png")}
                    style={styles.imageHorizontalScroll}
                  />
                  <Image 
                    source={require("../../../../assets/img/card8.png")}
                    style={styles.imageHorizontalScroll}
                  />
                  <Image 
                    source={require("../../../../assets/img/card9.png")}
                    style={styles.imageHorizontalScroll}
                  />
            </ScrollView>
          </View>

          <View style={{
            backgroundColor:'#fff',
            paddingBottom:100
          }}>
            <Image 
              source={require("../../../../assets/img/weekly_checkin_card.png")}
              style={styles.bgProgress}
            />
            {/* <Image 
              source={require("../../../../assets/img/weekly_checkin_card.png")}
              style={styles.bgProgress}
            />
            <Image 
              source={require("../../../../assets/img/weekly_checkin_card.png")}
              style={styles.bgProgress}
            /> */}
          </View>
          

        </ScrollView>
        {loading && <Indicator onClose={() => setLoading(false)} visible={loading}>
          <ActivityIndicator size={"large"}/>
        </Indicator>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgProgress:{
    height:120,
    width: 'auto',
    objectFit:'contain'
  },
  imageHorizontalScroll:{
    height:170,
    width:200,
    objectFit:'contain',
    marginRight:20
  },
  multiText:{
    fontFamily:'NunitoSemiBold',
    fontSize: 12,
    color:'#2B4752'
  },
  commonMultiImage:{
    width:"31%"
  },
  multiImage:{
    height:80,
    width: "100%",
    objectFit:'contain'
  },
  multiImageContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width: '100%',
    marginTop: 20,
  },
  questionTitle3:{
    fontSize: 16,
    color: "#fff",
    fontFamily:'NunitoSemiBold',
    textDecorationLine:'underline',
    textDecorationColor: '#fff',
    marginTop:8
  },
  questionTitle2:{
    fontSize: 17,
    fontFamily: 'NunitoSemiBold',
    color:'#62E2E2',
    marginTop:3
  },
  questionTitle1:{
    fontSize: 17,
    fontFamily:'NunitoSemiBold',
    color:'#fff',
    
  },
  messageIcon:{
    height:50,
    width:50,
    objectFit:'contain'
  },
  questionContainer:{
    display:'flex',
    flexDirection:'row',
    width:"100%",
    alignItems:'flex-start',
    justifyContent:'space-between',
    backgroundColor:'#00202B',
    height:'auto',
    padding: 20,
    borderRadius: 20,
    marginTop: 20
  },
  bgImageContainer:{
    height:150,
    width:"100%",
    objectFit: 'contain',
    borderRadius: 20,
    overflow:'hidden',
  },
  bgImageWrapper:{
    paddingHorizontal:20,
    paddingVertical:10,
    alignItems:'center'
  },
  bgImageCaption:{
    color:'#966F44',
    fontFamily:'NunitoSemiRegular',
    fontSize: 13
  },
  bgImageCaptionTitle:{
    fontFamily:'DMSerifDisplay',
    fontSize: 18,
    color:'#503524',
    paddingVertical:8
  },
  bgImageFooter:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:100
  },
  bgImageFooterIcon:{
    height:18,
    width:18,
    objectFit:'contain'
  },
  bgImageFooterText:{
    color: '#966F44',
    fontFamily:'NunitoBold',
    fontSize: 15,
    textDecorationColor: '#966F44',
    textDecorationLine: 'underline'
  }
})