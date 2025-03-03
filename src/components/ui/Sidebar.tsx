import classNames from 'classnames';

export enum PAGES {
  INGREDIENTS = 'ingredients',
  DISHES = 'dishes',
}
function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
}) {
  const NAV_ITEMS = [
    {
      id: PAGES.INGREDIENTS,
      label: 'Ингредиенты',
      icon: '🥦',
    },
    {
      id: PAGES.DISHES,
      label: 'Блюда',
      icon: '🍲',
    },
  ];

  return (
    <aside className=" bg-white row-span-full">
      <nav>
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                className={classNames(
                  'w-full flex items-center p-3 rounded-lg transition-colors',
                  {
                    'bg-blue-100 text-blue-600': activePage === item.id,
                    'hover:bg-gray-100': activePage !== item.id,
                  }
                )}
                aria-current={activePage === item.id ? 'page' : undefined}
              >
                <span className="mr-2 text-xl">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
