import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => 
{
  	const places = useSelector(state => state.places.places);
	
	const dispatch = useDispatch();

	useEffect(() => 
	{
		dispatch(placesActions.loadPlaces());

	}, [dispatch]);

	useLayoutEffect(() => 
	{
		props.navigation.setOptions(configureHeaderBar(props));

	}, [props.route.params]);

	return (
		<FlatList
		data = { places }
		keyExtractor = { item => item.id } 
		renderItem = 
		{ 
			itemData => (
				<PlaceItem
				image = { itemData.item.imageUri }
				title = { itemData.item.title }
				address = { itemData.item.address }
				lat = { itemData.item.lat }
				lng = { itemData.item.lng }
				onSelect = 
				{ 
					() => 
					{
						props.navigation.navigate('PlaceDetail', 
						{
							placeTitle: itemData.item.title,
							placeId: itemData.item.id
						})
					}
				}/>
			)
		}/>
	);
}

const configureHeaderBar = props =>
{	
	return (
	{
		headerTitle: 'All Places',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent = { HeaderButton }>
			    <Item
					title="Add Place"
					iconName = { Platform.OS === 'android' ? 'md-add' : 'ios-add' }
					onPress = { () => { props.navigation.navigate('NewPlace'); }}
				/>
			</HeaderButtons>
		)
	});
}

export default PlacesListScreen;