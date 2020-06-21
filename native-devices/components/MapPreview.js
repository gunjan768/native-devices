import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import ENV from '../env';

const MapPreview = props =>
{
	let imagePreviewUrl;

	if(props.location) 
	{ 
		// console.log("MapPreview.js : ",props.location);
		
		// This is the url for the static map Api. This will preview the location on map as an static image.
		imagePreviewUrl = "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyBnBTKcVlsrqTToj5u3ur16DvMRaAqJICY"
				
		// console.log("Image URL : ",imagePreviewUrl);
	}

	return (
		<TouchableOpacity onPress = { props.onPress } style = {{ ...styles.mapPreview, ...props.style }}>
			{
				props.location ?
					<Image 
						style = { styles.mapImage } 
						source = 
						{{ 
							uri: "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyA3kg7YWugGl1lTXmAmaBGPNhDW9pEh5bo&signature=GJnbP6sQrFY1ce8IsvG2WR2P0Jw=" 
						}} 
					/>
				:
					props.children
			}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create(
{
	mapPreview: 
	{
		justifyContent: 'center',
		alignItems: 'center'
	},
	mapImage: 
	{
		width: '100%',
		height: '100%'
	}
})

export default MapPreview;