import { useEffect, useRef } from "react"
import M from 'materialize-css/dist/js/materialize.min.js';
import EditModal from './ModalEdit';
import CommentModal from './ModalComment';


const Comment = ({ date, description, deleteComment, id, productId }) => {
	const comment = {
		id: id,
		productId: productId,
		description: description,
		date: date
	}
	return (
		<div className="card light-blue darken-3">
			<div className="card-content white-text">
				<p className="left-align">{description}</p>
			</div>
			<div className="card-action white-text comment-items">
				<span className="">Date: {date}</span>
				<button className="waves-effect waves-light btn " onClick={() => deleteComment(comment)}>Delete</button>
			</div>
		</div>
	)

}
const DescriptionField = ({ type, value }) => {
	return (
		<li key={type} className="collection-item product-info-field">
			<div className="collection-item product-info-field__item_name">{type.toUpperCase()}</div>
			<div className="collection-item product-info-field__item_value">{
				typeof value === "object" ?
					// subfields  
					Object.keys(value).map(subField => <p key={subField}>{subField.toUpperCase()}: {value[subField]}</p>)
					: value
			}</div>
		</li>
	)
}


const ProductInfo = ({
	chosenProduct,
	updateProduct,
	createComment,
	deleteComment
}) => {

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0");
	let yyyy = today.getFullYear();
	let time = new Date().toLocaleTimeString('en-GB', {
		hour: "numeric",
		minute: "numeric"
	});

	today = `${dd}.${mm}.${yyyy}`;

	//links to modal windows
	const editModal = useRef(null)
	const commentModal = useRef(null)

	const DBname = chosenProduct.DBname

	const onSubmit = (data) => updateProduct({ ...data, DBname }, chosenProduct.id)

	const createNewComment = (message) => createComment({
		comment: message.comment,
		time: `${time} ${today}`
	}, chosenProduct.id)


	useEffect(() => {
		//materialize init of modal window
		M.Modal.init(editModal.current, {
			inDuration: 350,
			outDuration: 350,
			edge: 'left'
		})
		M.Modal.init(commentModal.current, {
			inDuration: 350,
			outDuration: 350,
			edge: 'left'
		})
	}, [])


	return (
		<>
			<div className="row">
				<div className="col s12 m6 ">
					<img className="responsive-img product-info-image" src={chosenProduct.imageUrl} alt={chosenProduct.name} />
				</div>
				<div className="col s12 m6 ">
					<ul className="collection">
						{
							Object.keys(chosenProduct)
								//hide some fields
								.filter(key => (key !== "comments" && key !== "imageUrl" && key !== "DBname"))
								.map((field, index) => <DescriptionField
									key={index}
									type={field}
									value={chosenProduct[field]}
								/>)
						}
						<button className="waves-effect waves-light btn fluid product-info-btn modal-trigger right" href="#modal1">
							Edit
						</button>
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					{
						chosenProduct.comments.filter(item => item !== undefined).map(comment =>
							<Comment
								key={comment.id}
								date={comment.date}
								description={comment.description}
								id={comment.id}
								productId={comment.productId}
								deleteComment={deleteComment}
							/>)
					}
				</div>
			</div>
			<div className="row">
				<a className="waves-effect waves-light btn modal-trigger" href="#modalComment">Add Comment</a>
			</div>

			<EditModal
				ref={editModal}
				product={chosenProduct}
				onSubmit={onSubmit}
			/>

			<CommentModal
				ref={commentModal}
				createComment={createNewComment}
			/>
		</>
	);
}

export default ProductInfo;
