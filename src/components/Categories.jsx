import React from 'react';
import '../scss/app.scss';

const allCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories = React.memo(function Categories({ onClickCategory, countCategory }) {
  return (
    <div className="categories">
      <ul>
        {allCategories.map((name) => {
          return (
            <li
              key={name}
              onClick={() => onClickCategory(allCategories, name)}
              className={countCategory === allCategories.indexOf(name) ? 'active' : ''}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
