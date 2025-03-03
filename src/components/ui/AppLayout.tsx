import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import DishesList from '@/components/dishes/DishesList';
import IngredientsList from '../ingredients/IngredientsList';

function AppLayout() {
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'ingredients';
  });
  useEffect(() => {
    localStorage.setItem('activePage', activePage);
  }, [activePage]);

  return (
    <div className=" md:grid grid-cols-[14rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className=" w-3/4 mx-auto my-0 p-8">
        {activePage === 'ingredients' && <IngredientsList />}
        {activePage === 'dishes' && <DishesList />}
      </main>
    </div>
  );
}

export default AppLayout;
