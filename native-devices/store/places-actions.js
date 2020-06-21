import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, {name, street, city, region, postalCode, country, lat, lng}) => 
{
	return async dispatch => 
	{
		
		const address = `${name}, ${street}, ${city}, ${region}, ${country}, ${postalCode}`;
		const fileName = image.split('/').pop();

		// documentDirectory is the storage in your mobile phones which ensure your files until unless you uninstall your app. After uninstalling
		// the app this directory also gets erased. Some other directories are : cacheDirectory is the directoy where you image is already stored, 
		// bundleDirectory etc.	
		const newPath = FileSystem.documentDirectory + fileName;

		try 
		{
			await FileSystem.moveAsync(
			{
				from: image,
				to: newPath
			})
			
			const dbResult = await insertPlace(title, newPath, address, lat, lng);

			// console.log(dbResult);

			// 'insertId' will be give by SQLite database whenever you inert a data into the database.
			dispatch(
			{
				type: ADD_PLACE,
				placeData: 
				{
					id: dbResult.insertId,
					title: title,
					image: newPath,
					address: address,
					coords: 
					{
						lat: lat,
						lng: lng
					}
				}
			})
		} 

		catch(error) 
		{
			console.log(error);

			throw error;
		}
	};
}

export const loadPlaces = () => 
{
	return async dispatch => 
	{
		try
		{
			const dbResult = await fetchPlaces();

			console.log(dbResult);

			dispatch({ type: SET_PLACES, places: dbResult.rows._array });
		} 
		catch(error) 
		{
			throw err;
		}
	};
}