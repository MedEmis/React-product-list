import { forwardRef } from "react";
import { Field, Form } from "react-final-form";


const EditModal = forwardRef(({ product, onSubmit }, ref) => {
	return (
		<div ref={ref} id="modal1" className="modal ">
			<div className="modal-content">
				<h4>You can edit product description here</h4>
				<Form onSubmit={onSubmit}>
					{props => (
						<form onSubmit={props.handleSubmit}>
							{
								//explanation:
								//Here I was using React Final Form
								//Modal window after render will have number of fields depends on object keys of main product data object
								//If there is key which is an object, it will be divided on subfields, and onSubmit - output object will have nested object inside
								Object.keys(product).filter(key => (key !== "comments" && key !== "id" && key !== "DBname"))
									.map((field, index) =>
										<div key={index}>
											{
												typeof product[field] === "object"
													? Object.keys(product[field]).map(subField =>
														<label key={subField} htmlFor={subField}>{subField.toUpperCase()}
															<Field
																id={subField}
																//for nesting object to output object
																name={`${field}.${subField}`}
																component="input"
																initialValue={product[field][subField]}
															/>
														</label>)
													: <label key={field} htmlFor={field}>{field.toUpperCase()}
														<Field
															id={field}
															name={field}
															initialValue={product[field]}
															component="input"
														/>
													</label>
											}
										</div>
									)
							}
							<button
								className="modal-close waves-effect waves-green btn "
								href="#modal1"
								type="submit"
							>
								Save
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

export default EditModal;