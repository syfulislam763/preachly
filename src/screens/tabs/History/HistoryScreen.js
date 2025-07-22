import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoryNotFound from './HistoryNotFound';
import useLayoutDimention from '../../../hooks/useLayoutDimention'
import {getStyles} from './HistoryScreenStyle';
import { get_all_sessions } from '../TabsAPI';
import Indicator from '../../../components/Indicator';

const star = require("../../../../assets/img/VectorStar.png")
const bookmark = require("../../../../assets/img/24-bookmark.png")
const bookmark1 = require("../../../../assets/img/Bookmark1.png")
const trash = require("../../../../assets/img/Trash.png")

const FILTERS = [{img:'', txt:'All chats'}, {img:star,txt:'Favorites'}, {img:bookmark, txt: 'Answers'}];

const initialData = [
  {
    id: '1',
    title: 'Finding Faith and Connection with Christ',
    snippet: 'When you feel distant from Christ, prayer can be a powerful means of seeing comfort, guidance, an...',
    replies: 3,
    timeAgo: '1 hour ago',
    isFavorite: false,
    type: 'chat',
  },
  {
    id: '2',
    title: 'The Power of Community in Spiritual Growth',
    snippet: 'Engaging with a supportive community can enhance your faith journey, providing encouragement, sharing...',
    replies: 5,
    timeAgo: '2 hour ago',
    isFavorite: true,
    type: 'chat',
  },
  {
    id: '3',
    title: 'Overcoming Doubt Through Scripture',
    snippet: 'Reading the Bible can help you confront your doubts and strengthen your belief, illuminating your path...',
    replies: 8,
    timeAgo: '3 hour ago',
    isFavorite: false,
    type: 'chat',
  },
   {
    id: '4',
    title: 'Finding Faith and Connection with Christ',
    snippet: 'When you feel distant from Christ, prayer can be a powerful means of seeing comfort, guidance, an...',
    replies: 3,
    timeAgo: '1 hour ago',
    isFavorite: false,
    type: 'chat',
  },
  {
    id: '5',
    title: 'The Power of Community in Spiritual Growth',
    snippet: 'Engaging with a supportive community can enhance your faith journey, providing encouragement, sharing...',
    replies: 5,
    timeAgo: '2 hour ago',
    isFavorite: true,
    type: 'chat',
  },
  {
    id: '6',
    title: 'Overcoming Doubt Through Scripture',
    snippet: 'Reading the Bible can help you confront your doubts and strengthen your belief, illuminating your path...',
    replies: 8,
    timeAgo: '3 hour ago',
    isFavorite: false,
    type: 'chat',
  },
   {
    id: '7',
    title: 'Finding Faith and Connection with Christ',
    snippet: 'When you feel distant from Christ, prayer can be a powerful means of seeing comfort, guidance, an...',
    replies: 3,
    timeAgo: '1 hour ago',
    isFavorite: false,
    type: 'answer',
  },
  {
    id: '8',
    title: 'The Power of Community in Spiritual Growth',
    snippet: 'Engaging with a supportive community can enhance your faith journey, providing encouragement, sharing...',
    replies: 5,
    timeAgo: '2 hour ago',
    isFavorite: false,
    type: 'answer',
  },
  {
    id: '9',
    title: 'Overcoming Doubt Through Scripture',
    snippet: 'Reading the Bible can help you confront your doubts and strengthen your belief, illuminating your path...',
    replies: 8,
    timeAgo: '3 hour ago',
    isFavorite: false,
    type: 'answer',
  },
];

const HistoryScreen = ({navigation}) => {
  const [selectedFilter, setSelectedFilter] = useState('All chats');
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  
  const {isSmall, isMedium, isLarge, isFold} = useLayoutDimention()
  const styles = getStyles(isSmall, isMedium, isLarge, isFold)

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };
  function timeAgo(isoString) {
    const now = new Date();
    const createdAt = new Date(isoString);
    const diffMs = now - createdAt;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

    if (seconds < 60) return `${seconds}s`;
    else if (minutes < 60) return `${minutes}m`;
    else if (hours < 24) return `${hours}h`;
    else if (days < 365) return `${days}d`;
    else return `${years}y`;
  }


  useEffect(() => {
    setLoading(true);
    get_all_sessions((res, success) => {
      if(success){
        console.log("all", JSON.stringify(res?.data?.sessions, null, 2))
      }else{

      }
      setLoading(false);
    })
  }, [])

  const filteredData = data
    .filter((item) => {
      if (selectedFilter === 'Favorites') return item.isFavorite;
      if (selectedFilter === 'Answers') return item.type === 'answer';
      return true;
    })
    .filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );

  const renderRightActions = (progress, dragX, itemId) => (
    <TouchableOpacity
      onPress={() => handleDelete(itemId)}
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

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
      <View style={styles.itemContainer}>
        <View style={{ flex: 1 }}>
          {(item?.type != "answer") && <Text style={styles.itemTitle}>{item.title}</Text>}
          <Text style={(item?.type != "answer")?{...styles.itemSnippet}:{...styles.itemSnippet, paddingVertical:0}}>{item.snippet}</Text>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="reply" size={16} color="#966F44" />
            <Text style={styles.metaText}>{item.replies} replies</Text>
            <MaterialIcons name="access-time" size={16} color="#966F44" style={{ marginLeft: 10 }} />
            <Text style={styles.metaText}>{item.timeAgo}</Text>
          </View>
        </View>
        {(item?.type==="answer")? <Image
          source={bookmark1}
          style={{
            height:20,
            width:20,
            objectFit:'contain',
            marginTop: (item?.type != "answer")?0:5
          }}
        /> : <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <MaterialIcons
            name={item.isFavorite ? 'star' : 'star-border'}
            size={24}
            color={item.isFavorite ? '#f4c10f' : '#aaa'}
          />
        </TouchableOpacity>}
      </View>
    </Swipeable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>History</Text>

      <View style={styles.searchBar}>
        <Image 
          source={require("../../../../assets/img/24-search.png")}
          style={{
            height:30,
            width: 30,
            objectFit:'contain',
            marginHorizontal: 10
          }}
        />
        <TextInput
          placeholder="Ask or search for answers..."
          style={styles.searchInput}
          value={searchText}
          placeholderTextColor={"#607373"}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filterContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.txt}
            style={[
              styles.filterButton,
              selectedFilter === filter.txt && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter.txt)}
          >
            
            {filter?.img?<Image
              source={filter.img}
              style={styles.filterIcon}
            />:null}
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter.txt && styles.activeFilterText,
              ]}
            >
              {filter.txt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListEmptyComponent={() => {
          if(selectedFilter == 'All chats'){
            return <HistoryNotFound
              title={"No Chats Yet"}
              text={"Ask Preachly for clarity, insight, and scripture-bvacked answers. Your past chats will be saved here for easy reference"}
            />
          }else if(selectedFilter == "Favorites"){
            return  <HistoryNotFound
              title={"No Favorites Yet"}
              text={"Looks like you haven't saved any chats yet. When you find a conversation that resonates tap the favorite icon to keep it handy"}
            />
          }else {
            return <HistoryNotFound 
              title={"No Saved Answers Yet"}
              text={"Looks like you haven't saved any key answers. When you find an answer worth keeping, tap the bookmark to store it for quick reference"}
            />
          }
           
        }}
      />
      {loading && <Indicator visible={loading} onClose={()=>setLoading(false)}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 32, fontFamily:'DMSerifDisplay', marginBottom: 16,color:'#0B172A' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ACC6C5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
   
  },
  filterContainer: { flexDirection: 'row', marginBottom: 16, },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#EDF3F3',
    width: 'auto',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  activeFilterButton: { backgroundColor: '#005A55',  },
  filterText: { fontSize: 16, fontFamily:'NunitoSemiBold', color:'#0B172A'},
  activeFilterText: { color: '#fff' },
  itemContainer: {
    flexDirection: 'row',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  itemTitle: { fontSize: 15, marginBottom: 4, fontFamily:'NunitoSemibold', color:'#0B172A' },
  itemSnippet: { color: '#2B4752', fontSize: 13, marginBottom: 6, fontFamily:'NunitoSemiBold', paddingVertical:10 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 12, color: '#966F44', marginLeft: 4, fontFamily:'NunitoSemiBold' },
  deleteButton: {
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginVertical: 4,
  },
});

export default HistoryScreen;
