
export const ACTIONS = {
	REMOVE_POST: "REMOVE_POST",
	GET_DATA: "GET_DATA",
	GET_PRODUCT_ITEM: "GET_PRODUCT_ITEM",
	UPDATE_PRODUCT_ITEM: "UPDATE_PRODUCT_ITEM",
	CREATE_PRODUCT: "CREATE_PRODUCT",
	DELETE_PRODUCT: "DELETE_PRODUCT",
	SORT_PRODUCTS: "SORT_PRODUCTS",
	CREATE_COMMENT: "CREATE_COMMENT",
	DELETE_COMMENT: "DELETE_COMMENT",
	LOADING_ON: "LOADING_ON",
	LOADING_OFF: "LOADING_OFF",
}

const initialState = {
	products: [],
	chosenProduct: null,
	numberOfProducts: 1,
	isLoading: false
}

export const productReducer = (state = initialState, action) => {
	let currentProduct = null

	switch (action.type) {
		case ACTIONS.LOADING_ON:
			return {
				...state,
				isLoading: true
			}
		case ACTIONS.LOADING_OFF:
			return {
				...state,
				isLoading: false
			}
		case ACTIONS.UPDATE_PRODUCT_ITEM:
			currentProduct = state.products.filter(product => product.id === action.payload.id)[0]
			return {
				...state,
				chosenProduct: null,
				products: [
					...state.products.filter(product => product.id !== action.payload.id),
					currentProduct = {
						...currentProduct,
						...action.payload.data
					},
				]
			}
		case ACTIONS.CREATE_PRODUCT:
			console.log(action.payload)
			return {
				...state,
				chosenProduct: null,
				products: [
					...state.products,
					{
						id: ++state.products.length + 1,
						...action.payload.data,
						comments: []
					}
				]
			}
		case ACTIONS.DELETE_PRODUCT:
			console.log(action.payload)
			return {
				...state,
				chosenProduct: null,
				products: [
					...state.products.filter(product => product.id !== action.payload.id),
				]
			}
		case ACTIONS.CREATE_COMMENT:
			currentProduct = state.products.filter(product => product.id === action.payload.id)[0]
			return {
				...state,
				chosenProduct: null,
				products: [
					...state.products.filter(product => product.id !== action.payload.id),
					currentProduct = {
						...currentProduct,
						comments: [
							...currentProduct.comments,
							{
								id: ++currentProduct.comments.length + 1,
								productId: action.payload.id,
								description: action.payload.data.comment,
								date: action.payload.data.time
							}
						]
					},
				]
			}
		case ACTIONS.DELETE_COMMENT:
			currentProduct = state.products.filter(product => product.id === action.payload.chosenProductId)[0]
			return {
				...state,
				chosenProduct: null,
				products: [
					...state.products.filter(product => product.id !== action.payload.chosenProductId),
					currentProduct = {
						...currentProduct,
						comments: [
							...currentProduct.comments.filter(comment => comment.id !== action.payload.commentId)
						]
					},
				]
			}
		case ACTIONS.GET_DATA:
			return {
				...state,
				products: action.payload
			}
		case ACTIONS.GET_PRODUCT_ITEM:
			return {
				...state,
				chosenProduct: state.products.find(item => item.id === action.payload)
			}
		case ACTIONS.SORT_PRODUCTS:
			console.log(action.payload)
			const key = action.payload.value
			return {
				...state,
				products: state.products.sort((a, b) => a[key] > b[key] ? 1 : -1)
			}
		default:
			return state
	}


}
