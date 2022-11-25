import {useEffect, useState} from 'react';
import Card from '../UI/Card';
import style from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
	const [meals, setMeals] = useState([]);
	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://react-http-d5e54-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
			);
			const apiMeals = await response.json();
			console.log(apiMeals);

			const loadedMeals = [];
			for (const key in apiMeals) {
				loadedMeals.push({
					id: key,
					name: apiMeals[key].name,
					description: apiMeals[key].description,
					price: apiMeals[key].price,
				});
			}

			setMeals(loadedMeals);
		};
		fetchMeals();
	}, []);

	const mealsList = meals.map((meal) => {
		return (
			<MealItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				desc={meal.description}
				price={meal.price}
			/>
		);
	});
	return (
		<section className={style.meal}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
}

export default AvailableMeals;
