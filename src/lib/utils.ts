import { Ingredient } from "@/components/ingredients/ingredientsListSlice";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const calculateDishCost = (
	ingredientsUsage: Array<{ ingredientId: string; usage: number }>,
	ingredients: Ingredient[]
): number => {
	return ingredientsUsage.reduce((total, usage) => {
		const ingredient = ingredients.find(
			(ing) => ing.id === usage.ingredientId
		);
		return total + (ingredient?.packageCost || 0) * usage.usage;
	}, 0);
};