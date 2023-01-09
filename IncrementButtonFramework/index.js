import { init } from "./framework";
import { User } from "./src/user";
import { button_IncrementCounter, button_DecrementCounter } from "./src/counter";

const firstName = "Corentin";
const lastName = "Lebarilier";
init("#app", User({ firstName, lastName }));

let count = 0;
init("#increment", button_IncrementCounter({ count }));
init("#decrement", button_DecrementCounter({ count }));
