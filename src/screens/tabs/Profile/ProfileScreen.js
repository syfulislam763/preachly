import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeeklyCalendar from '../../../components/WeeklyCalendar';
import { useNavigation } from '@react-navigation/native';





const window = Dimensions.get("window")

const ProfileScreen = () => {

  const navigation = useNavigation()


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

      <View style={{
        marginTop: 100,
        paddingHorizontal: 20
      }}>
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

        <View style={{height:20}}/>

        <Image
            source={require("../../../../assets/img/rooted.png")}
            style={styles.img}
        />
        <View style={{height:15}}/>
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
        <View style={{height:15}}/>

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

        <View style={{height:15}}/>
        
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

const styles = StyleSheet.create({
  tootltipText:{
    fontFamily:'NunitoSemiBold',
    fontSize:14,
    color:'#966F44'
  },
  tooltip: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width: 100
  },
  menuText:{
    fontFamily:'NunitoSemiBold',
    color:'#0B172A',
    fontSize: 18
  },
  weeklyCheckIn:{
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#F3F8F8',
    padding: 15,
    borderRadius: 20
  },
  caretRight:{
    width:20,
    height:20,
    objectFit:"contain"
  },
  semitext: {color:'#90B2B2', fontFamily:'NunitoRegular', fontSize:16, textAlign:'center', flexWrap:'wrap', },
  caption: {display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center', marginTop: 20},
  img: {width:'100%',height: 150,objectFit:'contain'},
  headerContainer:{
    position:'relative'
  },
  profileContainer:{
    position: 'absolute',
    top: (window.height*14)/100,
    left: (window.width*38)/100,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems: 'center',
    height: 150
  },
  profileText:{
    fontSize: 20,
    fontFamily: 'NunitoBold',
    color:'#0B172A'
  },
  iconContainer:{
    position:"absolute",
    top: 30,
    right: 30,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:  80,
    paddingTop: 20
  },
  icon:{
    width: 25,
    height: 25,
    objectFit:'contain'
  },
  profileImage:{
    width: 110,
    height: 110,
    objectFit:'contain'
  },
  bgImage:{
    width:"100%",
    height: 200,
    objectFit:'cover'
  }
});

export default ProfileScreen;