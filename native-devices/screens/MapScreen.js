import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => 
{
	const initialLocation = props.route.params ? ( props.route.params.initialLocation ? props.route.params.initialLocation : null ) : null;

	const readonly = props.route.params ? ( props.route.params.readonly ? props.route.params.readonly : null ) : null;

	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	const mapRegion = 
	{
		latitude: initialLocation ? initialLocation.lat : 37.7510,
		longitude: initialLocation ? initialLocation.lng : -97.8220,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	};

	const selectLocationHandler = event => 
	{
		if(readonly)
		return;
		
		setSelectedLocation(
		{
			lat: event.nativeEvent.coordinate.latitude,
			lng: event.nativeEvent.coordinate.longitude
		})
	}

	const savePickedLocationHandler = useCallback(() => 
	{
		if(!selectedLocation) 
		return;
		
		props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
	}, [selectedLocation]);

	useEffect(() => 
	{
		props.navigation.setParams({ saveLocation: savePickedLocationHandler });

	}, [savePickedLocationHandler]);

	useLayoutEffect(() => 
	{
		props.navigation.setOptions(configureHeaderBar(props));

	}, [props.route.params]);

	let markerCoordinates;

	if(selectedLocation) 
	{
		markerCoordinates = 
		{
			latitude: selectedLocation.lat,
			longitude: selectedLocation.lng
		};
	}

	return (
		<MapView
			style = { styles.map }
			region = { mapRegion }

			// onPress property will automatically pass an 'event' variable which is an object and contains all datas related to location we will
			// choose on map.
			onPress = { selectLocationHandler }
		>
			{
				markerCoordinates && (
					<Marker title="Picked Location" coordinate = { markerCoordinates } />
				)
			}
		</MapView>
	);
}

const configureHeaderBar = props =>
{	
	const readonly = props.route.params ? ( props.route.params.readonly ? props.route.params.readonly : null ) : null;
	
	if(readonly)
	return {};

	return {
		headerRight: () => (
			<TouchableOpacity 
				style = { styles.headerButton } 
				onPress = 
				{ 
					props.route.params != undefined ? 
							props.route.params.saveLocation != undefined ?
								props.route.params.saveLocation
							: 
								console.log("Sorry for this approach again")
						:
							console.log("Sorry for this approach")  
				}
			>
				<Text style = { styles.headerButtonText }>Save</Text>
			</TouchableOpacity>
		)
	};
}

const styles = StyleSheet.create(
{
	map: 
	{
		flex: 1
	},
	headerButton: 
	{
		marginHorizontal: 20
	},
	headerButtonText: 
	{
		fontSize: 16,
		color: Platform.OS === 'android' ? 'white' : Colors.primary
	}
})

export default MapScreen;
