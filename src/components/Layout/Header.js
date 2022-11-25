import style from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
	return (
		<>
			<header className={style.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={props.onClickCart} />
			</header>
			<div className={style['main-image']}>
				<img src={mealsImage} alt="A table full of delicious food!" />
			</div>
		</>
	);
}

export default Header;
