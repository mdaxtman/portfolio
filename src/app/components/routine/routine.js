// Array of objects with properties such as--
// input -- what will be typed out in prompt
// prompt -- what the prompt will be updated to when input is finished
// output -- this will be an available output menu for selections/animations
// history -- this will be promptly added onto the history after input is finished.
// delay -- in milliseconds before the next action is to take place.

const script = () => [
  {
    input: "cd repositories",
    prompt: "~/repositories",
    delay: 1000
  },
  {
    input: "ls",
    history: "stuff",
    delay: 3000
  },
  {
    input: "select one",
    output: "this or that"
  },
  {
    input: ["typing this with a tip", "typing this with a t", "typing this with a typo"]
  }
];

export default script;
