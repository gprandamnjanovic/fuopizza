import create from 'zustand';

export const useStore = create((set) => ({
  //cart
  cart: {
    pizzas: [],
  },

  //add Pizza in Cart
  addPizza: (data) =>
    set((state) => ({
      cart: {
        pizzas: [...state.cart.pizzas, data],
      },
    })),
  //remove Pizza
  removePizza: (index) =>
    set((state) => ({
      cart: {
        pizzas: state.cart.pizzas.filter((_, i) => i !== index),
      },
    })),
  //rest Card ,delete items
  resetCart: () => {
    set(() => ({
      cart: {
        pizzas: [],
      },
    }));
  },
}));
