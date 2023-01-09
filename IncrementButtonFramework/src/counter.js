import { createComponent } from "../framework";
import { button, p } from "../framework/element";
import { onClick } from "../framework/event";

// state mutating actions
const methods = {
  IncrementCounter: (state, nb_increment, count) => ({
    ...state,
    nb_increment,
    count: count + nb_increment,
  }),
  DecrementCounter: (state, nb_decrement, count) => ({
    ...state,
    nb_decrement,
    count: count - nb_decrement,
  }),
};

const initialState = { count: 0 };

const template = ({ count, methods }) =>
  button`${onClick(() => methods.IncrementCounter(1, count))} Increment ${count}`;

export const button_IncrementCounter = createComponent({
  template,
  methods,
  initialState,
});

const template2 = ({ count, methods }) =>
  button`${onClick(() => methods.DecrementCounter(1, count))} Decrement ${count}`;

export const button_DecrementCounter = createComponent({
  template: template2,
  methods,
  initialState,
});
