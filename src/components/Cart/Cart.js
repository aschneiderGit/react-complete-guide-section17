import {useContext} from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import style from './Cart.module.css';

function Cart(props) {
	const cartCtx = useContext(CartContext);
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (item) => {
		cartCtx.addItem({...item, amount: 1});
	};
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItem = cartCtx.items.length > 0;
	const cartItems = cartCtx.items.map((item) => (
		<CartItem
			key={item.id}
			name={item.name}
			price={item.price}
			amount={item.amount}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item)}
		/>
	));

	return (
		<Modal onBackDropClick={props.onClose}>
			<ul className={style['cart-items']}>{cartItems}</ul>
			<div className={style.total}>
				<span>Total Amount</span>
				<span> {totalAmount}</span>
			</div>
			<div className={style.actions}>
				<button className={style['button--alt']} onClick={props.onClose}>
					Close
				</button>
				{hasItem && <button className={style.button}>Order</button>}
			</div>
		</Modal>
	);
}

export default Cart;
