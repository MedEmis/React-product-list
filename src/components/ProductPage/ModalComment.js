import { forwardRef } from "react";
import { Field, Form } from "react-final-form";

const CommentModal = forwardRef(({ createComment }, ref) => {
	return (
		<div ref={ref} id="modalComment" className="modal bottom-sheet">
			<div className="modal-content">
				<h4>New Comment</h4>
				<Form onSubmit={createComment}>
					{props => (
						<form onSubmit={props.handleSubmit}>
							<label htmlFor="comment">Message
								<Field
									id="comment"
									name="comment"
									component="input"
								/>
							</label>
							<button
								className="modal-close waves-effect waves-green btn "
								href="#modal1"
								type="submit"
							>
								Publish
							</button>
							<button
								className="modal-close waves-effect waves-green btn "
								href="#modal1"
								type="reset">
								Cancel
							</button>
						</form>
					)}
				</Form>
			</div>
		</div>
	)
})

export default CommentModal;