import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
	ScrollView,
	View,
	Button,
	Text,
	TextInput,
	StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => 
{
	const [titleValue, setTitleValue] = useState('');
	const [selectedImage, setSelectedImage] = useState();
	const [selectedLocation, setSelectedLocation] = useState();

	const dispatch = useDispatch();

	const titleChangeHandler = text => 
	{
		setTitleValue(text);
	}

	const imageTakenHandler = imagePath =>
	{
		setSelectedImage(imagePath);
	}

	const locationPickedHandler = useCallback(location => 
	{
		setSelectedLocation(location);
		
		// console.log("NewPlacesScreen.js ",location);
		
	}, []);

	const savePlaceHandler = () => 
	{
		dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
		
		props.navigation.goBack();
	}

	useLayoutEffect(() => 
	{
		props.navigation.setOptions(configureHeaderBar(props));

	}, [props.route.params]);
	
	return (
		<ScrollView>
			<View style = { styles.form }>
				
				<Text style = { styles.label }>Title</Text>
				
				<TextInput
					style = { styles.textInput }
					onChangeText = { titleChangeHandler }
					value = { titleValue }
				/>
				
				<ImagePicker onImageTaken = { imageTakenHandler } />
				
				{
					// Here we are passing props.route as a prop to the LocationPicker as we don't have access to navigation property there.
					// props.route is only available to the direct screens only ( screens which are loaded directly by the react navigation )
				}

				<LocationPicker
					route = { props.route }
					navigation = { props.navigation }
					onLocationPicked = { locationPickedHandler }
				/>

				<Button
					title="Save Place"
					color = { Colors.primary }
					onPress = { savePlaceHandler }
				/>

			</View>
		</ScrollView>
	);
}

const configureHeaderBar = props =>
{	
	return (
	{
		headerTitle: "Add Place"
	});
}

const styles = StyleSheet.create(
{
	form: 
	{
		margin: 30
	},
	label: 
	{
		fontSize: 18,
		marginBottom: 15
	},
	textInput: 
	{
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2
	}
})

export default NewPlaceScreen;