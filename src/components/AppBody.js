import { Route, Switch } from 'react-router-dom'
import ProductList from './ProductList/ProductList';
import ProductPage from './ProductPage/ProductPage';
import { useReducer } from 'react';
import { ACTIONS, productReducer } from './../Hooks/productsHooks';
import { readJson } from '../API';

const AppBody = () => {
	const [state, dispatch] = useReducer(productReducer)

	//get data from db
	const getData = async () => {
		if (!state?.products?.length) {
			dispatch({ type: ACTIONS.LOADING_ON })
			const data = await readJson()
			dispatch({ type: ACTIONS.GET_DATA, payload: data.products })
			dispatch({ type: ACTIONS.LOADING_OFF })
		}
	}

	//get chosen product
	const findProduct = (id) => {
		if (state) {
			dispatch({ type: ACTIONS.LOADING_ON })
			dispatch({ type: ACTIONS.GET_PRODUCT_ITEM, payload: +id })
			dispatch({ type: ACTIONS.LOADING_OFF })
		}
	}

	const updateProduct = (data, id) => {
		dispatch({ type: ACTIONS.UPDATE_PRODUCT_ITEM, payload: { data, id } })
	}
	const createProduct = (data, id) => {
		dispatch({ type: ACTIONS.CREATE_PRODUCT, payload: { data } })
	}
	const deleteProduct = (id) => {
		dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: { id } })
	}

	const createComment = (data, id) => {
		dispatch({ type: ACTIONS.CREATE_COMMENT, payload: { data, id } })
	}
	const deleteComment = (chosenProductId, commentId) => {
		dispatch({ type: ACTIONS.DELETE_COMMENT, payload: { chosenProductId, commentId } })
	}

	const productsSort = (value) => {
		dispatch({ type: ACTIONS.SORT_PRODUCTS, payload: { value } })
	}

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
