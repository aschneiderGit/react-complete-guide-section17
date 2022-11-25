import style from './MealsSummary.module.css';

function MealsSummary() {
	return (
		<section className={style.summary}>
			<h2>Delicious Food, Delivered To You</h2>
			<p>
				Choose our avorite meal from our board selection of available meals and
				enjoy a delicious lunch or dinner at home
			</p>
			<p>
				All our meals are cooke with high-quality ingredients, just-in-time and
				of course by experienced chefs!
			</p>
		</section>
	);
}

export default MealsSummary;
