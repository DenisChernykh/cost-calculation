import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormikProps, getIn } from 'formik';
import Alert from './Alert';

function SelectField({
  label,
  placeholder,
  formik,
  name,
  options,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  label: string;
  placeholder: string;

  name: string;
  options?: {
    label: string;

    value: string;
  }[];
}) {
  const error = formik.errors[name] as string | undefined;
  const touched = getIn(formik.touched, name);
  const invalid = !!error && !!touched;
  const value = getIn(formik.values, name);
  return (
    <>
      <Select
        value={value}
        onValueChange={(selectedValue) => {
          formik.setFieldValue(name, selectedValue);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {invalid && <Alert color="red">{error}</Alert>}
    </>
  );
}

export default SelectField;
