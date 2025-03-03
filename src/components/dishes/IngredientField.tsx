import { FormikProps } from 'formik';
import { Ingredient } from '../ingredients/ingredientsListSlice';
import Input from '../ui/Input';
import SelectField from '../ui/SelectField';
import { Button } from '../ui/button';
import { Dish } from './dishesListSlice';

interface IngredientFieldProps<T extends readonly Ingredient[]> {
  formik: FormikProps<Dish<T>>;
  ingredients: Ingredient[];
}
function IngredientField<T extends readonly Ingredient[]>({
  formik,
  ingredients,
}: IngredientFieldProps<T>) {
  return (
    <div>
      <p className=" font-bold">Список ингредиентов</p>
      {formik.values.ingredientsUsage.map((_, index) => {
        const usedIngredientIds = formik.values.ingredientsUsage.map(
          (used) => used.ingredientId
        );

        const availableIngredients = ingredients
          .filter(
            (ingredient) =>
              !usedIngredientIds.includes(ingredient.id) ||
              ingredient.id ===
                formik.values.ingredientsUsage[index]?.ingredientId
          )
          .map((ingredient) => ({
            value: ingredient.id,
            label: ingredient.name,
          }));

        return (
          <div className=" flex gap-2 items-end mb-4" key={index}>
            <SelectField
              name={`ingredientsUsage.${index}.ingredientId`}
              options={availableIngredients}
              formik={formik}
              placeholder="Выберите ингредиент"
              label="Ингредиент"
            />
            <Input
              formik={formik}
              name={`ingredientsUsage.${index}.usage`}
              label="Количество"
              type="number"
            />

            <Button
              onClick={() =>
                formik.setFieldValue(
                  'ingredientsUsage',
                  formik.values.ingredientsUsage.filter((_, i) => i !== index)
                )
              }
              variant="outline"
            >
              Убрать ингредиент
            </Button>
          </div>
        );
      })}
      <Button
        onClick={() =>
          formik.setFieldValue('ingredientsUsage', [
            ...formik.values.ingredientsUsage,
            { ingredientId: '', usage: 0 },
          ])
        }
        type="button"
      >
        Добавить
      </Button>
    </div>
  );
}

export default IngredientField;
