import React, { useCallback, useEffect, useRef, useState, version } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MediaControls from './MediaControls';
import ChapterSheet from './ChapterSheet';
import ScriptureSearch from './ScriptureSearch';
import BibleVersionList from './BibleVersionList';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../../context/AuthContext';
import { get_bible_books, get_bible_books_chapter, get_bible_chapter_content, next_previous } from '../TabsAPI';
import Indicator from '../../../components/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useLogout from '../../../hooks/useLogout';
import { useFocusEffect } from '@react-navigation/native';
import { finish_scripture } from '../TabsAPI';

export default function PreachlyScreen() {
  useLogout();
  const [openBibleVersion, setOpenBibleVersion] = useState(false)
  const [openChapterList, setOpenChapterList] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [progress, setProgress] = useState(0);
  const {store, updateStore} = useAuth();
  const [selectedBibleVersion, setSelectedBibleVersion] = useState({})
  const [bibleBooks, setBibleBooks] = useState([]);
  const [bibleBook, setBibleBook] = useState({});
  const [loading, setLoading ] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  const [zoomText, setZoomText] = useState(14)
  
  const [chapters, setChapters] = useState([]);
  const [expanded, setExpanded] = useState(''); // Currently opened
  const [selected, setSelected] = useState("");
  const [content, setContent] = useState([]);
  const [isPaused, setIsPaused] =  useState(true);

  const [chapter, setChapter] = useState({});


  const scrollRef = useRef();
  const intervalRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const stopRef = useRef(false);
  const count = useRef(0)
  const stop_audio = () =>{
    Speech.stop();
    setIsPaused(true);
  }

  const play_audio_script = (val) => {
    setIsPaused(false);
    
    stopRef.current = false;
    Speech.stop();
    if(! (content[0]?.verses) ){
      setIsPaused(true);
      return;
    }
    const arr = content[0].verses;
    let len = (arr.length)*1.2;
    const scrollBy = contentHeight / len;
    let i = 0;
    count.current = val<0?0:val>=len?len-1:val;

    setProgress((100 / len) * count.current);
    scrollRef.current?.scrollTo({ y: count.current*scrollBy, animated: false });

    const speakNext = () => {

      if (stopRef.current || count.current >= len) {
        setIsPaused(true);
        console.log(count.current, "--" )
        return;
      }
      
      if(count.current< arr.length){
        const currentText = arr[count.current].text;
        Speech.speak(currentText, {
          voice: "en-us-x-iol-local",
          onStart: () => {
            
          },
          onDone: () => {
            scrollRef.current?.scrollTo({
              y: count.current * scrollBy,
              animated: true,
            });
            count.current++;
            setProgress((100 / len) * count.current);
            speakNext();
          },
        });
      }else{
        scrollRef.current?.scrollTo({
          y: count.current * scrollBy,
          animated: true,
        });
        count.current++;
        setProgress((100 / len) * count.current);
        speakNext();
      }
      
    };

    speakNext();
  };


  const get_chapters = (item, bible_id, isDefault=false) => {
    const payload = {
      version_id: bible_id,
      book_id: item.id,
    }
    
    
 
    setExpanded(item.name);
    setBibleBook(item)
    //setItemLoading(true)
    setChapters([]);
    get_bible_books_chapter(payload, (res, success) =>{

      if(success){
        setChapters(res?.data?.chapters);
        if(isDefault){
  
          get_contents(res?.data?.chapters[0], bible_id, res?.data?.chapters[0]?.id)
        }
      }
      //setItemLoading(false);
    })
    
  }


  const get_contents = (chapt, bible_id, chapter_id, isDefault=false) =>{
    if(!isDefault)
      setLoading(true);

    const payload = {
      version_id: bible_id,
      chapter_id: chapter_id
    }

    if(isDefault){
      setBibleBook(chapt);
    }else{
      setChapter(chapt)
    }
   
    get_bible_chapter_content(payload, (res, success) => {
      if(success){
        setContent([res?.data?.chapter]);
  
        setSelected(chapter_id.split(".")[1]);
  
        setOpenChapterList(false);
      }
      setLoading(false)
    })
  }

  const handleNextPrevious = (route) =>{
    const payload = {
      version_id: selectedBibleVersion?.api_bible_id,
      chapter_id:chapter?.id,
      route: route
    }

    setLoading(true);
    next_previous(payload, (res, success) =>{
      if(success){
     
        if(res?.data?.chapter?.verses?.length>0){
          setContent([res?.data?.chapter]);
          setSelected(res?.data?.chapter?.id?.split(".")[1]);
          setChapter({id:res?.data?.chapter?.id, reference: res?.data?.chapter?.reference})
        }
      }else{

      }
      setLoading(false);
    })
  }


  const get_bible_abbreviation = (item) => {
    let abbr = item?.title?.split(" ") || "";
    return abbr[abbr?.length-1] || " ";
  }



  useEffect(()=>{
    //setSelectedBibleVersion(store?.profileSettingData?.bible_version);
  }, []);



  useEffect(() => {
    const payload = {
      version_id: selectedBibleVersion?.api_bible_id,
    }
    if(Object.keys(selectedBibleVersion).length > 0){
      payload.version_id = selectedBibleVersion?.api_bible_id
    }else{
      payload.version_id = store?.profileSettingData?.bible_version?.api_bible_id
    }

    console.log("bible issue", payload);
    setLoading(true)
    get_bible_books(payload, (res, success) => {

      if(success){
        setBibleBooks(res?.data);
        setOpenBibleVersion(false)
        if(Object.keys(selectedBibleVersion).length <= 0){
          setSelectedBibleVersion(store?.profileSettingData?.bible_version)
        }
        

        const book = res?.data?.books[0];
        const bible_id = res?.data?.bible_id;
        get_chapters(book, bible_id, true)
        
      }else{
        setLoading(false)
      }
      
    });
    
  }, [selectedBibleVersion]);

  useFocusEffect(
    useCallback(()=>{
      setZoomText(14)
      return () =>{
        stop_audio()
      }
    }, [])
  )

  const handleZoom = () => {
    if(zoomText < 25){
      setZoomText(n => n+1)
    }
  }


  return (
    <View  style={{flex:1, backgroundColor:'#edf3f3'}}>

      <View style={{
        ...styles.commonHeaderStyle,
        ...styles.header
      }}>
        <View
          style={{
            ...styles.commonHeaderStyle,
            marginBottom:20
          }}
        >
          <Pressable onPress={() =>  {
            stop_audio();
            setOpenChapterList(true)
          }}>
            <Text style={styles.headerText1}>{expanded+" "+selected || "Joshua 19"}</Text>
          </Pressable>
          

          <Pressable onPress={()=>{
            stop_audio();
            setOpenBibleVersion(true)
          }}>
            <Text style={styles.headerText2}>{get_bible_abbreviation(selectedBibleVersion)}</Text>
          </Pressable>
        </View>
        <View style={{
          ...styles.commonHeaderStyle,
          marginBottom:20
        }}>
          
          <Pressable onPress={handleZoom}>
            <Image
              source={require("../../../../assets/img/24-smallcaps.png")}
              style={{...styles.icon, marginRight:20}}
            />
          </Pressable>
     
          <Pressable onPress={() => {
            stop_audio();
            setOpenSearch(true)
          }}>
            <Image
              source={require("../../../../assets/img/24-search_.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>


      <ScrollView onContentSizeChange={(width, height) => setContentHeight(height)}  ref={scrollRef} style={{
        flexGrow:1,
        padding:20,
        
      }}>

        {content.length == 0 && 
        <View style={{height:400, alignItems:'center', justifyContent:'center'}}>

          <Text 
            style={{
              color:'#966F44',
              fontFamily:'NunitoBold'
            }}
          >
          No Content Found!
          </Text>


        </View>}

        {content.map((chapter,i) => <View 
          key={i.toString()}
        >

            <Text style={{
              fontFamily:'NunitoBold',
              fontSize: 24,
              color:'#0B172A'
            }}>{chapter?.title}</Text>

            {(chapter?.verses?.length)? chapter.verses.map((item,idx) => <Text
              key={idx.toString()}
              style={{
                fontFamily: 'NunitoSemiBold',
                fontSize: zoomText,
                color:'#0B172A',
                marginTop:20
              }}
            >
              <Text style={{
                color:'#966F44',
                fontFamily:'NunitoBold'
              }}>{item?.number+ " "}</Text>
              {item?.text}
            </Text>): null


          }

        </View>)}

        
        <View style={{
          flexDirection:'row',
          alignItems: 'center',
          justifyContent:'space-between',
          paddingVertical: 30,
          marginBottom:20
        }}>
          <Pressable 
            onPress={() => {
              finish_scripture((res, success) => {
                handleNextPrevious("previous")
              })
            }}
          >
            <View style={{
              backgroundColor:'#005A55',
              padding:10,
              borderRadius: 50
            }}>
              <Image 
                source={require("../../../../assets/img/ArrowLeft.png")}
                style={styles.icon}
              />
            </View>
          </Pressable>
          <Pressable 
          onPress={() => {
            finish_scripture((res, success) => {
              handleNextPrevious("next")
            })
          }}
          style={{
            backgroundColor:'#005A55',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:"center",
            paddingVertical: 10,
            paddingHorizontal:20,
            borderRadius: 50
          }}
          
          >
            <Text style={{
              color:'#fff',
              fontFamily:'NunitoSemiBold',
              fontSize: 16,
              marginRight:15
            }}>Next</Text>
            <Image 
              source={require("../../../../assets/img/ArrowRight.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>



      </ScrollView>


      <View style={styles.footerContainer}>
        <View
          style={styles.playButtons}
        >
            <Pressable
               onPress={() => play_audio_script(count.current-1)}
            >
              <Image
                source={require("../../../../assets/img/CaretDoubleLeft.png")}
                style={styles.icon}
              />
            </Pressable>

            {isPaused?
              <Pressable onPress={() => play_audio_script(0)}>
                <Image
                  source={require("../../../../assets/img/Play.png")}
                  style={styles.icon}
                />
              </Pressable>:
              <Pressable  onPress={() => {
                clearInterval(intervalRef.current);
                stopRef.current = true;
                stop_audio();
              }}>
                <FontAwesome name="pause" size={24} color="black" />
              </Pressable>
            }
            
            
            <Pressable 
              onPress={() => play_audio_script(count.current+1)}
            >
              <Image
                source={require("../../../../assets/img/CaretDoubleRight.png")}
                style={styles.icon}
              />
            </Pressable>
        </View>

        <View style={styles.progressContainer}>
          <View style={{...styles.progress, width: `${progress}%`}}/>
          <View style={styles.progressDot}/>
        </View>

      </View>
      

      <CustomModal
        visible={openChapterList}
        onClose={() => setOpenChapterList(false)}
      >
        <ChapterSheet
          onClose={() => setOpenChapterList(false)}
          bible={bibleBooks}
          chapters={chapters}
          handleExpand={get_chapters}
          handleContent={get_contents}
          expanded={expanded}
          selected={selected}
        />
      </CustomModal>
      
      <CustomModal
        visible={openBibleVersion}
        onClose={() => setOpenBibleVersion(false)}
      >
        <BibleVersionList
          onClose={() => setOpenBibleVersion(false)}
          selectedItem={selectedBibleVersion}
          setSelectedItem={setSelectedBibleVersion}
        />
      </CustomModal>

      <CustomModal
        visible={openSearch}
        onClose={() => setOpenSearch(false)}
      >
        <ScriptureSearch
          onClose={() => setOpenSearch(false)}
          bibleId={selectedBibleVersion?.api_bible_id}
          title={get_bible_abbreviation(selectedBibleVersion)}
        />
      </CustomModal>
      

      {loading && <Indicator visible={loading} onClose={() => setLoading(false)}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}
    </View>
  );
}



const CustomModal = ({animationType="slide", visible, onClose, children }) => {
  return (
    <Modal
      transparent={true}
      presentationStyle='overFullScreen'
      statusBarTranslucent={true}
      visible={visible}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View style={{...styles.overlay}}>
        <View style={{...styles.modalContainer}}>
            {children}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000CC',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding:0,
    height:'100%'
    // backgroundColor:'#fff'
  },
  modalContainer: {
    height:"95%",
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 0,
    // height:'100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  icon:{
    height:30,
    width:30,
    objectFit:'contain'
  },
  commonHeaderStyle:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  header:{
    height:110,
    elevation:5,
    shadowColor: '#00000080',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    backgroundColor:'#fff',
    alignItems:'flex-end',
    paddingHorizontal: 20,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20
  },
  headerText1:{
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:20,
    backgroundColor:'#005A55',
    color:'#fff',
    marginRight:20,
    fontFamily:'NunitoSemiBold',
    fontSize:16
  },
  headerText2:{
    backgroundColor:'#EDF3F3',
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:20,
    fontFamily:'NunitoSemiBold',
    fontSize:16
  },
  footerContainer: {
    backgroundColor:'#fff',
    alignItems:'center',
    paddingBottom:10,
    paddingHorizontal:20,
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  playButtons: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    width: "45%",
    justifyContent:'space-between',
    paddingVertical:20
  },
  progressContainer:{
    backgroundColor: "#EDF3F3",
    height:6,
    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    // overflow:'hidden',
    borderRadius: 5,
  },
  progress:{
    backgroundColor: "#005A55",
    height: 6,
    marginRight:1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius:5,
  },
  progressDot:{
    backgroundColor: '#005A55',
    height:8,
    width:8,
    borderRadius:50
  }
});
