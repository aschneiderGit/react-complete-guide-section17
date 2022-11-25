import {useRef, useState} from 'react';
import Input from '../../UI/Input';
import style from './MealItemForm.module.css';

function MealItemForm(props) {
	const [amountIsValid, setAmountIsValid] = useState(true);
	const amountInputRef = useRef();
	const submitHandler = (event) => {
		event.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 10
		) {
			setAmountIsValid(false);
			return;
		}
		props.onAddToCart(enteredAmountNumber);
	};
	const input = {
		id: 'amount_' + props.id,
		type: 'number',
		min: '1',
		max: '10',
		step: '1',
		defaultValue: '1',
	};
	return (
		<form className={style.form} onSubmit={submitHandler}>
			<Input label="Amount" input={input} ref={amountInputRef} />
			<button>+ Add</button>
			{!amountIsValid && <p> Please entrer a amount between 1-10</p>}
		</form>
	);
}

export default MealItemForm;
