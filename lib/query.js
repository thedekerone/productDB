'use strict';
const connectDb = require('./db');
const { ObjectID } = require('mongodb');

module.exports = {
	getProducts : async () => {
		let db,
			products = [];
		try {
			db = await connectDb();
			products = await db.collection('product').find().toArray();
		} catch (err) {
			console.log(err);
		}
		return products;
	},
	getProduct  : async (root, { id }) => {
		let db, product;
		try {
			db = await connectDb();
			product = await db.collection('product').findOne({ _id: ObjectID(id) });
			if (!product) throw new Error('could not find product');
		} catch (err) {
			console.log(err);
		}
		return product;
	},
	getBrands   : async () => {
		let db,
			products = [];
		try {
			db = await connectDb();
			products = await db.collection('brand').find().toArray();
		} catch (err) {
			console.log(err);
		}
		return products;
	},
	searchItems : async (root, { keyword }) => {
		let db;
		let products;
		let brands;
		let items;
		try {
			db = await connectDb();
			products = await db
				.collection('product')
				.find({
					$text : { $search: keyword }
				})
				.toArray();
			brands = await db
				.collection('brand')
				.find({
					$text : { $search: keyword }
				})
				.toArray();

			items = [
				...products,
				...brands
			];
			console.log(items);
		} catch (error) {
			console.log(err);
		}
		return items;
	}
};
