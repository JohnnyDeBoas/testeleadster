/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import client from './src/services/Api';
import Header from './assets/components/header';
import Footer from './assets/components/Footer/Footer';

import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;
const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    client.photos.curated({per_page: 7}).then(photos => {
      setImages(photos.photos);
    });
  }, []);

  const carouselRef = useRef();
  const onTouchThumbnail = touched => {
    if (touched === indexSelected) {
      return;
    }
    carouselRef?.current?.snapToItem(touched);
  };
  const flatListRef = useRef();

  const [indexSelected, setIndexSelected] = useState(0);
  // eslint-disable-next-line no-shadow
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <Header/>
      <View style={{flex: 1 / 2, marginTop: 20}}>
        <Carousel
          ref={carouselRef}
          data={images}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={index => onSelect(index)}
          renderItem={({item, index}) => (
            <Image
              key={index}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '100%', height: '100%'}}
              layout="default"
              resizeMode="contain"
              source={{
                uri: item.src.original,
              }}
            />
          )}
        />
        <Pagination
          inactiveDotColor="blue"
          dotColor={'black'}
          activeDotIndex={indexSelected}
          dotsLength={images.length}
          animatedDuration={150}
          inactiveDotScale={1}
        />
         <Text
          style={{
            textAlign:'center',
            color: 'black',
            fontSize: 22,
          }}>
          {indexSelected + 1}/{images.length}
        </Text>
      </View>
      <Footer/>
      <View
        style={{
          marginTop: -250,
          paddingHorizontal: 52,
          alignSelf: 'flex-end',
        }}>
      
      </View>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={images}
        style={{position: 'absolute', bottom: 100}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onTouchThumbnail(index)}
            activeOpacity={0.9}>
            <Image
              style={{
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                marginRight: SPACING,
                borderRadius: 16,
                borderWidth: index === indexSelected ? 4 : 0.75,
                borderColor: index === indexSelected ? '#4299F6' : 'white',
              }}
              source={{
                uri: item.src.portrait,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default App;
