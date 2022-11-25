import {useContext, useState} from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import style from './Cart.module.css';
import Checkout from './Checkout';

function Cart(props) {
	const [isCheckout, setIsCheckout] = useState(false);
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

	const orderHandler = () => {
		setIsCheckout(true);
	};

	return (
		<Modal onBackDropClick={props.onClose}>
			<ul className={style['cart-items']}>{cartItems}</ul>
			<div className={style.total}>
				<span>Total Amount</span>
				<span> {totalAmount}</span>
			</div>
			{!isCheckout && (
				<div className={style.actions}>
					<button className={style['button--alt']} onClick={props.onClose}>
						Close
					</button>
					{hasItem && (
						<button className={style.button} onClick={orderHandler}>
							Order
						</button>
					)}
				</div>
			)}
			{isCheckout && <Checkout onCancel={props.onClose} />}
		</Modal>
	);
}

export default Cart;
