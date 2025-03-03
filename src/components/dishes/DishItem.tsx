import { useSelector, useDispatch } from 'react-redux';
import {
  getIngredients,
  Ingredient,
} from '../ingredients/ingredientsListSlice';
import { Button } from '../ui/button';
import CreateDishForm from './CreateDishForm';
import { Dish, getDishCost, removeDish } from './dishesListSlice';
import { RootState } from '@/store';
import { useState } from 'react';

interface DishItemProps<T extends readonly Ingredient[]> {
  dish: Dish<T>;
  setActiveForm: (formId: string | null) => void;
  activeForm: string | null;
}
function DishItem<T extends readonly Ingredient[]>({
  dish,
  setActiveForm,
  activeForm,
}: DishItemProps<T>) {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients) || [];
  const isEditing = activeForm === dish.id;
  const dishCost = useSelector((state: RootState) =>
    getDishCost(state, dish.id)
  );
  const [tempUsage, setTempUsage] = useState(dish.ingredientsUsage);
  const calculateDishCost = (
    usageList: { ingredientId: string; usage: number }[]
  ) => {
    return usageList.reduce((total, { ingredientId, usage }) => {
      const ingredient = ingredients.find((ing) => ing.id === ingredientId);
      return ingredient
        ? total + (ingredient.packageCost * usage) / ingredient.packageVolume
        : total;
    }, 0);
  };

  const liveDishCost = isEditing ? calculateDishCost(tempUsage) : dishCost;

  return (
    <li className="border rounded-lg p-6 shadow-lg bg-white mb-4">
      <div className="lg:grid flex flex-col grid-cols-[1fr_3fr_1fr] gap-6 items-start">
        <div className="font-bold text-lg text-gray-900">{dish.dishName}</div>

        <div className="flex w-full flex-col gap-3">
          {dish.ingredientsUsage.map(({ ingredientId, usage }) => {
            const ingredient = ingredients.find(
              (ing) => ing.id === ingredientId
            );
            return ingredient ? (
              <div
                key={ingredient.id}
                className="flex   text-gray-700 bg-gray-100 rounded-lg p-3"
              >
                <span className=" mr-2">{ingredient.name}</span>
                <span className="text-right font-semibold mr-1">{usage}</span>
                <span className="text-gray-500">{ingredient.unit}</span>
              </div>
            ) : (
              <p>Ингредиент не найден</p>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button
            onClick={() => setActiveForm(isEditing ? null : dish.id)}
            className="bg-blue-600  hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            {isEditing ? 'Отменить' : 'Редактировать'}
          </Button>
          <Button
            onClick={() => dispatch(removeDish(dish.id))}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Удалить
          </Button>
        </div>
      </div>
      <div className="mt-4 text-xl font-bold text-green-700">
        Себестоимость {liveDishCost.toFixed(2)} ₽
      </div>
      {isEditing && (
        <div className="mt-6 p-6 border rounded-lg bg-gray-50 shadow-inner">
          <CreateDishForm
            initialData={dish}
            onCancel={() => setActiveForm(null)}
            onUsageChange={setTempUsage}
          />
        </div>
      )}
    </li>
  );
}

export default DishItem;
