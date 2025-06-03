import React from 'react'
import { View , Text, ScrollView, StyleSheet, FlatList} from 'react-native'



const arr = [
    {
        title: "🔥Keep Your Streak Burning!",
        text: "Your faith journey is on fire! You're at 3 days strong --keep it going! Check in today to grow deper and stay on track"
    },
    {
        title: "🎉 Celebrate the Milestone!",
        text: "You've hit 4 weekly check-ins in a row! Your consistency is building something powerful, Stay connected ans see what's next!"
    },
    {
        title: "📖 Your Daily Verse Awaits",
        text:  ` "Your word is a lamp to my feet and a light to my path." - Psalm 119:105. Open Preachly and let today's verse inspire you!`
    },
    {
        title: "🔥Keep Your Streak Burning!",
        text: "Your faith journey is on fire! You're at 3 days strong --keep it going! Check in today to grow deper and stay on track"
    },
    {
        title: "🎉 Celebrate the Milestone!",
        text: "You've hit 4 weekly check-ins in a row! Your consistency is building something powerful, Stay connected ans see what's next!"
    },
    {
        title: "📖 Your Daily Verse Awaits",
        text:  ` "Your word is a lamp to my feet and a light to my path." - Psalm 119:105. Open Preachly and let today's verse inspire you!`
    }
]

const ProfileNotification = () => {
  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {arr.map((item, idx) => (
                <View 
                    key={idx.toString()}
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
                    }}>{item.text}</Text>
                </View>
            ))}
        </ScrollView>
    </View>
  )
}

export default ProfileNotification;


const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#fff', paddingHorizontal:20,paddingTop: 20, paddingBottom: 100}
})
