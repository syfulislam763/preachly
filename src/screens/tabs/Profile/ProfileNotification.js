import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View , Text, ScrollView, StyleSheet, FlatList,ActivityIndicator, TouchableOpacity, Image} from 'react-native'
import { useAuth } from '../../../context/AuthContext'
import { delete_notifications, get_notifications } from '../TabsAPI'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import Indicator from '../../../components/Indicator';
import { Swipeable } from 'react-native-gesture-handler'
const trash = require("../../../../assets/img/Trash.png")

function ProfileNotification (){

    const navigation = useNavigation();
    const {socket} = useAuth();
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([])
    //console.log(JSON.stringify(socket.notifications, null, 2), "**")

    // useLayoutEffect(()=>{
    //     navigation.getParent()?.setOptions({
    //         tabBarStyle: {display:'none'}
    //     })

    //     return () => {
    //         navigation.getParent()?.setOptions({
    //             tabBarStyle: undefined
    //         })
    //     }
    // },[navigation])
    const handleDeleteNotification = (id) => {
        setLoading(true);
        delete_notifications(id, (res, success) => {
            if(success){
                get_notifications((res, success) => {
                    setLoading(false);
                    if(success){
                        setNotifications(res?.data);
                        socket.setNotifications(res?.data);
                    }
                })
            }else{
                setLoading(false);
                console.log(res);
            }
        })
    }
    const renderRightActions = (progress, dragX, itemId) => (
        <TouchableOpacity
          onPress={() => handleDeleteNotification(itemId)}
          style={styles.deleteButton}
        >
          {/* <MaterialIcons name="delete" size={24} color="#fff" /> */}
          <Image 
            source={trash}
            style={{
              width:20,
              height:20,
              objectFit:'contain'
            }}
          />
        </TouchableOpacity>
      );

    const renderItem = ({item}) => {
        //console.log(item.id);
        return <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
            <View 
                style={{
                    marginBottom:20,
                    backgroundColor:'#F3F8F8',
                    borderRadius: 20,
                    padding:20
                }}
            >
                <Text 
                style={{
                    fontSize: 20,
                    fontFamily:'NunitoSemiBold',
                    color:"#0B172A"
                }}
                >{item.title}</Text>
                <Text style={{
                    fontFamily:'NunitoBold',
                    fontSize: 14,
                    color:'#2B4752',
                    paddingTop: 15
                }}>{item.message}</Text>
            </View>
        </Swipeable>
    }

    useEffect(() => {
        console.log("hope less")
        setNotifications(socket.notifications)
    }, [socket.notifications])

  return (
    <View style={styles.container}>
        <FlatList 
            data={notifications}
            keyExtractor={(_,idx) => idx.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
        />
        {loading && <Indicator onClose={()=>setLoading(false)} visible={loading}>
            <ActivityIndicator size={"large"}/>
        </Indicator>}
    </View>
  )
}

export default ProfileNotification;


const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#fff', paddingHorizontal:20,paddingTop: 20, paddingBottom: 10},
    deleteButton: {
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginVertical: 10,
    },
})
