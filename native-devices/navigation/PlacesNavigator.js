import React from 'react';

import { Platform, SafeAreaView, Button, View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const PlaceStack = createStackNavigator();

const defaultStackNavOptions = (navigation, route) => 
{
	return (
	{	
		headerStyle: 
		{
			backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
		},
		headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor,
	})
}

const PlacesNavigator = props =>
{
	return (
		<PlaceStack.Navigator 
		initialRouteName="Places"
		screenOptions = { ({navigation, route}) => 
		{
			return defaultStackNavOptions(navigation, route)
		}}>
			<PlaceStack.Screen name="Places" component = { PlacesListScreen }/>
			<PlaceStack.Screen name="PlaceDetail" component = { PlaceDetailScreen }/>
			<PlaceStack.Screen name="NewPlace" component = { NewPlaceScreen }/>
			<PlaceStack.Screen name="Map" component = { MapScreen }/>

		</PlaceStack.Navigator>
	);
}

const MixtureComponents = props => (
	<NavigationContainer>
		<PlacesNavigator />
	</NavigationContainer>
);

export default MixtureComponents;