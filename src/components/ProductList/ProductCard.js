import React, { forwardRef, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import "./../../assets/product_card.css"


const DeleteModal = forwardRef(({ id, deleteProduct, parent }, ref,) => {
	return (
		<div ref={ref} id="modalDelete" className="modal ">
			<div className="modal-content">
				<h4>Are you sure?</h4>
				<div className="card-action__delete-buttons">
					<button
						className="modal-close waves-effect red waves-red btn "
						href="#modalDelete"
						type="submit"
						onClick={() => console.log(parent.current)}
					// onClick={() => { deleteProduct(id) }}
					>
						Delete
					</button>
					<button
						className="modal-close waves-effect waves-green btn "
						href="#modalDelete"
						type="reset">
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
})



const ProductCard = ({
	id,
	count,
	imageUrl,
	name,
	size,
	weight,
	deleteProduct
}) => {

	const linkProps = { pathname: `/product-info-page/${id}` }

	const dialogModal = useRef(null)
	const parent = useRef(null)


	useEffect(() => {
		//materialize init of modal window
		M.Modal.init(dialogModal.current, {
			inDuration: 350,
			outDuration: 350,
			edge: 'left'
		})

	}, [])

	return (
		<>
			<div ref={parent} className="card-panel-wrapper col s12 m6 l4 xl4" data-id={id} >
				<div className="card-panel  hoverable  ">
					<div className="card-content">
						<div className="card-image">
							<img className="card-panel__image" src={imageUrl} alt={name} />
							{/* <img height="230" src={imageUrl} alt={name} /> */}
							<span className="card-title">{name}</span>
						</div>{id}
						<div className="card-panel-description">
							<div>Count: {count}</div>
							<div>Height: {size?.height}</div>
							<div>Width: {size?.width}</div>
							<div>Weight: {weight}</div>
						</div>
					</div>
					<div className="card-action">
						<Link to={
							linkProps
						} className="btn waves-effect waves-light" >Reed more</Link>
						<button className="waves-effect waves-red btn  modal-trigger" href="#modalDelete" >Delete</button>
					</div>
				</div>
			</div>
			<DeleteModal
				id={id}
				deleteProduct={deleteProduct}
				ref={dialogModal}
				parent={parent}
			/>
		</>
	);
}

export default ProductCard