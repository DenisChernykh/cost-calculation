import { z } from "zod";

export const CreateDishSchema = z.object({
	id: z.string(),
	dishName: z.string().min(1, 'Введите название блюда'),
	ingredientsUsage: z.array(
		z.object({
			ingredientId: z.string().min(1, 'Выберите ингредиент'),
			usage: z.preprocess((val) => Number(val), z.number().positive().min(1, 'Введите количество'))
		})
	)
});



