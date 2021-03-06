import firebase from './firebaseConfig';

const db = firebase.firestore()

const collection = db.collection("products")


export const getProducts = async () => {

	try {
		const data = await collection.get()
		const products = []
		data.forEach(doc => products.push(doc.data()))
		if (products.length) {
			localStorage.setItem("products", JSON.stringify(products))
		} else {
			console.log("No data!")
		}
	} catch (error) {
		console.log(error)
	}
}

export const updateProducts = (product) => {


	try {
		collection.doc(product.DBname).set(product)
	} catch (error) {
		console.log(error)
	}

}
export const deleteProducts = async (name) => {

	try {
		await collection.doc(name).delete()
	} catch (error) {
		console.log(error)
	}

}

export const createProducts = async (product) => {

	try {
		const name = product.name
		await collection.add({ [name]: product })
	} catch (error) {
		console.log(error)
	}

}

export const createProductsComment = async (name, comment) => {

	try {
		await collection.doc(name).update({
			"comments": firebase.firestore.FieldValue.arrayUnion(comment),
		});
	} catch (error) {
		console.log(error)
	}

}

export const deleteProductsComment = async (name, comment) => {

	try {
		await collection.doc(name).update({
			"comments": firebase.firestore.FieldValue.arrayRemove(comment)
		});
	} catch (error) {
		console.log(error)
	}

}



