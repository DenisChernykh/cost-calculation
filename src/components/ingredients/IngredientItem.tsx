import { useDispatch } from 'react-redux';

import { Button } from '../ui/button';
import { Ingredient, removeIngredient } from './ingredientsListSlice';
import CreateIngredientForm from './CreateIngredientForm';

interface IngredientItemProps {
  ingredient: Ingredient;
  setActiveForm: (formId: string | null) => void;
  activeForm: string | null;
}
function IngredientItem({
  ingredient,
  setActiveForm,
  activeForm,
}: IngredientItemProps) {
  const dispatch = useDispatch();
  const isEditing = activeForm === ingredient.id;
  return (
    <div className="bg-white lg:grid grid-cols-[1fr_3fr_1fr] p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">{ingredient.name}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-sm">
          📦 Упаковка: {ingredient.packageVolume} {ingredient.unit}
        </p>
        <p className="text-sm">🏷 Стоимость: {ingredient.packageCost} ₽</p>
        <p className="text-green-600 font-medium">
          🔖 Цена за 1{ingredient.unit}:{' '}
          {(ingredient.packageCost / ingredient.packageVolume).toFixed(2)} ₽
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Button
          onClick={() => setActiveForm(isEditing ? null : ingredient.id)}
          className="bg-blue-600  hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          {isEditing ? 'Отменить' : 'Редактировать'}
        </Button>
        <Button
          onClick={() => dispatch(removeIngredient(ingredient.id))}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Удалить
        </Button>
      </div>
      {isEditing && (
        <div className="mt-6 p-6 col-span-full border rounded-lg bg-gray-50 shadow-inner">
          <CreateIngredientForm
            initialData={ingredient}
            onCancel={() => setActiveForm(null)}
          />
        </div>
      )}
    </div>
  );
}

export default IngredientItem;
