import React from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Dimensions, Image, Animated, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Backdrop from "./Backdrop";
import data from '../data';

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
// const ITEM_SIZE = width * 0.72;  // 72% of the width of the screen
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;



export default function CarouselAnimation() {
	const scrollX = React.useRef(new Animated.Value(0)).current;
	return (
		<View style={{ flex: 1 }}>
			<StatusBar hidden/>
			<Backdrop data={data} scrollX={scrollX} item_size={ITEM_SIZE}/>
			<Animated.FlatList
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(item) => item.id}
				horizontal
				contentContainerStyle={{
					alignItems: 'center'
				}}
				snapToInterval={ITEM_SIZE}
				decelerationRate={0} // this line will turn it slower
				bounces={false}
				onScroll={Animated.event(
					[{nativeEvent: { contentOffset: { x: scrollX }}}],
					{useNativeDriver: true}

				)}
				scrollEventThrottle={16}
				renderItem={({ item, index }) => {
					const inputRange=[
						(index - 2) * ITEM_SIZE,
						(index - 1) * ITEM_SIZE,
						index * ITEM_SIZE,
					];
					const translateY = scrollX.interpolate({
						inputRange,
						outputRange: [0, -50, 0]
					})
					if(!item.image) {
						return <View style={{ width: SPACER_ITEM_SIZE}}></View>
					}
					return (
						<View key={item.id} style={{ width: ITEM_SIZE }}>
							<Animated.View 
								style={{
									marginHorizontal: SPACING,
									padding: SPACING * 2,
									backgroundColor: '#FFF',
									alignItems: 'center',
									borderRadius: 34,
									transform:[{translateY}]
								}}
							>
								<Image
									source={{ uri: item.image}}
									style={styles.posterImage}
								/>
								<Text>{item.title}</Text>
								<Text>{item.subtitle}</Text> 
							</Animated.View>
						</View>
					)
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	posterImage: {
		width: '100%',
		height: ITEM_SIZE * 1.2,
		resizeMode: 'cover',
		borderRadius: 24,
		margin: 0,
		marginBottom: 10,
	},
})