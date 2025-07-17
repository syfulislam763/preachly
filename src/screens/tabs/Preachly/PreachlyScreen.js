import React, { useEffect, useState, version } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MediaControls from './MediaControls';
import ChapterSheet from './ChapterSheet';
import ScriptureSearch from './ScriptureSearch';
import BibleVersionList from './BibleVersionList';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../../context/AuthContext';
import { get_bible_books, get_bible_books_chapter, get_bible_chapter_content } from '../TabsAPI';
import Indicator from '../../../components/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

const bible = [
  {
    title: "The Territory of Simeon",
    content: [
       "The second lot came out for Simeon, for the tribe of Simeon, according to its families; and its inheritance was in the midst of the inheritance of the tribe of Judah.",

      "And it had for its inheritance Beer-sheba, Sheba, Mola′dah,",

      "Hazar-shu′al, Balah, Ezem,",

      "Elto′lad, Bethul, Hormah,",

      "Ziklag, Beth-mar′caboth, Ha′zar-su′sah",

      "Beth-leba′oth, and Sharu′hen—thirteen cities with their villages;",

      "En-rimmon, Ether, and Ashan—four cities with their villages;",

      "Together with all the villages round about these cities as far as Ba′alath-beer, Ramah of the Negeb. This was the inheritance of the tribe of Simeon according to its families.",
    ]
  }
]



export default function PreachlyScreen() {
  const [openBibleVersion, setOpenBibleVersion] = useState(false)
  const [openChapterList, setOpenChapterList] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [progress, setProgress] = useState(40);
  const {store, updateStore} = useAuth();
  const [selectedBibleVersion, setSelectedBibleVersion] = useState({})
  const [bibleBooks, setBibleBooks] = useState([]);
  const [bibleBook, setBibleBook] = useState({});
  const [loading, setLoading ] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  
  const [chapters, setChapters] = useState([]);
  const [expanded, setExpanded] = useState(''); // Currently opened
  const [selected, setSelected] = useState("");
  const [content, setContent] = useState([]);

  const [chapter, setChapter] = useState({});

  const speak = () => {
    const thingToSay = '1';
    Speech.speak(thingToSay);
  };

  const get_chapters = (item, bible_id, isDefault=false) => {
    const payload = {
      version_id: bible_id,
      book_id: item.id,
    }
    
    
    console.log("---", item)
    setExpanded(item.name);
    setBibleBook(item)
    //setItemLoading(true)
    setChapters([]);
    get_bible_books_chapter(payload, (res, success) =>{
      // console.log("he-=", JSON.stringify(res.data, null,2))
      if(success){
        setChapters(res?.data?.chapters);
        if(isDefault){
          console.log("+++" , bibleBook)
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
    console.log("hee-<>", bibleBook)
    get_bible_chapter_content(payload, (res, success) => {
      if(success){
        setContent([res?.data?.chapter]);
        console.log(bibleBook, "---")
        //setExpanded(bibleBook?.name);
        setSelected(chapter_id.split(".")[1]);
        //console.log("content -> ", JSON.stringify(res?.data, null, 2));
        setOpenChapterList(false);
      }
      setLoading(false)
    })
  }



  const get_bible_abbreviation = (item) => {
    let abbr = item?.title?.split(" ") || "";
    return abbr[abbr?.length-1] || " ";
  }

  useEffect(()=>{
    setSelectedBibleVersion(store?.profileSettingData?.bible_version);
  }, [])

  useEffect(() => {
    const payload = {
      version_id: selectedBibleVersion?.api_bible_id,
    }
    setLoading(true)
    get_bible_books(payload, (res, success) => {

      if(success){
        setBibleBooks(res?.data);
        setOpenBibleVersion(false)
        //console.log("-----", JSON.stringify(res?.data, null, 2))

        const book = res?.data?.books[0];
        const bible_id = res?.data?.bible_id;
        get_chapters(book, bible_id, true)
        // remove_local_storage_data(() => {
        //   console.log("fine");
        // })
        // get_local_storage_data((current_bible)=>{
        //   if(current_bible){
            
        //     const bible = JSON.parse(current_bible);
        //     console.log(bible, "-00")
        //     if(bible.bible_id != payload.version_id){
        //       get_chapters(book, bible_id, true);
        //     }else{

        //       get_contents(book, bible.bible_id, bible.chapter_id, true);
        //     }
        //   }else{
        //     console.log("whats app")
        //     get_chapters(book, bible_id, true)
        //   }
        // })

        
        // setOpenBibleVersion(false);
      }else{
        setLoading(false)
      }
      
    });
  }, [selectedBibleVersion]);

  const get_local_storage_data = async (cb) => {
    const current_bible = await AsyncStorage.getItem("current_bible");
    cb(current_bible);
  }
  const set_local_storage_data = async(payload, cb) => {
    await AsyncStorage.setItem("current_bible", JSON.stringify(payload));
    cb()
  }
  const remove_local_storage_data = async (cb) =>{
    await AsyncStorage.removeItem("current_bible");
    cb()
  }
  

  // console.log("bible -> ", JSON.stringify(store.bible_versions, null, 2));
  // console.log("bible -> ", JSON.stringify(store.profileSettingData.bible_version, null, 2));
  return (
    <View style={{flex:1, backgroundColor:'#edf3f3'}}>

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
          <Pressable onPress={() =>  setOpenChapterList(true)}>
            <Text style={styles.headerText1}>{expanded+" "+selected || "Joshua 19"}</Text>
          </Pressable>
          

          <Pressable onPress={()=>setOpenBibleVersion(true)}>
            <Text style={styles.headerText2}>{get_bible_abbreviation(selectedBibleVersion)}</Text>
          </Pressable>
        </View>
        <View style={{
          ...styles.commonHeaderStyle,
          marginBottom:20
        }}>
          
          <Image
            source={require("../../../../assets/img/24-smallcaps.png")}
            style={{...styles.icon, marginRight:20}}
          />
     
          <Pressable onPress={() => setOpenSearch(true)}>
            <Image
              source={require("../../../../assets/img/24-search_.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
      </View>


      <ScrollView style={{
        flexGrow:1,
        padding:20,
        
      }}>
      
        {content.map((chapter,i) => <View 
          key={i.toString()}
        >

            <Text style={{
              fontFamily:'NunitoBold',
              fontSize: 24,
              color:'#0B172A'
            }}>{chapter?.title}</Text>

            {chapter.verses.map((item,idx) => <Text
              key={idx.toString()}
              style={{
                fontFamily: 'NunitoSemiBold',
                fontSize: 16,
                color:'#0B172A',
                marginTop:20
              }}
            >
              <Text style={{
                color:'#966F44',
                fontFamily:'NunitoBold'
              }}>{item?.number+ " "}</Text>
              {item?.text}
            </Text>)}

        </View>)}

        
        <View style={{
          flexDirection:'row',
          alignItems: 'center',
          justifyContent:'space-between',
          paddingVertical: 30,
          marginBottom:20
        }}>
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
          <Pressable 
          onPress={speak}
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
            <Image
              source={require("../../../../assets/img/CaretDoubleLeft.png")}
              style={styles.icon}
            />
            <Image
              source={require("../../../../assets/img/Play.png")}
              style={styles.icon}
            />
            <Image
              source={require("../../../../assets/img/CaretDoubleRight.png")}
              style={styles.icon}
            />
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
