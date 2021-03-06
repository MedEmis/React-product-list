import { Route, Switch } from 'react-router-dom'
import ProductList from './ProductList/ProductList';
import ProductPage from './ProductPage/ProductPage';
import { useEffect, useReducer } from 'react';
import { ACTIONS, productReducer } from './../Hooks/productsHooks';
import { deleteProducts, getProducts, updateProducts } from '../API';
import { createProductsComment, deleteProductsComment } from './../API';

const AppBody = () => {
	const [state, dispatch] = useReducer(productReducer)

	const randomId = () => Math.random().toString(36).substr(2, 9);

	const updateStorage = () => state?.products && localStorage.setItem("products", JSON.stringify(state.products))

	const getData = () => {///

		//if no items in local storage get data from db
		if (!JSON.parse(localStorage.getItem("products"))) {

			dispatch({ type: ACTIONS.LOADING_ON })
			getProducts()
			const products = JSON.parse(localStorage.getItem("products"))
			dispatch({ type: ACTIONS.GET_DATA, payload: products })
			dispatch({ type: ACTIONS.LOADING_OFF })

			//console.log("----------------------")
			//if nothing in store => take data from localStorage 
		} else if (!state?.products?.length && JSON.parse(localStorage.getItem("products")).length) {

			const products = JSON.parse(localStorage.getItem("products"))
			dispatch({ type: ACTIONS.GET_DATA, payload: products })

		} else {
			return
		}

	}

	//get chosen product
	const findProduct = (id) => {///
		if (state) {

			dispatch({ type: ACTIONS.LOADING_ON })
			dispatch({ type: ACTIONS.GET_PRODUCT_ITEM, payload: id })
			dispatch({ type: ACTIONS.LOADING_OFF })

		}
	}

	const updateProduct = (data, id) => {///

		updateProducts(data)
		dispatch({ type: ACTIONS.UPDATE_PRODUCT_ITEM, payload: { data, id } })

	}

	const createProduct = (data) => {///

		const newProduct = {
			id: randomId(),
			...data,
			comments: []
		}

		updateProducts(newProduct)
		dispatch({ type: ACTIONS.CREATE_PRODUCT, payload: { newProduct } })
	}

	const deleteProduct = (name) => {///

		deleteProducts(name)
		dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: { name } })


	}

	const createComment = (data, id) => {///

		const { DBname } = state.products.filter(product => product.id === id)[0]

		const comment = {
			id: randomId(),
			productId: id,
			description: data.comment,
			date: data.time
		}

		createProductsComment(DBname, comment)
		dispatch({ type: ACTIONS.CREATE_COMMENT, payload: { comment, id } })
	}

	const deleteComment = (comment) => {///

		//delete product for chosen product
		const chosenProductId = comment.productId
		const commentId = comment.id
		const { DBname } = state.products.filter(product => product.id === comment.productId)[0]

		deleteProductsComment(DBname, comment)
		dispatch({ type: ACTIONS.DELETE_COMMENT, payload: { chosenProductId, commentId } })

	}

	const productsSort = (value) => {///

		dispatch({ type: ACTIONS.SORT_PRODUCTS, payload: { value } })
	}

	updateStorage()





	return (
		<div className="container App-body">
			<Switch>
				<Route exact path="/" component={() => <ProductList
					getData={getData}
					createProduct={createProduct}
					deleteProduct={deleteProduct}
					products={state?.products}
					productsSort={productsSort}
				/>} />
				<Route path="/product-info-page/:id" component={(matchProps) => <ProductPage
					{...matchProps}
					findProduct={findProduct}
					chosenProduct={state?.chosenProduct}
					updateProduct={updateProduct}
					createComment={createComment}
					deleteComment={deleteComment}
				/>} />
			</Switch>
		</div>
	);
}

export default AppBody;
