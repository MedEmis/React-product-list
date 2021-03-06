import { forwardRef, useRef, useState } from "react";
import { Field, Form } from "react-final-form";

const CreateProduct = forwardRef(({ createNewProduct }, ref) => {
	const requiredName = value => (value ? undefined : 'product name is required')
	const requiredDB = value => (value ? undefined : 'DB name is required')
	const requiredImage = value => (value ? undefined : 'image is required')

	return (
		<div ref={ref} id="modalCreate" className="modal">
			<div className="modal-content">
				<h4>New Product</h4>
				<Form onSubmit={createNewProduct}>
					{props => (
						<form onSubmit={props.handleSubmit}>
							<Field name="name" validate={requiredName}>
								{({ input, meta }) => (
									<div>
										<label>{"Product name".toUpperCase()}</label>
										<input {...input} type="text" />
										{meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
									</div>
								)}
							</Field>
							<Field name="DBname" validate={requiredDB}>
								{({ input, meta }) => (
									<div>
										<label>{"Name to display in database".toUpperCase()}</label>
										<input {...input} type="text" />
										{meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
									</div>
								)}
							</Field>
							<Field name="imageUrl" validate={requiredImage}>
								{({ input, meta }) => (
									<div>
										<label>{"image Url".toUpperCase()}</label>
										<input {...input} type="text" />
										{meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
									</div>
								)}
							</Field>
							<label htmlFor="count">{"count".toUpperCase()}
								<Field
									id="count"
									name="count"
									type="number"
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