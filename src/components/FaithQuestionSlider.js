import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions,Image, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';





const window = Dimensions.get("window")
const InactiveColor = "#90B2B2"
const ActiveColor = "#004F4A"
const Answers = {
    1:'Finding my rhythm',
    2: 'Trying to believe',
    3: 'Not confident at all',
    4: 'Growing strong',
    5: 'Very confident'
}
const progressPercentage = {
    1: 10,
    2: 30,
    3: 50,
    4: 70,
    5: 100
}

const Dot = ({dotNumber=1, left, top,activeDot,group, pressEvent}) => {
    return <Pressable
                onPress={()=>pressEvent(dotNumber)}
                style={{
                    ...styles.dotContainer,
                    left: left,
                    top: top,
                    height: activeDot[dotNumber]?40:30,
                    width: activeDot[dotNumber]?40:30
                }}
            >
                {
                    activeDot[dotNumber]?<View style={{
                        ...styles.dot,
                        height: activeDot[dotNumber]?30:20,
                        width: activeDot[dotNumber]?30:20,
                    }}>
                        <AntDesign name="left" size={12} color="white" />
                        <AntDesign name="right" size={12} color="white" />
                    </View>:
                    <View style={{
                        ...styles.dot,
                        backgroundColor: group[dotNumber]?ActiveColor:InactiveColor
                    }}>
                    
                    </View>
                }
                
            </Pressable>
}
  

const FaithQuestionSlider = () => {
    const [progress, setProgress] = useState(0)
    const [activeDot, setActiveDot] = useState({1:false,2:false,3:false,4:false, 5:false})
    const [ans, setAns] = useState("Finding my rhythm")

    const [group, setGroup] = useState({1:false,2:false,3:false,4:false, 5:false})

    const handleActiveDots = (label)=>{
        let temp = {1:false,2:false,3:false,4:false, 5:false}
        temp[label] = true;
        setActiveDot({...temp})
    }

    const handleGroupDots = (label)=>{
        let temp = {1:false,2:false,3:false,4:false, 5:false}
        for(let i=1;i<=label;i++){
            temp[i]=true
        }
        setGroup({...temp})
    }

    const progressHandler = (label) =>{
        setProgress(progressPercentage[label])
        handleActiveDots(label)
        handleGroupDots(label)
        setAns(Answers[label])
    }

   useEffect(()=>{
    progressHandler(1)
   },[])

  return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor:'#fff'
    }}>
        <View style={styles.slideContainer}>

            <View style={styles.cardContainer} >


                <View style={{...styles.cardOne, width: `${progress}%`,}}></View>

                <View style={styles.cardTwo}></View>


                <View style={styles.cardThree}></View>
            </View>

            {/* middle dot*/}
            
            <View style={{
                width:"100%",
                zIndex:20,
                position:'absolute'
            }}>
                <Text style={{
                    fontFamily:'DMSerifDisplay',
                    fontSize:32,
                    textAlign:'center'
                }}>{ans}</Text>
            </View>

            
            <Dot
                dotNumber={3}
                left={(window.width*46)/100}
                top={ activeDot[3]?-15:-12}
                pressEvent={progressHandler}
                activeDot={activeDot}
                group={group}
            />
            <Dot
                dotNumber={1}
                left={(window.width*5)/100}
                top={ activeDot[1]?44:55}
                pressEvent={progressHandler}
                activeDot={activeDot}
                group={group}
            />
            <Dot
                dotNumber={2}
                left={(window.width*23.5)/100}
                top={ activeDot[2]?1:6}
                pressEvent={progressHandler}
                activeDot={activeDot}
                group={group}
            />
            <Dot
                dotNumber={4}
                left={ (window.width*69)/100}
                top={ activeDot[4]?3:6}
                pressEvent={progressHandler}
                activeDot={activeDot}
                group={group}
            />
            <Dot
                dotNumber={5}
                left={(window.width*87)/100}
                top={ activeDot[5]?49:50}
                pressEvent={progressHandler}
                activeDot={activeDot}
                group={group}
            />
            
        </View>
    </SafeAreaView>
  );
};

export default FaithQuestionSlider;



const styles = StyleSheet.create({
    slideContainer:{ 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 100 ,
        position:'relative'
    },
    cardContainer:{
        backgroundColor:'#EDF3F3',
        height: 350,
        width: '110%',
        borderRadius: '50%',
        overflow:'hidden',
        zIndex: 1,
        
    },
    cardOne:{
        backgroundColor:'#67B7B7',
        height: 350,
        width: `${50}%`,
        overflow:'hidden',
        position:'absolute',
        zIndex:2,
        left:0
    },
    cardTwo:{
        backgroundColor:'#fff',
        height: 330,
        width: `${95}%`,
        overflow:'hidden',
        position:'absolute',
        borderRadius:'50%',
        zIndex:3,
        top: 10,
        left:10
        // left:0,
        // bottom:0
    },
    cardThree:{
        backgroundColor:'#fff',
        height: 350/2,
        width: `${100}%`,
        overflow:'hidden',
        position:'absolute',
        zIndex:4,
        bottom:0
    },
    dotContainer:{
        backgroundColor:'#fff',
        zIndex:10,
        height:30,
        width:30,
        borderRadius: '50%',
        
        position:'absolute',
        left:100,
        top:100,
        
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    dot:{
        backgroundColor:'#004F4A',
        height:20,
        width:20,
        borderRadius:'50%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})