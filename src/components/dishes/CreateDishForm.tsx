import Input from '@/components/ui/Input';
import InputWrapper from '@/components/ui/InputWrapper';
import { useFormik } from 'formik';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import {
  getIngredients,
  Ingredient,
} from '@/components/ingredients/ingredientsListSlice';

import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addDish, Dish, upgradeDish } from './dishesListSlice';
import { withZodSchema } from 'formik-validator-zod';
import { CreateDishSchema } from '@/schemas/CreateDishSchema';
import IngredientField from './IngredientField';

import { useEffect } from 'react';

function CreateDishForm({
  initialData,
  onCancel,
  onUsageChange,
}: {
  initialData?: Dish<readonly Ingredient[]>;
  onCancel: () => void;
  onUsageChange?: (usage: { ingredientId: string; usage: number }[]) => void;
}) {
  function uuid(): string {
    return uuidv4();
  }

  const initialId = uuid();
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);
  const formik = useFormik({
    initialValues: initialData || {
      id: initialId,
      dishName: '',
      ingredientsUsage: [{ ingredientId: '', usage: 0 }],
    },

    onSubmit: (values) => {
      const updatedValues = { ...values };

      if (initialData) {
        dispatch(upgradeDish(updatedValues));
      } else {
        dispatch(addDish(updatedValues));
      }
      formik.resetForm();
      onCancel();
    },

    validate: withZodSchema(CreateDishSchema),
  });

  useEffect(() => {
    onUsageChange?.(formik.values.ingredientsUsage);
  }, [formik.values.ingredientsUsage, onUsageChange]);
  const calculateDishCost = () => {
    return formik.values.ingredientsUsage.reduce(
      (total, { ingredientId, usage }) => {
        const ingredient = ingredients.find((ing) => ing.id === ingredientId);
        return ingredient
          ? total + (ingredient.packageCost * usage) / ingredient.packageVolume
          : total;
      },
      0
    );
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
      className={cn(' bg-white p-6 rounded-xl shadow-lg border border-gray-100', {
        'border border-1 rounded-md': !initialData,
      })}
    >
      <InputWrapper>
        <Input formik={formik} name="dishName" label="Название блюда" />
      </InputWrapper>

      <IngredientField formik={formik} ingredients={ingredients} />
      <div className="mt-2 font-bold">
        Себестоимость {calculateDishCost().toFixed(2)} ₽
      </div>
      <div className=" flex gap-4 justify-center mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}

export default CreateDishForm;
