import cn from 'classnames';

function Alert({
  color,
  children,
}: {
  color: 'red' | 'green';
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(`rounded p-3`, {
        'bg-rose-200 text-slate-700': color === 'red',
        'bg-green-300 text-slate-700': color === 'green',
      })}
    >
      {children}
    </div>
  );
}

export default Alert;
