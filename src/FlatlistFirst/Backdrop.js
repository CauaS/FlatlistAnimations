import React from 'react';
import { View, FlatList, Dimensions, Animated, Image } from "react-native";

const { width, height } = Dimensions.get('window')
const BACKDROP_HEIGHT = height * .6; // 60% od the height of the screen

const Backdrop = ({ data, scrollX, item_size }) => {
	return (
	  <View style={{  height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
		<FlatList
		  data={data.reverse()}
		  keyExtractor={(item) => item.key}
		  removeClippedSubviews={false}
		  contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
		  renderItem={({ item, index }) => {
			const translateX = scrollX.interpolate({
			  inputRange: [(index - 2) * item_size, (index - 1) * item_size,],
			  outputRange: [width, 0],
			//   extrapolate:'clamp'
			});
			return (
			  <Animated.View
				removeClippedSubviews={false}
				style={{
				  position: 'absolute',
				  transform:[{translateX}],
				  height,
				  width,
				  overflow: 'hidden',
				}}
			  >
				<Image
				  source={{ uri: item.image }}
				  style={{
					width,
					height: BACKDROP_HEIGHT,
					position: 'absolute',
				  }}
				/>
			  </Animated.View>
			);
		  }}
		/>
		{/* <LinearGradient
		  colors={['rgba(0, 0, 0, 0)', 'white']}
		  style={{
			width,
			height: BACKDROP_HEIGHT,
			position: 'absolute',
			bottom: 0,
		  }}
		/> */}
	  </View>
	);
  };

  export default Backdrop;