import { useEffect, Suspense, lazy, useRef, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import CreateProduct from './ModalCreate';
const ProductCard = lazy(() => import('./ProductCard'));

const ProductList = ({ getData, createProduct, deleteProduct, products, productsSort }) => {

	//links to modal windows
	const productModal = useRef()

	useEffect(() => {
		getData()

		//materialize init of modal window
		M.Modal.init(productModal.current, {
			inDuration: 350,
			outDuration: 350,
			edge: 'left'
		})

	}, [])
	return (
		<>
			<div>Products List</div>
			<div>
				<button className="waves-effect waves-light btn modal-trigger" href="#modalCreate">Add Product</button>
				<button className="waves-effect sort-button waves-light btn" onClick={() => productsSort("name")}>Sort by name</button>
				<button className="waves-effect sort-button waves-light btn" onClick={() => productsSort("count")}>Sort by count</button>
			</div>
			<div className="row">
				<Suspense fallback={<div>Loadind...</div>}>
					{
						products ?
							products.map(item => <ProductCard
								key={item.id}
								id={item.id}
								count={item.count}
								imageUrl={item.imageUrl}
								name={item.name}
								DBname={item.DBname}
								size={item.size}
								weight={item.weight}
								deleteProduct={deleteProduct}
							/>)
							: <div>No Products</div>
					}
				</Suspense>
			</div>
			<CreateProduct
				ref={productModal}
				createNewProduct={createProduct}
			/>
		</>
	);
}

export default ProductList;
