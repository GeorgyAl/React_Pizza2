import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import '../scss/app.scss';
import { SearchContext } from '../App.tsx';
import { Pagination } from '../components/Pagination';
import { setPizzas } from '../redux/actions/pizzas';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux/actions/filters';
import { setSortBy } from '../redux/actions/filters';
export const Home = () => {
  const [skeletonView, setSkeletonView] = React.useState(true);
  const [countPage, setCountPage] = React.useState(1);

  const { searchValue } = React.useContext(SearchContext);

  const dispatch = useDispatch();
  const { pizzasItems, allSort, countCategory } = useSelector(
    ({ pizzasReducer, filtersReducer }) => {
      return {
        pizzasItems: pizzasReducer.items,
        allSort: filtersReducer.sortBy,
        countCategory: filtersReducer.category,
      };
    },
  );

  React.useEffect(() => {
    setSkeletonView(true);
    const category = countCategory > 0 ? `category=${countCategory}` : '';
    const order = allSort.eng.includes('-') ? 'asc' : 'desc';
    const sortBy = allSort.eng.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    // fetch(
    //   `https://636fa6a6f2ed5cb047e20cc4.mockapi.io/items?page=${countPage}&limit=4&sortBy=${sortBy}&order=${order}&${category}${search}`,
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     dispatch(setPizzas(arr));
    //   })
    //   .finally(() => {
    //     setSkeletonView(false);
    //   });
    axios
      .get(
        `https://636fa6a6f2ed5cb047e20cc4.mockapi.io/items?page=${countPage}&limit=4&sortBy=${sortBy}&order=${order}&${category}${search}`,
      )
      .then((res) => {
        dispatch(setPizzas(res.data));
      })
      .finally(() => {
        setSkeletonView(false);
      });
  }, [countCategory, allSort, searchValue, countPage, dispatch]);

  const countClick = React.useCallback(
    (massive, name) => {
      dispatch(setCategory(massive.indexOf(name)));
    },
    [dispatch],
  );

  const countSortClick = React.useCallback(
    (name) => {
      dispatch(setSortBy(name));
    },
    [dispatch],
  );

  return (
    <>
      <div className="content__top">
        <Categories onClickCategory={countClick} countCategory={countCategory} />
        <Sort onclickSort={countSortClick} allSort={allSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {skeletonView
          ? [...new Array(6)].map((_, index) => {
              return <Skeleton key={index} />;
            })
          : pizzasItems.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />;
            })}
      </div>
      <Pagination onChangePage={(num) => setCountPage(num)} />
    </>
  );
};
