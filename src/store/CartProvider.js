import {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedAmount =
			state.totalAmount + action.item.price * action.item.amount;

		const existingItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingItem = state.items[existingItemIndex];
		let updatedItems;

		if (existingItem) {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + action.item.amount,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedAmount,
		};
	} else if (action.type === 'REMOVE') {
		const existingItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);
		const existingItem = state.items[existingItemIndex];
		const updatedAmount = state.totalAmount - existingItem.price;
		let updatedItems;

		if (existingItem.amount === 1) {
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedAmount,
		};
	}
	return defaultCartState;
};

function CardProvider(props) {
	const [cartState, dispatchCatAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemToCarHandler = (item) => {
		dispatchCatAction({type: 'ADD', item: item});
	};
	const removeItemToCarHandler = (id) => {
		dispatchCatAction({type: 'REMOVE', id: id});
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCarHandler,
		removeItem: removeItemToCarHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CardProvider;
