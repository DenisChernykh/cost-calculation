import { useSelector } from 'react-redux';
import { getDishes } from './dishesListSlice';
// import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import CreateDishForm from './CreateDishForm';
import DishItem from './DishItem';

function DishesList() {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const dishes = useSelector(getDishes) || [];

  const renderList = () => (
    <ul>
      {dishes.map((dish) => (
        <DishItem
          setActiveForm={setActiveForm}
          activeForm={activeForm}
          key={dish.id}
          dish={dish}
        />
      ))}
    </ul>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 my-6">
      <div className="text-4xl mb-4 text-gray-400">🍽</div>
      <p className="text-gray-500 text-lg font-medium text-center">
        Список блюд пуст
        <br />
        <span className="text-sm font-normal">
          Начните добавление первого блюда
        </span>
      </p>
    </div>
  );
  return (
    <div>
      {dishes.length || activeForm ? renderList() : renderEmptyState()}
      {activeForm === 'add' ? (
        <CreateDishForm onCancel={() => setActiveForm(null)} />
      ) : (
        <Button onClick={() => setActiveForm('add')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Добавить блюдо{' '}
        </Button>
      )}
    </div>
  );
}

export default DishesList;
