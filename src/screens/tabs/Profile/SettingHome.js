import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const SettingHome = () => {

    const navigation = useNavigation()
    
  return (
    <View style={{flex:1, backgroundColor:'#fff', padding:20}}>
        
        <Pressable 
            onPress={() => navigation.navigate("PersonalInfo")}
        >
            <View style={styles.settingMenu}>
            <Text style={styles.menuText}>Personal info</Text>
            <Image
                source={require("../../../../assets/img/CaretRight.png")}
                style={styles.caretRight}
            />
            </View>
        </Pressable>
        <View style={{height:15}}/>
        <Pressable 
            onPress={() => navigation.navigate("ProfileSubscription")}
        >
            <View style={styles.settingMenu}>
            <Text style={styles.menuText}>Subscription</Text>
            <Image
                source={require("../../../../assets/img/CaretRight.png")}
                style={styles.caretRight}
            />
            </View>
        </Pressable>
        <View style={{height:15}}/>
        <Pressable 
            onPress={() => navigation.navigate("AboutApp")}
        >
            <View style={styles.settingMenu}>
            <Text style={styles.menuText}>About app</Text>
            <Image
                source={require("../../../../assets/img/CaretRight.png")}
                style={styles.caretRight}
            />
            </View>
        </Pressable>
        <View style={{height:20}}/>

        <Pressable 
            onPress={() => {}}
        >
            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'flex-start'
            }}>
            
                <Image
                    source={require("../../../../assets/img/SignOut.png")}
                    style={{
                        height: 30,
                        width: 30,
                        objectFit:'contain'
                    }}
                />
                <Text style={{
                    color:'#D85B4B',
                    fontFamily:'NunitoBold',
                    fontSize:16,
                    marginLeft: 15,
                    // textDecorationColor:'#D85B4B',
                    // textDecorationLine: 'underline',
                    
                    borderBottomWidth: .6,
                    borderBottomColor: '#D85B4B'
                }}>Log out</Text>
            </View>
        </Pressable>

    </View>
  )
}

export default SettingHome;


const styles = StyleSheet.create({
  menuText:{
    fontFamily:'NunitoSemiBold',
    color:'#0B172A',
    fontSize: 18
  },
  settingMenu:{
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
});
