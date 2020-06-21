import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => 
{
	const [pickedImage, setPickedImage] = useState();

	// For android expo managed all the permission setup but for ios it is bit different. We have to manually ask for the permission. In ios
	// we have to ask the permission during the runtime.
	const verifyPermissions = async () => 
	{
		const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

		if(result.status !== 'granted') 
		{
			Alert.alert(
				'Insufficient permissions!',
				'You need to grant camera permissions to use this app.',
				[{ text: 'Okay' }]
			);

			return false;
		}

		return true;
	}

	const takeImageHandler = async () => 
	{
		const hasPermission = await verifyPermissions();

		if(!hasPermission)
		return;
		
		// launchCameraAsync() is used to launch the camera. As async so this function registers a function which executes once when the user 
		// is done taking the picture and then resolves the promise. launchImageLibraryAsync() is used to open the gallery.
		const image = await ImagePicker.launchCameraAsync(
		{
			// allowsEditing lets you do editing stuffs like cropin the image etc.
			allowsEditing: true,
			aspect: [16, 9],
			
			// quality ranges from the 0 to 1.
			quality: 0.3
		})

		// uri means URL and named uri because it is a local image and not fron the web.
		setPickedImage(image.uri);
		props.onImageTaken(image.uri);
	}

	return (
		<View style = { styles.imagePicker }>

			<View style = { styles.imagePreview }>
				{
					!pickedImage ? 
						(
							<Text>No image picked yet.</Text>
						) 
					: 	
						(
							<Image style = { styles.image } source={{ uri: pickedImage }} />
						)
				}
			</View>

			<Button
				title="Take Image"
				color = { Colors.primary }
				onPress = { takeImageHandler }
			/>
			
		</View>
	);
}

const styles = StyleSheet.create(
{
	imagePicker: 
	{
		alignItems: 'center',
		marginBottom: 15
	},
	imagePreview: 
	{
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1
	},
	image: 
	{
		width: '100%',
		height: '100%'
	}
})

export default ImgPicker;