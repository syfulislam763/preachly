

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  Text,
  InteractionManager,
} from 'react-native';
import { deepGreen, lighgreen } from './Constant';
import useLayoutDimention from '../hooks/useLayoutDimention';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getStyles } from './CustomCarouselStyle';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const SIDE_ITEM_SCALE = 0.8;
const SPACING = -9;
const SNAP_INTERVAL = ITEM_WIDTH + SPACING;
const SIDE_ITEM_VERTICAL_OFFSET = 50;

const imageData = [
  {
    img: require('../../assets/img/Frame1.png'),
    title: 'Empowerment',
    description: 'Speak confidently in every moment of doubt',
  },
  {
    img: require('../../assets/img/Frame2.png'),
    title: 'Biblical Guidance',
    description: 'Answers rooted in scripture, delivered with clarity',
  },
  {
    img: require('../../assets/img/Frame3.png'),
    title: 'Community',
    description: 'Join a global movement of believers sharing the truth',
  },
  {
    img: require('../../assets/img/Frame4.png'),
    title: 'Modern Faith Tools',
    description:
      "Equipping you with easily accessible answers at your fingertips for today's conversations",
  },
];

const images = [
  imageData[imageData.length - 1], // Clone last
  ...imageData,
  imageData[0], // Clone first
];

const totalImages = imageData.length;

function CustomCarousel() {
  const { isSmall, isMedium, isLarge, isFold, height, width } = useLayoutDimention();
  const styles = getStyles(isSmall, isMedium, isLarge, isFold);
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
      // Jump to last real item
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: totalImages * SNAP_INTERVAL,
          animated: false,
        });
      }, 10);
    } else if (index === images.length - 1) {
      // Jump to first real item
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: SNAP_INTERVAL,
          animated: false,
        });
      }, 10);
    }
  };

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: SNAP_INTERVAL,
          animated: false,
        });
      }, 50);
    });

    return () => task.cancel();
  }, []);

  return (
    <View style={{ ...styles.container }}>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
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
                <Animated.View
                  style={[
                    styles.fullWidthCaptionContainer,
                    { opacity: captionOpacity },
                  ]}
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </Animated.View>
              </View>

              <Animated.View
                style={[
                  styles.slideContainer,
                  {
                    transform: [{ scale }, { translateY }],
                    marginHorizontal: SPACING / 2,
                    opacity,
                  },
                ]}
              >
                <Image source={item.img} style={{ ...styles.image }} />
              </Animated.View>
            </View>
          );
        }}
      />

      <View style={styles.pagination}>
        {imageData.map((_, i) => {
          const isActive = i === currentIndex;
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
}

export default CustomCarousel;
