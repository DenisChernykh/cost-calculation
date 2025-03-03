import { createSelector, createSlice } from '@reduxjs/toolkit'
import { calculateIngredientCost, getIngredients, Ingredient } from '../ingredients/ingredientsListSlice'

export type Dish<T extends readonly Ingredient[]> = {
	id: string,
	dishName: string,
	ingredientsUsage: Array<{
		ingredientId: T[number]['id'],
		usage: number
	}>
}
type DishesState = {
	dishes: Dish<Ingredient[]>[]
}
const initialState: DishesState = {
	dishes: [{
		id: '1',
		dishName: 'Суши',
		ingredientsUsage: [
			{
				ingredientId: '1',
				usage: 100
			},
			{
				ingredientId: '2',
				usage: 100
			},
			{
				ingredientId: '3',
				usage: 100
			}
		]
	}]
}
const dishesSlise = createSlice({
	name: 'dishes',
	initialState,
	reducers: {
		addDish: (state, action) => {
			state.dishes.push(action.payload)
		},
		upgradeDish: (state, action) => {
			const index = state.dishes.findIndex(dish => dish.id === action.payload.id)
			state.dishes[index] = action.payload
		},
		removeDish: (state, action) => {
			state.dishes = state.dishes.filter((dish) => dish.id !== action.payload
			)
		}
	}
})


interface RootState {
	dishes: DishesState
}

export const getDishes = (state: RootState): Dish<Ingredient[]>[] => {

	return state.dishes.dishes
}
export const getDishCost = createSelector(
	[getIngredients, (state: RootState, dishId: string) => dishId, getDishes],
	(ingredients, dishId, dishes) => {
		const dish = dishes.find((dish) => dish.id === dishId);
		if (!dish) return 0;

		return dish.ingredientsUsage.reduce((total, { ingredientId, usage }) => {
			const ingredient = ingredients.find((ing) => ing.id === ingredientId);
			if (!ingredient) return total;
			return total + calculateIngredientCost(ingredient, usage);
		}, 0);
	}
);
export const { addDish, upgradeDish, removeDish } = dishesSlise.actions

export default dishesSlise.reducer