const initialState = {
  sortBy: { rus: 'популярности ↓', eng: 'rating' },
  category: 0,
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT_RATING':
      return {
        ...state,
        sortBy: action.payload,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default filters;
