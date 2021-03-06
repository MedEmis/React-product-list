import { Suspense, useEffect } from "react";
import ProductInfo from './ProductInfo';



const ProductPage = ({
	findProduct,
	chosenProduct,
	updateProduct,
	createComment,
	deleteComment,
	match }) => {

	const id = match.params.id

	useEffect(() => {
		if (!chosenProduct || id !== chosenProduct.id) {
			findProduct(id)
		}
	}, [chosenProduct, findProduct, id])

	return (
		<>
			<div>Product Info</div>
			<Suspense fallback={<div>Loadind...</div>}>
				{chosenProduct ?
					<ProductInfo
						chosenProduct={chosenProduct}
						updateProduct={updateProduct}
						createComment={createComment}
						deleteComment={deleteComment}
					/>
					: <span>No items to show</span>
				}
			</Suspense>
		</>
	);
}

export default ProductPage;
