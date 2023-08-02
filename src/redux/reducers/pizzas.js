const initialState = {
  items: [],
  isLoaded: true,
};

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PIZZAS':
      return {
        ...state,
        items: action.payload,
        isLoaded: false,
      };
    default:
      return state;
  }
};

export default pizzas;
