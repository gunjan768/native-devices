import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => 
{
	// we wrap everything inside the transaction to ensures that if by chance some part of query fails then whole query will get fail and
	// hence no corrupted data at last will not get saved to the database. 
	const promise = new Promise((resolve, reject) => 
	{
		// executeSql() excepts 4 arguments : 1st -> query string which you have to perform , 2nd -> array of dynamic arguments which you
		// can insert ( here is empty means no argument ), 3rd -> success function , 4rth -> fail function. Fail function accepts two 
		// arguments : 1st -> query which you performed , 2nd -> error you received.
		db.transaction(tx => 
		{
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, 
				imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);`,
				[],
				() => 
				{
					resolve();
				},
				(_, err) => 
				{
					reject(err);
				}
			)
		})
	})
	
	return promise;
}

export const insertPlace = (title, imageUri, address, lat, lng) => 
{
	const promise = new Promise((resolve, reject) => 
	{
		db.transaction(tx => 
		{
			tx.executeSql(
				`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
				[title, imageUri, address, lat, lng],
				(_, result) => 
				{
					resolve(result);
				},
				(_, err) => 
				{
					reject(err);
				}
			)
		})
	})

    return promise;
}

export const fetchPlaces = () => 
{
	const promise = new Promise((resolve, reject) => 
	{
		db.transaction(tx => 
		{
			tx.executeSql(
				'SELECT * FROM places',
				[],
				(_, result) => 
				{
					resolve(result);
				},
				(_, err) => 
				{
					reject(err);
				}
			)
		})
	})
	  
    return promise;
}