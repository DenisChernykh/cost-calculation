import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
export type Ingredient = {
	id: string,
	name: string,
	unit: 'мл' | 'г' | 'шт',
	packageCost: number,
	packageVolume: number
}
type IngredientsState = {
	ingredients: Ingredient[]
}
const initialState: IngredientsState = {
	ingredients: [{
		id: '1',
		name: 'Соевый соус',
		unit: 'мл',
		packageCost: 200,
		packageVolume: 100
	}, {
		id: '2',
		name: 'Рыба',
		unit: 'г',
		packageCost: 1000,
		packageVolume: 1000
	}, {
		id: '3',
		name: 'Рис',
		unit: 'г',
		packageCost: 100,
		packageVolume: 1000
	}
	]
}
const ingredientSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		addIngredient: (state, action: PayloadAction<Ingredient>) => {
			state.ingredients.push(action.payload)
		},
		removeIngredient: (state, action: PayloadAction<string>) => {
			state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload)
		},
		updateIngredient: (state, action: PayloadAction<Ingredient>) => {
			const index = state.ingredients.findIndex(ingredient => ingredient.id === action.payload.id)
			state.ingredients[index] = action.payload
		}

	}
})

export interface RootState {
	ingredients: IngredientsState
}

export const getIngredients = (state: RootState): Ingredient[] => {

	return state.ingredients.ingredients
}
export const calculateIngredientCost = (ingredient: Ingredient, usage: number): number => {
	if (!ingredient || usage <= 0) return 0;
	return (ingredient.packageCost * usage) / ingredient.packageVolume;
};
export const getIngredientById = createSelector([getIngredients, (_: RootState, ingredientId: string) => ingredientId], (ingredients, ingredientId) => ingredients.find((ingredient) => ingredient.id === ingredientId))
export const { addIngredient, removeIngredient, updateIngredient } = ingredientSlice.actions
export default ingredientSlice.reducer