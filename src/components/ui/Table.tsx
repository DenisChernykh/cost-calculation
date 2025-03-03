import { ReactNode } from 'react';

function Table({ children }: { children: ReactNode }) {
  return (
    <div className="border border-grey-200 text-lg bg-white rounded-lg overflow-hidden  ">
      {children}
    </div>
  );
}

function Header({ children }: { children: ReactNode }) {
  return (
    <div
      role="row"
      className="grid grid-cols-[2fr,1fr,1fr,1fr,3fr] gap-x-12 p-4 bg-grey-50 border-b border-grey-100 uppercase tracking-wider font-semibold text-grey-600"
    >
      {children}
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div
      role="row"
      className="grid grid-cols-[2fr_1fr_1fr_1fr_3fr] gap-x-12 p-3 border-b border-grey-100 last:border-none ove"
    >
      {children}
    </div>
  );
}
interface BodyProps<T> {
  data: T[];
  render: (item: T) => ReactNode;
}
function Body<T>({ data, render }: BodyProps<T>) {
  if (!data.length)
    return (
      <p className="text-xl font-medium text-center my-6">
        Список ингредиентов пуст
      </p>
    );
  return <section>{data.map(render)}</section>;
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="bg-grey-50 flex justify-center py-3">
      {children || null}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
