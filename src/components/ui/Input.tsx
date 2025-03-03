import cn from 'classnames';
import { getIn, type FormikProps } from 'formik';
import Alert from './Alert';

function Input({
  name,
  label,
  formik,
  maxWidth,
  type = 'text',
}: {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  maxWidth?: number;
  type?: 'text' | 'password' | 'number';
}) {
  const value = getIn(formik.values, name);
  const error = formik.errors[name] as string | undefined;
  const touched = getIn(formik.touched, name);
  const disabled = formik.isSubmitting;

  const invalid = !!error && !!touched;
  return (
    <div className={cn({ 'opacity-50': disabled })}>
      <label className="mb-0.5 block font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        style={{ maxWidth }}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
        )}
        type={type}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
        disabled={disabled}
      />
      {invalid && <Alert color="red">{error}</Alert>}
    </div>
  );
}

export default Input;
