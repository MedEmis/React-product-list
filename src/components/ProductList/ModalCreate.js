import { forwardRef, useRef, useState } from "react";
import { Field, Form } from "react-final-form";

const CreateProduct = forwardRef(({ createNewProduct }, ref) => {
	const [fields, setFields] = useState(["name", "imageUrl"])

	const newField = useRef(null)


	return (
		<div ref={ref} id="modalCreate" className="modal">
			<div className="modal-content">
				<h4>New Product</h4>
				<Form onSubmit={createNewProduct}>
					{props => (
						<form onSubmit={props.handleSubmit}>
							<label htmlFor="name">{"name".toUpperCase()}
								<Field
									id="name"
									name="name"
									component="input"
								/>
							</label>
							<label htmlFor="imageUrl">{"imageUrl".toUpperCase()}
								<Field
									id="imageUrl"
									name="imageUrl"
									component="input"
								/>
							</label>
							<label htmlFor="count">{"count".toUpperCase()}
								<Field
									id="count"
									name="count"
									component="input"
								/>
							</label>
							<label htmlFor="width">{"width".toUpperCase()}
								<Field
									id="width"
									name="size.width"
									component="input"
								/>
							</label>
							<label htmlFor="height">{"height".toUpperCase()}
								<Field
									id="height"
									name="size.height"
									component="input"
								/>
							</label>
							<label htmlFor="weight">{"weight".toUpperCase()}
								<Field
									id="weight"
									name="weight"
									component="input"
								/>
							</label>
							<label htmlFor="color">{"color".toUpperCase()}
								<Field
									id="color"
									name="color"
									component="input"
								/>
							</label>
							<button
								className="modal-close waves-effect waves-green btn "
								href="#modal3"
								type="submit"
							>
								Publish
							</button>
							<button
								className="modal-close waves-effect waves-green btn "
								href="#modal3"
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

export default CreateProduct;