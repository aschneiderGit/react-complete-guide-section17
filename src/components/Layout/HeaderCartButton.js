import {useContext, useEffect, useState} from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import style from './HeaderCartButton.module.css';

function HeaderCartButton(props) {
	const [btnBump, setBtnBump] = useState(false);
	const cartCtx = useContext(CartContext);
	const {items} = cartCtx;
	const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const btnClasses = `${style.button} ${btnBump ? style.bump : ''}`;

	useEffect(() => {
		setBtnBump(true);
		const timer = setTimeout(() => {
			setBtnBump(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={style.icon}>
				<CartIcon />
			</span>
			<span> Your Cart</span>
			<span className={style.badge}>{numberOfCartItems}</span>
		</button>
	);
}

export default HeaderCartButton;
