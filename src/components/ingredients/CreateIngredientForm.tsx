import { Button } from '@/components/ui/button';
import Input from '@/components/ui/Input';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { withZodSchema } from 'formik-validator-zod';
import { useDispatch } from 'react-redux';
import Alert from '@/components/ui/Alert';
import InputWrapper from '@/components/ui/InputWrapper';
import cn from 'classnames';
import {
  addIngredient,
  Ingredient,
  updateIngredient,
} from './ingredientsListSlice';
import { ingredientSchema } from '@/schemas/CreateIngredientSchema';
import SelectField from '@/components/ui/SelectField';
function CreateIngredientForm({
  onCancel,
  initialData,
}: {
  onCancel: () => void;
  initialData?: Ingredient;
}) {
  function uuid(): string {
    return uuidv4();
  }
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialData || {
      id: uuid(),
      name: '',
      unit: '',
      packageCost: '',
      packageVolume: '',
    },
    onSubmit: (values) => {
      const updatedValues = {
        ...values,
        unit: values.unit as 'мл' | 'г' | 'шт',
        packageCost: Number(values.packageCost),
        packageVolume: Number(values.packageVolume),
      };
      if (initialData) {
        dispatch(updateIngredient(updatedValues));
      } else {
        dispatch(addIngredient(updatedValues));
      }
      formik.resetForm();
      onCancel();
    },
    validateOnMount: false,
    validate: withZodSchema(ingredientSchema),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className={cn(' p-8 bg-white', {
        'border border-1 rounded-md': !initialData,
      })}
    >
      <input type="hidden" value={formik.values.id} name="id" />
      <InputWrapper>
        <Input name="name" label="Название" formik={formik} type="text" />
      </InputWrapper>
      <InputWrapper>
        <Input
          name="packageCost"
          label="Стоимость упаковки (руб)"
          formik={formik}
          type="number"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          name="packageVolume"
          label="Объем/вес в упаковке (г/мл/шт)"
          formik={formik}
          type="number"
        />
      </InputWrapper>
      <SelectField
        name="unit"
        options={[
          { label: 'мл', value: 'мл' },
          { label: 'г', value: 'г' },
          { label: 'шт', value: 'шт' },
        ]}
        placeholder="Выберите единицу измерения"
        label="Единицы измерения"
        formik={formik}
      />
      {formik.errors.unit && formik.touched.unit && (
        <Alert color="red">{formik.errors.unit}</Alert>
      )}
      <div className=" flex gap-4 justify-center mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}

export default CreateIngredientForm;
