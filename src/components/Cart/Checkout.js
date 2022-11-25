import {useRef, useState} from 'react';
import style from './Checkout.module.css';

const isEmpty = (value) => value.trim().length === 0;

const isFiveLength = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postal: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalIsValid = isFiveLength(enteredPostal);

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postal: enteredPostalIsValid,
		});
		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredCityIsValid &&
			enteredPostalIsValid;

		if (!formIsValid) {
			return;
		}
		props.onOrder({
			name: enteredName,
			street: enteredStreet,
			city: enteredPostal,
			postalCode: enteredCity,
		});
	};

	return (
		<form className={style.form} onSubmit={confirmHandler}>
			<div
				className={`${style.control} ${
					formInputValidity.name ? '' : style.invalid
				}`}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameInputRef} />
				{!formInputValidity.name && <p> this input is not correct</p>}
			</div>
			<div
				className={`${style.control} ${
					formInputValidity.street ? '' : style.invalid
				}`}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetInputRef} />
				{!formInputValidity.street && <p> this input is not correct</p>}
			</div>
			<div
				className={`${style.control} ${
					formInputValidity.postal ? '' : style.invalid
				}`}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalInputRef} />
				{!formInputValidity.postal && <p> this input is not correct</p>}
			</div>
			<div
				className={`${style.control} ${
					formInputValidity.city ? '' : style.invalid
				}`}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityInputRef} />
				{!formInputValidity.city && <p> this input is not correct</p>}
			</div>
			<div className={style.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={style.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
