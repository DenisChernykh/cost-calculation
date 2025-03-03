import { z } from 'zod'
export const ingredientSchema = z.object({
	id: z.string(),
	name: z.string().min(1, 'Введите название ингредиента'),
	unit: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z.enum(['мл', 'г', 'шт'], { required_error: 'Выберите единицу измерения ингредиента' })
	),
	packageCost: z.preprocess(
		(val) => Number(val),
		z.number()
			.min(1, "Введите стоимость ингредиента")

	),
	packageVolume: z.preprocess(
		(val) => Number(val),
		z.number()
			.min(1, "Введите объем ингредиента")
	),
})
