import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { deepGreen, lighgreen } from './Constant';
import useLayoutDimention from '../hooks/useLayoutDimention';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const SIDE_ITEM_SCALE = 0.80;
const SPACING = -9;
const SNAP_INTERVAL = ITEM_WIDTH + SPACING;
const SIDE_ITEM_VERTICAL_OFFSET = 50;

const imageData = [
  { img: require('../../assets/img/Frame1.png'), title: 'Empowerment', description: 'Speak confidently in every moment of doubt' },
  { img: require('../../assets/img/Frame2.png'), title: 'Biblical Guidance', description: 'Answers rooted in scripture, delivered with clarity' },
  { img: require('../../assets/img/Frame3.png'), title: 'Community', description: 'Join a global movement of believers sharing the truth' },
  {
    img: require('../../assets/img/Frame4.png'),
    title: 'Modern Faith Tools',
    description: "Equipping you with easily accessible answers at your fingertips for today's conversations",
  },
];

const images = [
  imageData[imageData.length - 1],
  ...imageData,
  imageData[0],
];

const totalImages = imageData.length;

function CustomCarousel () {

  const {isSmall, isMedium, isLarge, height} = useLayoutDimention()

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (index === 0) {
        setCurrentIndex(totalImages - 1);
      } else if (index === images.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(index - 1);
      }
    }
  }).current;

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const handleMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    let index = Math.round(offsetX / SNAP_INTERVAL);

    if (index === 0) {
      index = totalImages;
    } else if (index === images.length - 1) {
      index = 1;
    }

    const newOffset = index * SNAP_INTERVAL;
    flatListRef.current?.scrollToOffset({ offset: newOffset, animated: false });
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: SNAP_INTERVAL,
        animated: false,
      });
    }, 10);
  }, []);

  return (
    <View style={{...styles.container, marginTop: isSmall?height*0.05:height*0.07}}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        snapToInterval={SNAP_INTERVAL}
        scrollEventThrottle={16}
        contentContainerStyle={{ 
          paddingHorizontal: (width - ITEM_WIDTH) / 2,
          alignItems: 'center',
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * SNAP_INTERVAL,
            index * SNAP_INTERVAL,
            (index + 1) * SNAP_INTERVAL,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [SIDE_ITEM_SCALE, 1, SIDE_ITEM_SCALE],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [SIDE_ITEM_VERTICAL_OFFSET, 0, SIDE_ITEM_VERTICAL_OFFSET],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          const captionOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ alignItems: '' }}>
            
              <View style={styles.fullWidthCaptionWrapper}>
                <Animated.View style={[styles.fullWidthCaptionContainer, { opacity: captionOpacity }]}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </Animated.View>
              </View>
              
              <Animated.View 
                style={[
                  styles.slideContainer, 
                  { 
                    transform: [
                      { scale },
                      { translateY }
                    ],
                    marginHorizontal: SPACING / 2,
                    opacity,
                  }
                ]}
              >
                <Image source={item.img} style={{
                  ...styles.image,
                  height: isSmall?height*0.5: height*0.44
                }} />
              </Animated.View>
            </View>
          );
        }}
      />

      <View style={styles.pagination}>
        {imageData.map((_, i) => {
          const isActive = i === currentIndex;
          const isSecond = i === 1;
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: isActive ? 25 : 12,
                  backgroundColor: isActive ? deepGreen : lighgreen,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height*0.05,
    backgroundColor:'white',
    // height:'50%'
  },

  fullWidthCaptionWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  fullWidthCaptionContainer: {
    width: width,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  slideContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginTop: (height*19)/100, 
  },
  title: {
    color: '#000',
    fontSize: 32,
    fontFamily: 'DMSerifDisplay',
    marginBottom: 8,
    textAlign: 'center',
    paddingTop: 20,
    width: '100%',
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'NunitoBold',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#2B4752',
    width: '100%',
  },
  image: {
    width: "100%",
    height: height*0.4,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '9%'
  },
  dot: {
    height: 12,
    borderRadius: 50,
    marginHorizontal: 4,
  },
});

export default CustomCarousel;